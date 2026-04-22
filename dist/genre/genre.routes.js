"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const admin_1 = __importDefault(require("#middleware/admin"));
const validate_1 = __importDefault(require("#middleware/validate"));
const genre_model_1 = require("#genre/genre.model");
const genre_service_1 = require("#genre/genre.service");
const express_1 = __importDefault(require("express"));
const permissions = [auth_1.default, admin_1.default];
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const genres = await (0, genre_service_1.getGenres)();
    res.status(200).json(genres);
});
router.get('/:id', (0, validate_1.default)(), async (req, res) => {
    const genre = await (0, genre_service_1.getGenre)(req.params.id);
    if (!genre)
        return res.status(404).json({ error: 'Genre with the given ID was not found!' });
    res.status(200).json(genre);
});
router.post('/', [...permissions, (0, validate_1.default)(genre_model_1.validateGenre)], async (req, res) => {
    const genre = await (0, genre_service_1.createGenre)(req.body.name);
    res.status(201).json(genre);
});
router.put('/:id', [...permissions, (0, validate_1.default)(genre_model_1.validateGenre)], async (req, res) => {
    const genre = await (0, genre_service_1.updateGenre)(req.params.id, req.body.name);
    if (!genre)
        return res.status(404).json({ error: 'Genre with the requested ID not found' });
    res.json(genre);
});
router.delete('/:id', [...permissions, (0, validate_1.default)()], async (req, res) => {
    const genre = await (0, genre_service_1.deleteGenre)(req.params.id);
    if (!genre)
        return res.status(404).json({ error: 'Genre with the requested ID not found' });
    res.json(genre);
});
exports.default = router;
