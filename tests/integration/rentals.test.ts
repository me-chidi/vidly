import type { 
    MovieDocument, RentalObject, RentalDocument,
    GenreDocument, UserDocument, CustomerDocument 
} from '#types/index';

import { Rental } from '#models/rental';
import { Genre } from '#models/genre';
import { Movie } from '#models/movie';
import { User } from '#models/user';
import { Customer } from '#models/customer';
import server from '#src/index';
import mongoose from 'mongoose';
import request from 'supertest';


describe('/api/rentals', () => {
    let token: string;
    let genreInDb: GenreDocument;
    let movieInDb: MovieDocument;
    let userInDb: UserDocument;
    let customerInDb: CustomerDocument;
    let rental: RentalObject;
    let returnedRentalObj: Partial<RentalDocument>;

    beforeEach(async () => { 
        userInDb = await User.create({ 
            name: 'user1', 
            email: 'user1@domain.com', 
            password: 'password'
        });
        token = userInDb.generateAuthToken();
        customerInDb = await Customer.create({ 
            userId: userInDb._id,
            name: 'customer1', 
            phone: '1234567890'
        });
        genreInDb = await Genre.create({ name: 'genre1' });
        movieInDb = await Movie.create({
            title: 'movie1',
            genre: {
                _id: genreInDb._id,
                name: genreInDb.name
            },
            numberInStock: 10,
            dailyRentalRate: 15
        });
        rental = {
            customerId: customerInDb._id,
            movieId: movieInDb._id
        };
        returnedRentalObj = {
            customer: {
                _id: customerInDb._id,
                isGold: customerInDb.isGold,
                name: customerInDb.name,
                phone: customerInDb.phone
            },
            movie: {
                _id: movieInDb._id,
                title: movieInDb.title,
                dailyRentalRate: movieInDb.dailyRentalRate
            }
        };
     });
    afterEach(async () => { 
        const collections = mongoose.connection.collections;
        for (const key in collections)
            await collections[key]?.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        it('should return all rentals', async () => {
            await Rental.create(returnedRentalObj);
            
            const res = await request(server).get('/api/rentals');

            expect(res.status).toBe(200);
            expect(Object.keys(res.body[0])).toEqual(expect.arrayContaining([
                '_id', 'customer', 'movie', 'dateOut'
            ]));
        });
    });

    describe('POST /', () => {
        const exec = () => {
            return request(server)
                .post('/api/rentals')
                .set('x-auth-token', token)
                .send(rental);
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        
        it('should return 400 if rental.movieId is not a valid ObjectId', async () => {
            rental.movieId = new mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(400);
        });
        
        it('should return 400 if rental.customerId is not found', async () => {
            rental.customerId = new mongoose.Types.ObjectId();
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'Invalid customer.');
        });
        
        it('should return 400 if rental movie.numberInStock is 0', async () => {
            movieInDb.numberInStock = 0;
            await movieInDb.save();

            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'Movie not in stock.');
        });
        
        it('should save the rental and decrease the related movie.numberInStock by 1 if valid', async () => {
            const movieCount = movieInDb.numberInStock;

            await exec();
            const rentalInDb = await Rental.lookup(customerInDb._id, movieInDb._id);
            const updatedMovieInDb = await Movie.findById(movieInDb._id);

            expect(rentalInDb).not.toBeNull();
            expect(updatedMovieInDb?.numberInStock).toBe(movieCount - 1);
        });

        it('should roll back both rental and movie changes if either one is unsuccessful', async () => {
            jest.spyOn(Movie.prototype, 'save').mockRejectedValueOnce(new Error('DATABASE ERROR'));
            const res = await exec();

            const rentalInDb = await Rental.lookup(customerInDb._id, movieInDb._id);
            const updatedMovieInDb = await Movie.findById(movieInDb._id);

            expect(rentalInDb).toBeNull();
            expect(updatedMovieInDb?.numberInStock).toBe(10);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('error');
        });

        it('should return the rental if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(201);
            expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
                '_id', 'customer', 'movie', 'dateOut'
            ]));
        });
    });
});