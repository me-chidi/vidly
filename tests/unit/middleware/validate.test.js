const validate = require('../../../middleware/validate');

describe('validate middleware', () => {
    let req;
    let res;
    let next;
    let error;

    beforeEach(() => {
        req = {
            params: {
                id: jest.fn().mockReturnValue(1)
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
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
        validateMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Invalid ID.');
    });

    it('should return 400 if invalid data', () => {
        req = {
            params: jest.fn()
        };

        const validateMiddleware = validate(() => ({ error }));
        validateMiddleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalled();
    });
});