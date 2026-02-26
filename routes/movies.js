const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const { Movie, validateMovie, validateMovieUpdate } = require('../models/movie');
const { Genre } = require('../models/genre');
const permissions = [auth, admin];
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().limit(10).sort({ name: 1 });
    res.status(200).send(movies)    
});

router.post('/', [...permissions, validate(validateMovie)], async (req, res) => {
    // in order to build some sort of relationship and consistency
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Genre with the requested ID not found!')

    const movie = await Movie.insertOne({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    res.status(201).send(movie);
});

router.put('/:id', [...permissions, validate(validateMovieUpdate)], async (req, res) => {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send('Genre with the requested ID not found!')

    const updateDocument = {};
    ['title', 'genreId', 'numberInStock', 'dailyRentalRate'].forEach(key => {
        if (req.body[key] !== undefined) {
            if (req.body[key] === req.body['genreId']) {
                updateDocument['genre'] = {
                    _id: genre._id,
                    name: genre.name
                }
            }
            updateDocument[key] = req.body[key]
        }
    });
    const movie = await Movie.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!movie) return res.status(404).send('Movie with the requested ID not found');

    res.send(movie);
});

router.delete('/:id', [...permissions, validate()], async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).send('Movie with the requested ID not found');

    res.send(movie);
});

module.exports = router;
