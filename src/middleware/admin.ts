import { RequestHandler } from '#types/index';

const admin: RequestHandler = function(req, res, next) {
    if (!req.user?.isAdmin) return res.status(403).json({ error: 'Access denied.' });
    next();
}

export default admin;