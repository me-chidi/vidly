"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const admin_1 = __importDefault(require("#middleware/admin"));
const validate_1 = __importDefault(require("#middleware/validate"));
const movie_model_1 = require("#movie/movie.model");
const movie_service_1 = require("#movie/movie.service");
const express_1 = __importDefault(require("express"));
const permissions = [auth_1.default, admin_1.default];
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const movies = await (0, movie_service_1.getMovies)();
    res.status(200).json(movies);
});
router.post('/', [...permissions, (0, validate_1.default)(movie_model_1.validateMovie)], async (req, res) => {
    const movie = await (0, movie_service_1.createMovie)(req.body);
    if (!movie)
        return res.status(400).json({ error: 'Genre with the requested ID not found!' });
    res.status(201).json(movie);
});
router.put('/:id', [...permissions, (0, validate_1.default)(movie_model_1.validateMovieUpdate)], async (req, res) => {
    const { movie, genreNotFound } = await (0, movie_service_1.updateMovie)(req.params.id, req.body);
    if (genreNotFound)
        return res.status(404).json({ error: 'Genre with the requested ID not found!' });
    if (!movie)
        return res.status(404).json({ error: 'Movie with the requested ID not found' });
    res.json(movie);
});
router.delete('/:id', [...permissions, (0, validate_1.default)()], async (req, res) => {
    const movie = await (0, movie_service_1.deleteMovie)(req.params.id);
    if (!movie)
        return res.status(404).json({ error: 'Movie with the requested ID not found' });
    res.json(movie);
});
exports.default = router;
