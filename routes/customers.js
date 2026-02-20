const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Customer, validate, validateUpdate } = require('../models/customer')

router.get('/', async (req, res) => {
    const customers = await Customer.find().limit(10).sort({ name: 1 });
    res.status(200).send(customers)    
});

router.post('/', auth, async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.insertOne({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    res.status(201).send(customer);
});

router.put('/:id', auth, async (req, res) => {
    const { error, value } = validateUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

// need to determine a shortcut for putting the values into the json. one by one is tedious
// hence the lasck of implementation
// gpt came in clutch
    const updateDocument = {};
    ['isGold', 'name', 'phone'].forEach(key => {
        if (value[key] !== undefined) updateDocument[key] = value[key] // set the values that exist in the req.body as the values to be updated
    });
    const customer = await Customer.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!customer) return res.status(404).send('Customer with the requested ID not found');

    res.send(customer); 
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id, { new: true });
    if (!customer) return res.status(404).send('Customer with the requested ID not found');

    res.send(customer);
});

module.exports = router;
