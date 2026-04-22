"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRental = exports.getRentals = void 0;
const logging_1 = __importDefault(require("#startup/logging"));
const rental_model_1 = require("#rental/rental.model");
const movie_model_1 = require("#movie/movie.model");
const customer_model_1 = require("#customer/customer.model");
const mongoose_1 = __importDefault(require("mongoose"));
const getRentals = async () => {
    return rental_model_1.Rental.find().sort('-dateOut');
};
exports.getRentals = getRentals;
const createRental = async (customerId, movieId) => {
    const customer = await customer_model_1.Customer.findById(customerId);
    if (!customer)
        return { rental: null, error: 'Invalid customer.', status: 400 };
    const movie = await movie_model_1.Movie.findById(movieId);
    if (!movie)
        return { rental: null, error: 'Invalid movie.', status: 400 };
    if (movie.numberInStock === 0)
        return { rental: null, error: 'Movie not in stock.', status: 400 };
    let rental;
    try {
        await mongoose_1.default.connection.transaction(async () => {
            rental = new rental_model_1.Rental({
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
        return { rental, error: null };
    }
    catch (err) {
        if (err instanceof Error) {
            logging_1.default.error(err.message, err);
        }
        else {
            logging_1.default.error('An unknown error occurred', err);
        }
        return { rental: null, error: 'Unable to create rental', status: 500 };
    }
};
exports.createRental = createRental;
