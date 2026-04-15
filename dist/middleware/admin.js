"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = function (req, res, next) {
    if (!req.user?.isAdmin)
        return res.status(403).json({ error: 'Access denied.' });
    next();
};
exports.default = admin;
