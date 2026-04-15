import type { Request, Response, NextFunction, ErrorRequestHandler } from '#types/index';

import validate from '#middleware/validate';

describe('validate middleware', () => {
    let req: any;
    let res: any;
    let next: NextFunction;
    let error: any;

    beforeEach(() => {
        req = {
            params: {
                id: jest.fn().mockReturnValue(1)
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        next = jest.fn();

        error = {
            details: [
                { message: jest.fn() }
            ]
        };
    });

    it('should return 404 if invalid objectId', () => {
        const validateMiddleware = validate();
        validateMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid ID.' });
    });

    it('should return 400 if invalid data', () => {
        req = {
            params: jest.fn()
        };

        const validateMiddleware = validate(() => ({ error }));
        validateMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    });
});