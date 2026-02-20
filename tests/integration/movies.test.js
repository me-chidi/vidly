const { Movie } = require('../../models/movie');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');
let server;


describe('/api/movies', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await Movie.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all movies', async () => {
            await Movie.insertMany([
                { name: 'movie1' },
                { name: 'movie2' },
            ]);
            const res = await request(server).get('/api/movies');
            expect(res.status).toBe(200);
            expect(res.body.some(g => g.name === 'movie1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'movie2')).toBeTruthy();
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'movie1';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/movies')
                .set('x-auth-token', token)
                .send({ name });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if movie name is less than 5 characters', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if movie name is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the movie if it is valid', async () => {
            await exec();
            const movie = await Movie.find({ name: 'movie1' });
            expect(movie).not.toBeNull();
        });

        it('should return the movie if it is valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'movie1');
        });
    });

    describe('PUT /', () => {
        let token;
        let name;
        let updateDocument;
        let options;
        let id;

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = 'movie1';
            updateDocument = {};
            options = { new: true };
            id = new mongoose.Types.ObjectId();
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/movies/${id}`)
                .set('x-auth-token', token)
                .send({ name });
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if movie name is less than 5 characters', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if movie name is more than 50 characters', async () => {
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if movie with given ID not found', async () => {
            updateDocument = { name: 'newmovie1' };
            const res = await exec();

            const movie = await Movie.findByIdAndUpdate(id, updateDocument, options);

            expect(res.status).toBe(404);
            expect(movie).toBeNull(); // returns null if no doc
        });

         it('should update and return the movie if it is valid', async () => {
            const newMovie = await Movie.insertOne({ name });
            id = newMovie._id
            updateDocument = { name: 'newmovie1' };

            const res = await exec();
            const movie = await Movie.findByIdAndUpdate(id, updateDocument, options);
            
            expect(res.status).toBe(200);
            expect(movie).toMatchObject(updateDocument);
        });
    });

    describe('DELETE /', () => {
        let token;
        let id;
        let movie;
        let document = { name: 'movie1' };

        beforeEach(async () => {
            token = new User().generateAuthToken();
            id = new mongoose.Types.ObjectId();
            movie = await Movie.insertOne(document);
        });

        const exec = async () => {
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
            const res = await exec();
            expect(res.status).toBe(403);
        });

        it('should return 404 if movie with given ID not found', async () => {
            token = new User({ isAdmin: true }).generateAuthToken();

            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should delete and return movie if valid', async () => {
            token = new User({ isAdmin: true }).generateAuthToken();

            id = movie._id;
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'movie1');
        });
    });
});