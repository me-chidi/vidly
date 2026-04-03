jest.mock('bcrypt');
jest.mock('../../queues/userQueue');
const { User } = require('../../src/models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const request = require('supertest');
const userQueue = require('../../src/queues/userQueue');
let server;

describe('/api/users', () => {
    let token;
    let userInDb;
    let user;
    let returnedUserObj;

    beforeEach(async () => { 
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');
        userQueue.add = jest.fn();
        
        server = require('../../src/index');
        user = {
            name: 'user1',
            email: 'user1@domain.com',
            password: 'password',
        };
        returnedUserObj = {
            name: 'user1',
            email: 'user1@domain.com',
            isAdmin: false,
        };
        userInDb = await User.insertOne(user);
        token = userInDb.generateAuthToken();
     });
    afterEach(async () => { 
        await User.deleteMany({});
        server.close();
    });

    describe('GET /me', () => {
        it('should return 401 if client is not logged in', async () => {
            token = '';

            const res = await request(server).get('/api/users/me').set('x-auth-token', token);

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
        });

        it('should return only the current user', async () => {
            const res = await request(server).get('/api/users/me').set('x-auth-token', token);

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(returnedUserObj);
        });
    });

    describe('POST /', () => {
        const exec = () => {
            return request(server)
                .post('/api/users')
                .send(user);
        }

        it('should return 400 if user.password is less than 5 characters', async () => {
            user.password = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if user.email is not in valid email format', async () => {
            user.email = 'user1@domain';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if user already exists', async () => {
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error', 'User already registered!');
        });
        
        it('should hash user.password and save the user if valid', async () => {
            await User.deleteMany({});

            const res = await exec();
            const userInDb = await User.findOne({ name: 'user1' });

            expect(userInDb).not.toBeNull();
            expect(userInDb.password).toBe('hashedPassword');
            expect(res.status).toBe(201);
        });

        it('should call and pass the userobj to the userQueue if valid', async() => {
            await User.deleteMany({});

            await exec();
            const userInDb = await User.findOne({ name: 'user1' });
            const userObj = { _id: userInDb._id, name: userInDb.name };

            expect(userQueue.add).toHaveBeenCalledWith('userCreated', userObj);
        });
        
        it('should save and return the user if it is valid', async () => {
            await User.deleteMany({});
            delete returnedUserObj.isAdmin;

            const res = await exec();
            const userInDb = await User.findOne({ name: 'user1' });

            expect(userInDb).not.toBeNull();
            expect(res.body).toMatchObject(returnedUserObj);
            expect(res.status).toBe(201);
        });
    });

    describe('PUT /:id', () => {
        const exec = async (id=userInDb._id) => {
            return await request(server)
                .put(`/api/users/${id}`)
                .set('x-auth-token', token)
                .send(user); 
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        
        it('should return 400 if no update field is defined', async () => {
            user = {};
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if an invalid property is passed', async () => {
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 404 if user with given ID not found', async () => {
            delete user.password;
            const res = await exec(new mongoose.Types.ObjectId());

            expect(res.status).toBe(404);
            expect(res.body).toMatchObject({ error: 'User with the requested ID not found' });
        });

         it('should update and return the user if it is valid', async () => {
            delete user.password;
            user.name = 'newuser1';
            
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'newuser1');
        });
    });

    describe('DELETE /:id', () => {
        const exec = async (id=userInDb._id) => {
            return await request(server)
                .delete(`/api/users/${id}`)
                .set('x-auth-token', token)
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 404 if user with given ID not found', async () => {
            const res = await exec(new mongoose.Types.ObjectId());
            expect(res.status).toBe(404);
        });

        it('should delete and return user if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', 'user1');
        });
    });
});