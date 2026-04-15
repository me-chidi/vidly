"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const admin_1 = __importDefault(require("#middleware/admin"));
const validate_1 = __importDefault(require("#middleware/validate"));
const movie_1 = require("#models/movie");
const genre_1 = require("#models/genre");
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const permissions = [auth_1.default, admin_1.default];
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const movies = await movie_1.Movie.find().limit(10).sort({ name: 1 });
    res.status(200).json(movies);
});
router.post('/', [...permissions, (0, validate_1.default)(movie_1.validateMovie)], async (req, res) => {
    const genre = await genre_1.Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).json({ error: 'Genre with the requested ID not found!' });
    const movie = await movie_1.Movie.create({
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
router.put('/:id', [...permissions, (0, validate_1.default)(movie_1.validateMovieUpdate)], async (req, res) => {
    const genre = await genre_1.Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(404).json({ error: 'Genre with the requested ID not found!' });
    const updateDocument = {
        ...lodash_1.default.pick(req.body, ['title', 'numberInStock', 'dailyRentalRate']),
        ...(genre && { genre: { _id: genre._id, name: genre.name } })
    };
    const movie = await movie_1.Movie.findByIdAndUpdate(req.params.id, updateDocument, { new: true });
    if (!movie)
        return res.status(404).json({ error: 'Movie with the requested ID not found' });
    res.json(movie);
});
router.delete('/:id', [...permissions, (0, validate_1.default)()], async (req, res) => {
    const movie = await movie_1.Movie.findByIdAndDelete(req.params.id);
    if (!movie)
        return res.status(404).json({ error: 'Movie with the requested ID not found' });
    res.json(movie);
});
exports.default = router;
