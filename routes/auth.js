const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User, validateUpdate } = require('../models/user')

router.get('/', async (req, res) => {
    const users = await User.find().limit(10).sort({ name: 1 });
    res.status(200).send(users)    
});

// working with just post for now
router.post('/', async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: value.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(value.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

router.put('/:id', async (req, res) => {
    const { error, value } = validateUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const updateDocument = {};
    ['name', 'email', 'password'].forEach(key => {
        if (value[key] !== undefined) updateDocument[key] = value[key] // set the values that exist in the req.body as the values to be updated
    });
    const user = await User.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!user) return res.status(404).send('User with the requested ID not found');

    res.send(user); 
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id, { new: true });
    if (!user) return res.status(404).send('User with the requested ID not found');

    res.send(user);
});

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    
    return schema.validate(user);
}

module.exports = router;
