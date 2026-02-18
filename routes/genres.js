const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    // throw new Error('Could not get the genres');
    const genres = await Genre.find().limit(10).sort({ name: 1 });
    res.status(200).send(genres);    
});

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found!');

    res.status(200).send(genre);    
});

router.post('/', auth, async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); // user i/p check

    const genre = await Genre.insertOne({ name: value.name });
    res.status(201).send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: value.name }, { new: true });
    if (!genre) return res.status(404).send('Genre with the requested ID not found');

    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id, { new: true });
    if (!genre) return res.status(404).send('Genre with the requested ID not found');

    res.send(genre);
});

module.exports = router;
