const { Rental } = require('../../models/rental');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');
let server;


describe('/api/rentals', () => {
    let token;
    let genreInDb;
    let rental;
    let returnedRentalObj;

    beforeEach(async () => { 
        server = require('../../index');
        token = new User({ isAdmin: true }).generateAuthToken();
        genreInDb = await Genre.insertOne({ name: 'genre1' });
        rental = {
            title: 'rental1',
            genreId: genreInDb._id,
            numberInStock: 10,
            dailyRentalRate: 15
        };
        returnedRentalObj = {
            title: 'rental1',
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
        await Rental.deleteMany({});
        await Genre.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all rentals', async () => {
            await Rental.insertOne(returnedRentalObj);
            
            const res = await request(server).get('/api/rentals');

            expect(res.status).toBe(200);
            expect(res.body.some(m => m.title === rental.title)).toBeTruthy();
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

        it('should return 403 if client is not admin', async () => {
            token = new User({ isAdmin: false }).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });
        
        it('should return 400 if rental.genreId is not found', async () => {
            rental.genreId = new mongoose.Types.ObjectId();
            
            const res = await exec();
            
            expect(res.status).toBe(400);
        });
        
        it('should return 400 if rental.numberInStock is less than 0', async () => {
            rental.numberInStock = -1;
            const res = await exec();
            expect(res.status).toBe(400);
        });
        
        it('should save and return the rental if it is valid', async () => {
            const res = await exec();
            const rentalInDb = await Rental.findOne({ title: 'rental1' });

            expect(rentalInDb).not.toBeNull();
            expect(res.body).toHaveProperty('title', 'rental1');
            expect(res.body).toHaveProperty('genre.name', 'genre1');
        });
    });
});