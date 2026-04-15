import * as exp from "#types/index";

import logger from '#startup/logging';
import validate from '#middleware/validate';
import auth from '#middleware/auth';
import { Rental } from '#models/rental';
import { Movie } from '#models/movie';
import mongoose from 'mongoose';
import Joi from 'joi';
import express from 'express';
const router: exp.Router = express.Router();


router.post('/', [auth, validate(validateReturn)], async (req: exp.Request, res: exp.Response) => {
    
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
    catch(err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message, err);
            res.status(500).json({ error: 'Unable to return' });
        } else {
            logger.error('An unknown error occurred', err);
            res.status(500).json({ error: 'Unable to return' });
        }
    }
});

function validateReturn(rental: ReturnObject) {
    const schema = Joi.object({
        customerId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        movieId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        })
    });
    
    return schema.validate(rental);
}

interface ReturnObject {
    customerId: mongoose.Types.ObjectId;
    movieId: mongoose.Types.ObjectId;
}

export default router;