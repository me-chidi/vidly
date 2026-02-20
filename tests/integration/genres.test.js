const { truncate } = require('lodash');
const { Genre } = require('../../models/genre');
const { User } = require('../../models/user');
const mongoose = require('mongoose');
const request = require('supertest');
let server;


describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await Genre.deleteMany({});
    });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.insertMany([
                { name: 'genre1' },
                { name: 'genre2' },
            ]);
            const res = await request(server).get('/api/genres');
            expect(res.status).toBe(200);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return the genre specified by the given ID', async () => {
            const genre = await Genre.insertOne({ name: 'genre1' }, { new: true });
            const res = await request(server).get(`/api/genres/${genre._id}`);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
            // expect(res.body).toMatchObject(genre); // cant use this here because of complications
        });

        it('should return 404 if genre with given ID not found', async () => {
            const id = new mongoose.Types.ObjectId();

            const res = await request(server).get('/api/genres/' + id);
            
            expect(res.status).toBe(404);
        });
    });

    describe('POST /', () => {
        let token;
        let name;

        beforeEach(() => {
            token = new User({ isAdmin: true }).generateAuthToken();
            name = 'genre1';
        });

        const exec = async () => {
            return await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name });
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

        it('should return 400 if genre name is less than 5 characters', async () => {
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if genre name is more than 50 characters', async () => {
            name = new Array(52).join('a');

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should save the genre if it is valid', async () => {
            await exec();
            const genre = await Genre.find({ name: 'genre1' });
            expect(genre).not.toBeNull();
        });

        it('should return the genre if it is valid', async () => {
            const res = await exec();
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });

    describe('PUT /', () => {
        let token;
        let name;
        let updateDocument;
        let options;
        let id;

        beforeEach(() => {
            token = new User({ isAdmin: true }).generateAuthToken();
            name = 'genre1';
            updateDocument = {};
            options = { new: true };
            id = new mongoose.Types.ObjectId();
        });

        const exec = async () => {
            return await request(server)
                .put(`/api/genres/${id}`)
                .set('x-auth-token', token)
                .send({ name });
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

        it('should return 400 if genre name is less than 5 characters', async () => {
            token = new User({ isAdmin: true }).generateAuthToken();
            name = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if genre name is more than 50 characters', async () => {
            token = new User({ isAdmin: true }).generateAuthToken();
            name = new Array(52).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if genre with given ID not found', async () => {
            token = new User({ isAdmin: true }).generateAuthToken();
            updateDocument = { name: 'newgenre1' };
            const res = await exec();

            const genre = await Genre.findByIdAndUpdate(id, updateDocument, options);

            expect(res.status).toBe(404);
            expect(genre).toBeNull(); // returns null if no doc
        });

         it('should update and return the genre if it is valid', async () => {
            const newGenre = await Genre.insertOne({ name });
            id = newGenre._id
            updateDocument = { name: 'newgenre1' };

            const res = await exec();
            const genre = await Genre.findByIdAndUpdate(id, updateDocument, options);
            
            expect(res.status).toBe(200);
            expect(genre).toMatchObject(updateDocument);
        });
    });

    describe('DELETE /', () => {
        let token;
        let id;
        let genre;
        let document = { name: 'genre1' };

        beforeEach(async () => {
            token = new User({ isAdmin: true }).generateAuthToken();
            id = new mongoose.Types.ObjectId();
            genre = await Genre.insertOne(document);
        });

        const exec = async () => {
            return await request(server)
                .delete(`/api/genres/${id}`)
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

        it('should return 404 if genre with given ID not found', async () => {
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should delete and return genre if valid', async () => {
            id = genre._id;
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'genre1');
        });
    });
});