// this endpoint creates/registers a user in the DB
import * as exp from '#types/index';

import auth from '#middleware/auth';
import validate from '#middleware/validate';
import { User, validateUser, validateUserUpdate } from '#models/user';
import userQueue from '#queues/userQueue';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import express from 'express';
const router: exp.Router = express.Router();

router.get('/me', auth, async (req: exp.Request, res: exp.Response) => {
    const user = await User.findById(req.user?._id).select({ password: 0 });
    res.status(200).json(user);
});

router.post('/', validate(validateUser), async (req: exp.Request, res: exp.Response) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: 'User already registered!' });

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10); // gens a diff salt each time its called
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const userObj = _.pick(user, ['_id', 'name']);
    await userQueue.add('userCreated', userObj);

    res.status(201).json(_.pick(user, ['name', 'email']));
});

// we cant change password in this route we will do it in the auth module
router.put('/:id', [auth, validate(validateUserUpdate)], async (req: exp.Request, res: exp.Response) => {
    const updateDocument: UpdateDocument = {
        ...(_.pick(req.body, ['name', 'email', 'isAdmin']))
    };

    let user = await User.findByIdAndUpdate(req.params.id, updateDocument, { new: true }).select({ password: 0 });
    if (!user) return res.status(404).json({ error: 'User with the requested ID not found' });

    res.status(200).json(user); 
});

router.delete('/:id', [auth, validate()], async (req: exp.Request, res: exp.Response) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User with the requested ID not found' });

    res.status(200).json(user);
});

interface UpdateDocument {
    name?: string;
    email?: string;
    isAdmin?: boolean;
}

export default router;