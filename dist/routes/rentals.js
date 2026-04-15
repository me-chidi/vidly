"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("#startup/logging"));
const auth_1 = __importDefault(require("#middleware/auth"));
const validate_1 = __importDefault(require("#middleware/validate"));
const rental_1 = require("#models/rental");
const movie_1 = require("#models/movie");
const customer_1 = require("#models/customer");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const rentals = await rental_1.Rental.find().sort('-dateOut');
    res.status(200).json(rentals);
});
router.post('/', [auth_1.default, (0, validate_1.default)(rental_1.validateRental)], async (req, res) => {
    const customer = await customer_1.Customer.findById(req.body.customerId);
    if (!customer)
        return res.status(400).json({ error: 'Invalid customer.' });
    const movie = await movie_1.Movie.findById(req.body.movieId);
    if (!movie)
        return res.status(400).json({ error: 'Invalid movie.' });
    if (movie.numberInStock === 0)
        return res.status(400).json({ error: 'Movie not in stock.' });
    let rental;
    try {
        await mongoose_1.default.connection.transaction(async () => {
            rental = new rental_1.Rental({
                customer: {
                    _id: customer._id,
                    isGold: customer.isGold,
                    name: customer.name,
                    phone: customer.phone
                },
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    dailyRentalRate: movie.dailyRentalRate
                }
            });
            rental = await rental.save();
            movie.numberInStock--;
            await movie.save();
        });
        res.status(201).json(rental);
    }
    catch (err) {
        if (err instanceof Error) {
            logging_1.default.error(err.message, err);
            res.status(500).json({ error: 'Unable to create rental' });
        }
        else {
            logging_1.default.error('An unknown error occurred', err);
            res.status(500).json({ error: 'Unable to create rental' });
        }
    }
});
exports.default = router;
