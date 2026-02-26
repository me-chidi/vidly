// this endpoint creates/registers a user in the DB
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { User, validateUser, validateUserUpdate } = require('../models/user')
const userQueue = require('../queues/userQueue');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select({ password: 0 });
    res.status(200).json(user);
});

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: 'User already registered!' });

    // might want to wrap ln23-30 in a transaction
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10); // gens a diff salt each time its called
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const userObj = _.pick(user, ['_id', 'name']);
    await userQueue.add('userCreated', userObj);

    res.status(201).json(_.pick(user, ['name', 'email']));
});

// we cant change password in this route we will do it in the auth module
router.put('/:id', [auth, validate(validateUserUpdate)], async (req, res) => {
    const updateDocument = {};
    ['name', 'email'].forEach(key => {
        if (req.body[key] !== undefined) updateDocument[key] = req.body[key]
    });

    let user = await User.findByIdAndUpdate(req.params.id, updateDocument, { new: true }).select({ password: 0 });
    if (!user) return res.status(404).json({ error: 'User with the requested ID not found' });

    res.status(200).json(user); 
});

router.delete('/:id', [auth, validate()], async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User with the requested ID not found' });

    res.status(200).json(user);
});

module.exports = router;
