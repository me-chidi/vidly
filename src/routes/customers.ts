import * as exp from "#types/index";

import validate from '#middleware/validate';
import auth from '#middleware/auth';
import admin from '#middleware/admin';
import { User } from '#models/user';
import { Customer, validateCustomer } from '#models/customer';
import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
const permissions = [auth, admin];
const router: exp.Router = express.Router();


router.get('/', permissions, async (req: exp.Request, res: exp.Response) => {
    const customers = await Customer.find().limit(10).sort({ name: 1 });
    res.status(200).json(customers)    
});

router.get('/:id', [auth, validate()], async (req: exp.Request, res: exp.Response) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ error: 'The customer with the given ID was not found!' });

    res.status(200).json(customer);    
});

// might want a post route here in case workers fail
router.put('/:id', [auth, validate(validateCustomer)], async (req: exp.Request, res: exp.Response) => {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).json({ error: 'Associated user does not exist' });

    const updateDocument: UpdateDocumentInDb = {
        ..._.pick(req.body, ['userId', 'isGold', 'name', 'phone']),
    };
    
    const customer = await Customer.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!customer) return res.status(404).json({ error: 'Customer with the requested ID not found' });

    res.status(200).json(customer); 
});

router.delete('/:id', [auth, validate()], async (req: exp.Request, res: exp.Response) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer with the requested ID not found' });

    res.status(200).json(customer);
});

interface UpdateDocumentInDb {
    userId?: mongoose.Types.ObjectId;
    isGold?: boolean;
    name?: string;
    phone?: string;
}

export default router;