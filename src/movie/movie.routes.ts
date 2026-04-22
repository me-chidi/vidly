import * as exp from '#types/index';
import auth from '#middleware/auth';
import admin from '#middleware/admin';
import validate from '#middleware/validate';
import { validateMovie, validateMovieUpdate } from '#movie/movie.model';
import { getMovies, createMovie, updateMovie, deleteMovie } from '#movie/movie.service';
import express from 'express';

const permissions = [auth, admin];
const router: exp.Router = express.Router();

router.get('/', async (req: exp.Request, res: exp.Response) => {
    const movies = await getMovies();
    res.status(200).json(movies);
});

router.post('/', [...permissions, validate(validateMovie)], async (req: exp.Request, res: exp.Response) => {
    const movie = await createMovie(req.body);
    if (!movie) return res.status(400).json({ error: 'Genre with the requested ID not found!' });

    res.status(201).json(movie);
});

router.put('/:id', [...permissions, validate(validateMovieUpdate)], async (req: exp.Request, res: exp.Response) => {
    const { movie, genreNotFound } = await updateMovie(req.params.id as string, req.body);
    if (genreNotFound) return res.status(404).json({ error: 'Genre with the requested ID not found!' });
    if (!movie) return res.status(404).json({ error: 'Movie with the requested ID not found' });

    res.json(movie);
});

router.delete('/:id', [...permissions, validate()], async (req: exp.Request, res: exp.Response) => {
    const movie = await deleteMovie(req.params.id as string);
    if (!movie) return res.status(404).json({ error: 'Movie with the requested ID not found' });

    res.json(movie);
});

export default router;