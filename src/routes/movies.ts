import * as exp from '#types/index';

import auth from '#middleware/auth';
import admin from '#middleware/admin';
import validate from '#middleware/validate';
import { Movie, validateMovie, validateMovieUpdate } from '#models/movie';
import { Genre } from '#models/genre';
import express from 'express';
import mongoose from 'mongoose';
import _ from 'lodash';
const permissions = [auth, admin];
const router: exp.Router = express.Router();

router.get('/', async (req: exp.Request, res: exp.Response) => {
    const movies = await Movie.find().limit(10).sort({ name: 1 });
    res.status(200).json(movies);  
});

router.post('/', [...permissions, validate(validateMovie)], async (req: exp.Request, res: exp.Response) => {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).json({ error: 'Genre with the requested ID not found!' });

    const movie = await Movie.create({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    res.status(201).json(movie);
});

router.put('/:id', [...permissions, validate(validateMovieUpdate)], async (req: exp.Request, res: exp.Response) => {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).json({ error: 'Genre with the requested ID not found!' });

    const updateDocument: UpdateDocumentInDb = {
        ..._.pick(req.body, ['title', 'numberInStock', 'dailyRentalRate']),
        ...(genre && { genre: { _id: genre._id, name: genre.name } })
    };

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!movie) return res.status(404).json({ error: 'Movie with the requested ID not found' });

    res.json(movie);
});

router.delete('/:id', [...permissions, validate()], async (req: exp.Request, res: exp.Response) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie with the requested ID not found' });

    res.json(movie);
});

interface UpdateDocument {
    title?: string;
    genreId?: string;
    numberInStock?: number;
    dailyRentalRate?: number;
}

interface UpdateDocumentInDb {
    title?: string;
    genre?: {
        _id: mongoose.Types.ObjectId;
        name: string;
    };
    numberInStock?: number;
    dailyRentalRate?: number;
}

export default router;