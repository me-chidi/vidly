const validate = require('../middleware/validate');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');


router.post('/', [auth, validate(validateReturn)], async (req, res) => {
    
    let rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if (!rental) return res.status(404).send('No rental is found for this customer/movie.');
    if (rental.dateReturned) return res.status(400).send('Return is already processed.');

    rental.return();
    await rental.save();

    await Movie.updateOne({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    res.status(200).send(rental);
});

function validateReturn(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    
    return schema.validate(rental);
}

module.exports = router;