import * as exp from '#types/index';
import auth from '#middleware/auth';
import admin from '#middleware/admin';
import validate from '#middleware/validate';
import { validateGenre } from '#genre/genre.model';
import { getGenres, getGenre, createGenre, updateGenre, deleteGenre } from '#genre/genre.service';
import express from 'express';

const permissions = [auth, admin];
const router: exp.Router = express.Router();

router.get('/', async (req: exp.Request, res: exp.Response) => {
    const genres = await getGenres();
    res.status(200).json(genres);
});

router.get('/:id', validate(), async (req: exp.Request, res: exp.Response) => {
    const genre = await getGenre(req.params.id as string);
    if (!genre) return res.status(404).json({ error: 'Genre with the given ID was not found!' });

    res.status(200).json(genre);
});

router.post('/', [...permissions, validate(validateGenre)], async (req: exp.Request, res: exp.Response) => {
    const genre = await createGenre(req.body.name);
    res.status(201).json(genre);
});

router.put('/:id', [...permissions, validate(validateGenre)], async (req: exp.Request, res: exp.Response) => {
    const genre = await updateGenre(req.params.id as string, req.body.name);
    if (!genre) return res.status(404).json({ error: 'Genre with the requested ID not found' });

    res.json(genre);
});

router.delete('/:id', [...permissions, validate()], async (req: exp.Request, res: exp.Response) => {
    const genre = await deleteGenre(req.params.id as string);
    if (!genre) return res.status(404).json({ error: 'Genre with the requested ID not found' });

    res.json(genre);
});

export default router;