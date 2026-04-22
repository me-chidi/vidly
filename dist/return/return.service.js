"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processReturn = void 0;
const logging_1 = __importDefault(require("#startup/logging"));
const rental_model_1 = require("#rental/rental.model");
const movie_model_1 = require("#movie/movie.model");
const mongoose_1 = __importDefault(require("mongoose"));
const processReturn = async (customerId, movieId) => {
    const rental = await rental_model_1.Rental.lookup(customerId, movieId);
    if (!rental)
        return { rental: null, error: 'No rental is found for this customer/movie.', status: 404 };
    if (rental.dateReturned)
        return { rental: null, error: 'Return is already processed.', status: 400 };
    try {
        await mongoose_1.default.connection.transaction(async () => {
            rental.return();
            await rental.save();
            await movie_model_1.Movie.updateOne({ _id: rental.movie._id }, {
                $inc: { numberInStock: 1 }
            });
        });
        return { rental, error: null, status: 200 };
    }
    catch (err) {
        if (err instanceof Error) {
            logging_1.default.error(err.message, err);
        }
        else {
            logging_1.default.error('An unknown error occurred', err);
        }
        return { rental: null, error: 'Unable to return', status: 500 };
    }
};
exports.processReturn = processReturn;
