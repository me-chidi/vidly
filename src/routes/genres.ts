import * as exp from '#types/index';

import auth from '#middleware/auth';
import admin from '#middleware/admin';
import validate from '#middleware/validate';
import { Genre, validateGenre } from '#models/genre';
import express from 'express';
const permissions = [auth, admin];
const router: exp.Router = express.Router();

router.get('/', async (req: exp.Request, res: exp.Response) => {
    const genres = await Genre.find().limit(10).sort({ name: 1 });
    res.status(200).json(genres);    
});

router.get('/:id', validate(), async (req: exp.Request, res: exp.Response) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).json({ error: 'Genre with the given ID was not found!' });

    res.status(200).json(genre);    
});

router.post('/', [...permissions, validate(validateGenre)], async (req: exp.Request, res: exp.Response) => {
    const genre = await Genre.create({ name: req.body.name });
    res.status(201).json(genre);
});

router.put('/:id', [...permissions, validate(validateGenre)], async (req: exp.Request, res: exp.Response) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).json({ error: 'Genre with the requested ID not found' });

    res.json(genre);
});

router.delete('/:id', [...permissions, validate()], async (req: exp.Request, res: exp.Response) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).json({ error: 'Genre with the requested ID not found' });

    res.json(genre);
});

export default router;
