"use strict";
module.exports = function (req, res, next) {
    if (!req.user.isAdmin)
        return res.status(403).json({ error: 'Access denied.' });
    next();
};
//# sourceMappingURL=admin.js.map