// this endpoint creates/registers a user in the DB
import * as exp from '#types/index';
import auth from '#middleware/auth';
import validate from '#middleware/validate';
import { validateUser, validateUserUpdate } from '#user/user.model';
import { getMe, createUser, updateUser, deleteUser } from '#user/user.service';
import express from 'express';

const router: exp.Router = express.Router();

router.get('/me', auth, async (req: exp.Request, res: exp.Response) => {
    const user = await getMe(req.user?._id as string)
    res.status(200).json(user);
});

router.post('/', validate(validateUser), async (req: exp.Request, res: exp.Response) => {
    const user = await createUser(req.body)
    if (!user) return res.status(400).json({ error: 'User already registered!' });

    res.status(201).json(user);
});

// we cant change password in this route we will do it in the auth module
router.put('/:id', [auth, validate(validateUserUpdate)], async (req: exp.Request, res: exp.Response) => {
    const user = await updateUser(req.params.id as string, req.body)
    if (!user) return res.status(404).json({ error: 'User with the requested ID not found' });

    res.status(200).json(user);
});

router.delete('/:id', [auth, validate()], async (req: exp.Request, res: exp.Response) => {
    const user = await deleteUser(req.params.id as string)
    if (!user) return res.status(404).json({ error: 'User with the requested ID not found' });

    res.status(200).json(user);
});

export default router;