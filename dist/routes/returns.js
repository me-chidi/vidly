"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("#startup/logging"));
const validate_1 = __importDefault(require("#middleware/validate"));
const auth_1 = __importDefault(require("#middleware/auth"));
const rental_1 = require("#models/rental");
const movie_1 = require("#models/movie");
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', [auth_1.default, (0, validate_1.default)(validateReturn)], async (req, res) => {
    let rental = await rental_1.Rental.lookup(req.body.customerId, req.body.movieId);
    if (!rental)
        return res.status(404).send('No rental is found for this customer/movie.');
    if (rental.dateReturned)
        return res.status(400).json({ error: 'Return is already processed.' });
    try {
        await mongoose_1.default.connection.transaction(async () => {
            rental.return();
            await rental.save();
            await movie_1.Movie.updateOne({ _id: rental.movie._id }, {
                $inc: { numberInStock: 1 }
            });
        });
        res.status(200).json(rental);
    }
    catch (err) {
        if (err instanceof Error) {
            logging_1.default.error(err.message, err);
            res.status(500).json({ error: 'Unable to return' });
        }
        else {
            logging_1.default.error('An unknown error occurred', err);
            res.status(500).json({ error: 'Unable to return' });
        }
    }
});
function validateReturn(rental) {
    const schema = joi_1.default.object({
        customerId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        movieId: joi_1.default.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        })
    });
    return schema.validate(rental);
}
exports.default = router;
