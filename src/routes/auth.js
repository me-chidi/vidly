// this endpoint is responsible for checking if a user exists
// this is basically a login route, the post method is what is being used
const validate = require('../middleware/validate');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

    const token = user.generateAuthToken();
    res.status(200).json({ token });
});

// might need password changing functionality
// if yes: use POST /change-password

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });
    
    return schema.validate(user);
}

module.exports = router;
