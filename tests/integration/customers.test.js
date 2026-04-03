const { Customer } = require('../../src/models/customer');
const { User } = require('../../src/models/user');
const mongoose = require('mongoose');
const request = require('supertest');
let server;


describe('/api/customers', () => {
    let token;
    let userInDb;
    let customerInDb;
    let customer;
    let user;

    beforeEach(async () => { 
        server = require('../../src/index');
        user = {
            name: 'user1',
            email: 'user1@domain.com',
            password: 'password',
        };
        userInDb = await User.insertOne(user);
        customer = {
            userId: userInDb._id,
            isGold: false,
            name: 'customer1',
            phone: '123456789'
        };
        customerInDb = await Customer.insertOne(customer);
        token = userInDb.generateAuthToken();
    });
    afterEach(async () => { 
        await Customer.deleteMany({});
        await User.deleteMany({});
        server.close();
    });

    describe('GET /', () => {
        const exec = () => {
            return request(server)
                .get('/api/customers')
                .set('x-auth-token', token)
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            
            const res = await exec();

            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('error');
        });

        it('should return 403 if client is not admin', async () => {
            const res = await exec();

            expect(res.status).toBe(403);
            expect(res.body).toHaveProperty('error');
        });

        it('should return all customers if valid request', async () => {
            token = new User({ isAdmin: true }).generateAuthToken();
            
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.some(c => c.name === customerInDb.name)).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        const exec = (id=customerInDb._id) => {
            return request(server)
                .get(`/api/customers/${id}`)
                .set('x-auth-token', token)
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 404 if customer with given ID not found', async () => {
            const res = await exec(new mongoose.Types.ObjectId());
            expect(res.status).toBe(404);
        });

        it('should return customer if valid request', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', customerInDb.name);
        });
    });

    describe('PUT /:id', () => {
        const exec = (id=customerInDb._id) => {
            return request(server)
                .put(`/api/customers/${id}`)
                .set('x-auth-token', token)
                .send(customer);
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });
        
        it('should return 400 if no update field is defined', async () => {
            customer = {};
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if an invalid property is passed', async () => {
            customer.userId = '1234';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if customer.userId is not found', async () => {
            customer.userId = new mongoose.Types.ObjectId();
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

        it('should return 404 if customer with given ID not found', async () => {
            const res = await exec(new mongoose.Types.ObjectId());

            expect(res.status).toBe(404);
            expect(res.body).toHaveProperty('error');
        });

         it('should update and return the customer if it is valid', async () => {
            customer.name = 'newcustomer1';
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('userId');
            expect(res.body).toHaveProperty('name', 'newcustomer1');
        });
    });

    describe('DELETE /:id', () => {
        const exec = (id=customerInDb._id) => {
            return request(server)
                .delete(`/api/customers/${id}`)
                .set('x-auth-token', token)
        }

        it('should return 401 if client is not logged in', async () => {
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 404 if customer with given ID not found', async () => {
            const res = await exec(new mongoose.Types.ObjectId());
            expect(res.status).toBe(404);
        });

        it('should delete and return customer if valid', async () => {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('name', customerInDb.name);
        });
    });
});