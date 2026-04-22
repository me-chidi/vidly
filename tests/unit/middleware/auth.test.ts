import type { Request, Response, NextFunction } from '#types/index';

import { User } from '#user/user.model';
import auth from '#middleware/auth';
import mongoose from 'mongoose';

describe('auth middleware', () => {
    it('should populate req.user with the payload of a valid JWT', () => {
        const user = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const token = new User(user).generateAuthToken();

        const req = {
            header: jest.fn().mockReturnValue(token),
        } as unknown as Request;

        const res = {} as Response;
        const next = jest.fn() as NextFunction;

        auth(req, res, next);

        expect(req.user).toMatchObject(user);
    });
});
