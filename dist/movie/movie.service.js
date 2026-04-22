"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovies = void 0;
const movie_model_1 = require("#movie/movie.model");
const genre_model_1 = require("#genre/genre.model");
const lodash_1 = __importDefault(require("lodash"));
const getMovies = async () => {
    return movie_model_1.Movie.find().limit(10).sort({ name: 1 });
};
exports.getMovies = getMovies;
const createMovie = async (data) => {
    const genre = await genre_model_1.Genre.findById(data.genreId);
    if (!genre)
        return null;
    return movie_model_1.Movie.create({
        title: data.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: data.numberInStock,
        dailyRentalRate: data.dailyRentalRate
    });
};
exports.createMovie = createMovie;
const updateMovie = async (id, data) => {
    const genre = await genre_model_1.Genre.findById(data.genreId);
    if (!genre)
        return { movie: null, genreNotFound: true };
    const updateDocument = {
        ...lodash_1.default.pick(data, ['title', 'numberInStock', 'dailyRentalRate']),
        ...(genre && { genre: { _id: genre._id, name: genre.name } })
    };
    const movie = await movie_model_1.Movie.findByIdAndUpdate(id, updateDocument, { new: true });
    return { movie, genreNotFound: false };
};
exports.updateMovie = updateMovie;
const deleteMovie = async (id) => {
    return movie_model_1.Movie.findByIdAndDelete(id);
};
exports.deleteMovie = deleteMovie;
