const moment = require('moment');
const mongoose = require('mongoose');
const { Rental } = require('../../models/rental');
const request = require('supertest');
const { User } = require('../../models/user');
const { Movie } = require('../../models/movie');


describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;
    let payload;

    beforeEach(async () => { 
        server = require('../../index'); 

        customerId = new mongoose.Types.ObjectId();
        movieId = new mongoose.Types.ObjectId();
        payload = { customerId, movieId };
        token = new User().generateAuthToken();

        movie = new Movie({ 
            _id: movieId,
            title: '12345',
            genre: { name: '12345' },
            numberInStock: 10,
            dailyRentalRate: 2
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '12345',
                isGold: false
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2
            }
        });
        await rental.save();
    });

    afterEach(async () => { 
        await Rental.deleteMany({});
        await Movie.deleteMany({});
        server.close();
    });

    describe('POST /', () => {
        const exec = () => {
            return request(server)
                .post('/api/returns')
                .set('x-auth-token', token)
                .send(payload);
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 400 if customerId or movieId is not provided', async () => {
            delete payload.customerId;

            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if no rental is found for this customer/movie', async () => {
            await Rental.deleteMany({});

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 400 if return is already processed', async () => {
            rental.dateReturned = new Date();
            await rental.save();

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 200 if valid request', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
        });

        it('should set the returnDate if input is valid', async () => {
            await exec();

            const rentalInDb = await Rental.findById(rental._id);
            const diff = new Date() - rentalInDb.dateReturned;
            expect(diff).toBeLessThan(10 * 1000);
        });

        it('should set the rentalFee if input is valid', async () => {
            rental.dateOut = moment().add(-7, 'days').toDate();
            await rental.save();

            await exec();

            const rentalInDb = await Rental.findById(rental._id);
            expect(rentalInDb.rentalFee).toBe(14);
        });

        it('should increase the movie stock if input is valid', async () => {
            await exec();

            const movieInDb = await Movie.findById(movieId);
            expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
        });

        it('should roll back both rental and movie changes if either one is unsuccessful', async () => {
            jest.spyOn(Rental.prototype, 'save').mockRejectedValueOnce(new Error('DATABASE ERROR'));
            const res = await exec();

            const rentalInDb = await Rental.lookup(customerId, movieId);
            const movieInDb = await Movie.findById(movieId);

            expect(rentalInDb.dateReturned).not.toBeDefined();
            expect(rentalInDb.rentalFee).not.toBeDefined();
            expect(movieInDb.numberInStock).toBe(10);
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('error');
        });

        it('should return the rental if input is valid', async () => {
            const res = await exec();

            expect(Object.keys(res.body)).toEqual(expect.arrayContaining([
            'dateOut', 'dateReturned', 'customer', 'movie', 'rentalFee'
            ]));
        });
    });
});