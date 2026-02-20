const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const { Genre, validateGenre } = require('../models/genre');
const express = require('express');
const router = express.Router();
const permissions = [auth, admin];

router.get('/', async (req, res) => {
    // throw new Error('Could not get the genres');
    const genres = await Genre.find().limit(10).sort({ name: 1 });
    res.status(200).send(genres);    
});

router.get('/:id', validate(), async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found!');

    res.status(200).send(genre);    
});

router.post('/', [...permissions, validate(validateGenre)], async (req, res) => {
    const genre = await Genre.insertOne({ name: req.body.name });
    res.status(201).send(genre);
});

router.put('/:id', [...permissions, validate(validateGenre)], async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('Genre with the requested ID not found');

    res.send(genre);
});

router.delete('/:id', [...permissions, validate()], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id, { new: true });
    if (!genre) return res.status(404).send('Genre with the requested ID not found');

    res.send(genre);
});

module.exports = router;
