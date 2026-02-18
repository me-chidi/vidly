const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Movie, validate, validateUpdate } = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/', async (req, res) => {
    const movies = await Movie.find().limit(10).sort({ name: 1 });
    res.status(200).send(movies)    
});

router.post('/', auth, async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // user i/p check

    // in order to build some sort of relationship and consistency
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Genre with the requested ID not found!')

    const movie = await Movie.insertOne({
        title: value.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: value.numberInStock,
        dailyRentalRate: value.dailyRentalRate
    }, { new: true });

    res.status(201).send(movie);
});

router.put('/:id', auth, async (req, res) => {
    const { error, value } = validateUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.send('Genre with the requested ID not found!')


    // design flaw makes genreId to always be required in a put operation
    // change it up later
    const updateDocument = {};
    ['title', 'genreId', 'numberInStock', 'dailyRentalRate'].forEach(key => {
        if (value[key] !== undefined) {
            if (value[key] === value['genreId']) {
                updateDocument['genre'] = {
                    _id: genre._id,
                    name: genre.name
                }
            }
            updateDocument[key] = value[key]
        }
    });
    const movie = await Movie.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!movie) return res.status(404).send('Movie with the requested ID not found');

    res.send(movie);
});

router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id, { new: true });
    if (!movie) return res.status(404).send('Movie with the requested ID not found');

    res.send(movie);
});

module.exports = router;
