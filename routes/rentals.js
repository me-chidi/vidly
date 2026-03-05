const logger = require('../startup/logging');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.status(200).json(rentals);
});

router.post('/', [auth, validate(validateRental)], async (req, res) => {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).json({ error: 'Invalid customer.' });

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).json({ error: 'Invalid movie.' });

    if (movie.numberInStock === 0) return res.status(400).json({ error: 'Movie not in stock.' });

    let rental;
    try {
        await mongoose.connection.transaction(async () => {
            rental = new Rental({
                customer: {
                    _id: customer._id,
                    isGold: customer.isGold,
                    name: customer.name,
                    phone: customer.phone
                },
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate
                }
            });
            rental = await rental.save();
    
            movie.numberInStock--;
            await movie.save();
        });
        res.status(201).json(rental);
    }
    catch(err) {
        logger.error(err.message, err);
        res.status(500).json({ error: 'Unable to create rental' });
    }
});

module.exports = router;
