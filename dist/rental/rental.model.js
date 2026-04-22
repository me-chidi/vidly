"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rental = void 0;
exports.validateRental = validateRental;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const rentalSchema = new mongoose_1.default.Schema({
    customer: {
        type: new mongoose_1.default.Schema({
            isGold: { type: Boolean, required: true },
            name: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 255
            },
            phone: {
                type: String,
                required: true,
                minLength: 5,
                maxLength: 255
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose_1.default.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minLength: 5,
                maxLength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});
rentalSchema.statics.lookup = function (customerId, movieId) {
    return this.findOne({
        'movie._id': movieId,
        'customer._id': customerId
    });
};
rentalSchema.methods.return = function () {
    this.dateReturned = new Date();
    const rentalDays = (0, moment_1.default)().diff(this.dateOut, 'days'); // might need to change to dayjs or luxon
    this.rentalFee = this.movie.dailyRentalRate * rentalDays;
};
const Rental = mongoose_1.default.model('Rental', rentalSchema);
exports.Rental = Rental;
function validateRental(rental) {
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
