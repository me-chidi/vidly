import { User } from '#user/user.model';
import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose from 'mongoose';

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')) as { _id: string, isAdmin: boolean };
        expect(decoded).toMatchObject(payload);
    });
});