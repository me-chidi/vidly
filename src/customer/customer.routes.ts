import * as exp from '#types/index';
import validate from '#middleware/validate';
import auth from '#middleware/auth';
import admin from '#middleware/admin';
import { validateCustomer } from '#customer/customer.model';
import { getCustomers, getCustomer, updateCustomer, deleteCustomer } from '#customer/customer.service';
import express from 'express';

const permissions = [auth, admin];
const router: exp.Router = express.Router();

router.get('/', permissions, async (req: exp.Request, res: exp.Response) => {
    const customers = await getCustomers();
    res.status(200).json(customers);
});

router.get('/:id', [auth, validate()], async (req: exp.Request, res: exp.Response) => {
    const customer = await getCustomer(req.params.id as string);
    if (!customer) return res.status(404).json({ error: 'The customer with the given ID was not found!' });

    res.status(200).json(customer);
});

// might want a post route here in case workers fail
router.put('/:id', [auth, validate(validateCustomer)], async (req: exp.Request, res: exp.Response) => {
    const { customer, userNotFound } = await updateCustomer(req.params.id as string, req.body);
    if (userNotFound) return res.status(400).json({ error: 'Associated user does not exist' });
    if (!customer) return res.status(404).json({ error: 'Customer with the requested ID not found' });

    res.status(200).json(customer);
});

router.delete('/:id', [auth, validate()], async (req: exp.Request, res: exp.Response) => {
    const customer = await deleteCustomer(req.params.id as string);
    if (!customer) return res.status(404).json({ error: 'Customer with the requested ID not found' });

    res.status(200).json(customer);
});

export default router;