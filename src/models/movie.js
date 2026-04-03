const { genreSchema } = require('./genre')
const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(255),
        genreId: Joi.objectId().required(), // better to use genreId here to prevent bloat
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0)
    });
    
    return schema.validate(movie);
}

function validateMovieUpdate(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0)
    }).min(1);

    return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
module.exports.validateMovieUpdate = validateMovieUpdate;
