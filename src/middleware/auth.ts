import config from 'config';
import jwt from 'jsonwebtoken';
import { RequestHandler } from '#types/index';

const auth: RequestHandler = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
    
    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded as { _id: string; isAdmin: boolean };
        next();
    }
    catch (ex) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

export default auth;