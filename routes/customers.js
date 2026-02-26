const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { User } = require('../models/user');
const { Customer, validateCustomer } = require('../models/customer');
const permissions = [auth, admin];
const express = require('express');
const router = express.Router();


router.get('/', permissions, async (req, res) => {
    const customers = await Customer.find().limit(10).sort({ name: 1 });
    res.status(200).json(customers)    
});

router.get('/:id', [auth, validate()], async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ error: 'The customer with the given ID was not found!' });

    res.status(200).json(customer);    
});

// might want a post route here in case workers fail
router.put('/:id', [auth, validate(validateCustomer)], async (req, res) => {
    const user = await User.findById(req.body.userId);
    if (!user) return res.status(400).json({ error: 'Associated user does not exist' });

    const updateDocument = {};
    ['userId', 'isGold', 'name', 'phone'].forEach(key => {
        if (req.body[key] !== undefined) updateDocument[key] = req.body[key];
    });

    const customer = await Customer.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!customer) return res.status(404).json({ error: 'Customer with the requested ID not found' });

    res.status(200).json(customer); 
});

router.delete('/:id', [auth, validate()], async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer with the requested ID not found' });

    res.status(200).json(customer);
});

module.exports = router;
