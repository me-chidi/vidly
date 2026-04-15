import * as exp from '#types/index';

import logger from '#startup/logging';
import auth from '#middleware/auth';
import validate from '#middleware/validate';
import { Rental, validateRental } from '#models/rental';
import { Movie } from '#models/movie';
import { Customer } from '#models/customer';
import mongoose from 'mongoose';
import express from 'express';
const router: exp.Router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.status(200).json(rentals);
});

router.post('/', [auth, validate(validateRental)], async (req: exp.Request, res: exp.Response) => {
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
    catch(err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message, err);
            res.status(500).json({ error: 'Unable to create rental' });
        } else {
            logger.error('An unknown error occurred', err);
            res.status(500).json({ error: 'Unable to create rental' });
        }
    }
});

export default router;
