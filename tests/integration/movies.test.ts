import type { MovieDocument, MovieObject, GenreDocument } from '#types/index';

import { Movie } from '#movie/movie.model';
import { Genre } from '#genre/genre.model';
import { User } from '#user/user.model';
import mongoose from 'mongoose';
import request from 'supertest';
import server from '#index';


describe('/api/movies', () => {
    let token: string;
    let genreInDb: Pick<GenreDocument, '_id' | 'name'>;
    let movie: MovieObject;
    let returnedMovieObj: Partial<MovieDocument>;

    beforeEach(async () => { 
        token = new User({ isAdmin: true }).generateAuthToken();
        genreInDb = await Genre.create({ name: 'genre1' });
        movie = {
            title: 'movie1',
            genreId: genreInDb._id,
            numberInStock: 10,
            dailyRentalRate: 15
        };
        returnedMovieObj = {
            title: 'movie1',
            genre: {
                _id: genreInDb._id,
                name: genreInDb.name
            },
            numberInStock: 10,
            dailyRentalRate: 15
        };
     });
    afterEach(async () => { 
        server.close();
        await Movie.deleteMany({});
        await Genre.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all movies', async () => {
            await Movie.create(returnedMovieObj);
            
            const res = await request(server).get('/api/movies');

            expect(res.status).toBe(200);
            expect(res.body.some((m: Partial<MovieDocument>) => m.title === movie.title)).toBeTruthy();
        });
    });

    describe('POST /', () => {
        const exec = () => {
            return request(server)
                .post('/api/movies')
                .set('x-auth-token', token)
                .send(movie);
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 403 if client is not admin', async () => {
            token = new User({ isAdmin: false }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });
        
        it('should return 400 if movie.genreId is not found', async () => {
            movie.genreId = new mongoose.Types.ObjectId();
            
            const res = await exec();
            
            expect(res.status).toBe(400);
        });
        
        it('should return 400 if movie.numberInStock is less than 0', async () => {
            movie.numberInStock = -1;
            const res = await exec();
            expect(res.status).toBe(400);
        });
        
        it('should save and return the movie if it is valid', async () => {
            const res = await exec();
            const movieInDb = await Movie.findOne({ title: 'movie1' });

            expect(movieInDb).not.toBeNull();
            expect(res.body).toHaveProperty('title', 'movie1');
            expect(res.body).toHaveProperty('genre.name', 'genre1');
        });
    });

    describe('PUT /:id', () => {
        let movie1: Partial<MovieDocument>;

        beforeEach(async () => {
            movie1 = await Movie.create(returnedMovieObj);
        });

        const exec = async (id=movie1._id) => {
            return await request(server)
                .put(`/api/movies/${id}`)
                .set('x-auth-token', token)
                .send(movie); 
                // we send movie and not movie1 because it's in the format our API accepts data
                // movie1 is in the format of output data
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 403 if client is not admin', async () => {
            token = new User({ isAdmin: false }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });
        
        it('should return 400 if no update field is defined', async () => {
            movie = {} as unknown as MovieObject;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if an invalid property is passed', async () => {
            movie.title = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if movie.genreId is not found', async () => {
            movie.genreId = new mongoose.Types.ObjectId();
            
            const res = await exec();
            
            expect(res.status).toBe(404);
        });

        it('should return 404 if movie with given ID not found', async () => {
            const res = await exec(new mongoose.Types.ObjectId());

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error');
        });

         it('should update and return the movie if it is valid', async () => {
            movie.title = 'newmovie1';

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', 'newmovie1');
            expect(res.body).toHaveProperty('genre.name', 'genre1');
        });
    });

    describe('DELETE /:id', () => {
        let movie1: Partial<MovieDocument>;

        beforeEach(async () => {
            movie1 = await Movie.create(returnedMovieObj);
        });

        const exec = async (id=movie1._id) => {
            return await request(server)
                .delete(`/api/movies/${id}`)
                .set('x-auth-token', token)
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 403 if client is not admin', async () => {
            token = new User({ isAdmin: false }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });

        it('should return 404 if movie with given ID not found', async () => {
            const res = await exec(new mongoose.Types.ObjectId());
            expect(res.status).toBe(404);
        });

        it('should delete and return movie if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('title', 'movie1');
        });
    });
});