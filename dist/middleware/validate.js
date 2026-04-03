"use strict";
const mongoose = require('mongoose');
module.exports = (validator) => {
    return (req, res, next) => {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                return res.status(404).json({ error: 'Invalid ID.' });
        }
        if (validator) {
            const { error } = validator(req.body);
            if (error)
                return res.status(400).json(error.details[0].message);
        }
        next();
    };
};
//# sourceMappingURL=validate.js.map