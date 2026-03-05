const mongoose = require('mongoose');
const Joi = require('joi');
const logger = require('../startup/logging');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();


router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    
    let rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('No rental is found for this customer/movie.');
    if (rental.dateReturned) return res.status(400).json({ error: 'Return is already processed.' });

    try {
        await mongoose.connection.transaction(async () => {
            rental.return();
            await rental.save();
        
            await Movie.updateOne({ _id: rental.movie._id }, {
                $inc: { numberInStock: 1 }
            });
        });
        res.status(200).json(rental);
    }
    catch(err) {
        logger.error(err.message, err);
        res.status(500).json({ error: 'Unable to return' });
    }
});

function validateReturn(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    
    return schema.validate(rental);
}

module.exports = router;