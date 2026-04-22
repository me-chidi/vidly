"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("#middleware/auth"));
const validate_1 = __importDefault(require("#middleware/validate"));
const rental_model_1 = require("#rental/rental.model");
const rental_service_1 = require("#rental/rental.service");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const rentals = await (0, rental_service_1.getRentals)();
    res.status(200).json(rentals);
});
router.post('/', [auth_1.default, (0, validate_1.default)(rental_model_1.validateRental)], async (req, res) => {
    const { rental, error, status } = await (0, rental_service_1.createRental)(req.body.customerId, req.body.movieId);
    if (error)
        return res.status(status).json({ error });
    res.status(201).json(rental);
});
exports.default = router;
