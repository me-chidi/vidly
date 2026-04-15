// this endpoint is responsible for checking if a user exists
// this is basically a login route, the post method is what is being used
import * as exp from '#types/index';

import validate from '#middleware/validate';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '#models/user';
const router: exp.Router = express.Router();

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

    const token = user.generateAuthToken();
    res.status(200).json({ token });
});
// bug with this type annotation "satisfies exp.RequestHandler"
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
