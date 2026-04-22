import * as exp from '#types/index';
import auth from '#middleware/auth';
import validate from '#middleware/validate';
import { validateRental } from '#rental/rental.model';
import { getRentals, createRental } from '#rental/rental.service';
import express from 'express';

const router: exp.Router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await getRentals();
    res.status(200).json(rentals);
});

router.post('/', [auth, validate(validateRental)], async (req: exp.Request, res: exp.Response) => {
    const { rental, error, code } = await createRental(req.body.customerId, req.body.movieId);
    if (error) return res.status(code).json({ error });

    res.status(201).json(rental);
});

export default router;