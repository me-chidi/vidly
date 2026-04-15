"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const admin_1 = __importDefault(require("#middleware/admin"));
const validate_1 = __importDefault(require("#middleware/validate"));
const genre_1 = require("#models/genre");
const express_1 = __importDefault(require("express"));
const permissions = [auth_1.default, admin_1.default];
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const genres = await genre_1.Genre.find().limit(10).sort({ name: 1 });
    res.status(200).json(genres);
});
router.get('/:id', (0, validate_1.default)(), async (req, res) => {
    const genre = await genre_1.Genre.findById(req.params.id);
    if (!genre)
        return res.status(404).json({ error: 'Genre with the given ID was not found!' });
    res.status(200).json(genre);
});
router.post('/', [...permissions, (0, validate_1.default)(genre_1.validateGenre)], async (req, res) => {
    const genre = await genre_1.Genre.create({ name: req.body.name });
    res.status(201).json(genre);
});
router.put('/:id', [...permissions, (0, validate_1.default)(genre_1.validateGenre)], async (req, res) => {
    const genre = await genre_1.Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre)
        return res.status(404).json({ error: 'Genre with the requested ID not found' });
    res.json(genre);
});
router.delete('/:id', [...permissions, (0, validate_1.default)()], async (req, res) => {
    const genre = await genre_1.Genre.findByIdAndDelete(req.params.id);
    if (!genre)
        return res.status(404).json({ error: 'Genre with the requested ID not found' });
    res.json(genre);
});
exports.default = router;
