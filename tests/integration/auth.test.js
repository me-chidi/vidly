jest.mock('bcrypt');
const bcrypt = require('bcrypt');
const { User } = require('../../src/models/user');
const { Genre } = require('../../src/models/genre');
const request = require('supertest');
let server;

describe('testing the auth middleware', () => {
    let token;

    beforeEach(() => {
        server = require('../../src/index');
        token = new User({ isAdmin: true }).generateAuthToken();
    });
    afterEach(async () => { 
        await Genre.deleteMany({});
        server.close();
    });

    const exec = () => {
        return request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'genre1' });
    }

    it('should return 401 if no token is provided', async () => {
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = 'a';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();
        expect(res.status).toBe(201);
    });
});

describe('/api/auth', () => {
    let user;

    beforeEach(async () => {
        server = require('../../src/index');
        await User.insertOne({
            name: 'user1',
            email: 'user1@domain.com',
            password: 'password'
        });
        user = {
            email: 'user1@domain.com',
            password: 'password'
        };
        bcrypt.compare = jest.fn(async (a, b) => a === b);
    });
    
    afterEach(async () => { 
        await User.deleteMany({});
        server.close();
    });
    
    describe('POST /', () => {
        const exec = () => {
            return request(server)
                .post('/api/auth')
                .send(user);
        }

        it('should return 400 if email or password is not provided', async () => {
            delete user.email;
            const res = await exec();
    
            expect(res.status).toBe(400);
        });
    
        it('should return 400 if user is not found', async () => {
            user.email = 'notuser1@domain.com';
            const res = await exec();
    
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Invalid email or password');
        });
    
        it('should return 400 if password is invalid', async () => {
            user.password = 'notpassword';
            const res = await exec();
    
            expect(res.status).toBe(400);
            expect(res.body.error).toBe('Invalid email or password');
        });
    
        it('should generate and send token if valid user', async () => {
            const res = await exec();
    
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });
    });
});