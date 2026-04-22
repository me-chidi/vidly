import * as exp from '#types/index';
import validate from '#middleware/validate';
import auth from '#middleware/auth';
import { processReturn } from '#return/return.service';
import mongoose from 'mongoose';
import Joi from 'joi';
import express from 'express';

const router: exp.Router = express.Router();

router.post('/', [auth, validate(validateReturn)], async (req: exp.Request, res: exp.Response) => {
    const { rental, error, code } = await processReturn(req.body.customerId, req.body.movieId);
    if (error) return res.status(code).json({ error });

    res.status(200).json(rental);
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