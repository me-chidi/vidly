// this endpoint is responsible for checking if a user exists
// this is basically a login route, the post method is what is being used
import * as exp from '#types/index';

import validate from '#middleware/validate';
import loginUser from './auth.service';
import Joi from 'joi';
import express from 'express';
const router: exp.Router = express.Router();

router.post('/', validate(validateUser), async (req, res) => {
    const token = await loginUser(req.body.email, req.body.password);
    if (!token) return res.status(400).json({ error: 'Invalid email or password' });

    res.status(200).json({ token });
});

// might need password changing functionality
// if yes: use POST /change-password

function validateUser(user: UserObject) {
    const schema = Joi.object({
        email: Joi.string().email().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });
    
    return schema.validate(user);
}

interface UserObject {
    email: string;
    password: string;
}

export default router;
