"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
exports.validateMovie = validateMovie;
exports.validateMovieUpdate = validateMovieUpdate;
const genre_model_1 = require("#genre/genre.model");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const movieSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genre_model_1.genreSchema,
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
const Movie = mongoose_1.default.model('Movie', movieSchema);
exports.Movie = Movie;
function validateMovie(movie) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().min(5).max(255),
        genreId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }), // better to use genreId here to prevent bloat
        numberInStock: joi_1.default.number().required().min(0),
        dailyRentalRate: joi_1.default.number().required().min(0)
    });
    return schema.validate(movie);
}
function validateMovieUpdate(movie) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(5).max(255),
        genreId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        numberInStock: joi_1.default.number().min(0),
        dailyRentalRate: joi_1.default.number().min(0)
    }).min(1);
    return schema.validate(movie);
}
