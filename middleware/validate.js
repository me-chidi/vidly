const mongoose = require('mongoose');

module.exports = (validator) => {
    return (req, res, next) => {
        if (req.params.id) {
            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                return res.status(404).send('Invalid ID.');
        }

        if (validator) {
            const { error } = validator(req.body);
            if (error) return res.status(400).send(error.details[0].message);
        }
        
        next();
    }
}