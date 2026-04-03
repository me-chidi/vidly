"use strict";
const Joi = require('joi');
const mongoose = require('mongoose');
const moment = require('moment');
const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
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
        type: new mongoose.Schema({
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
    const rentalDays = moment().diff(this.dateOut, 'days'); // might need to change to dayjs or luxon
    this.rentalFee = this.movie.dailyRentalRate * rentalDays;
};
const Rental = mongoose.model('Rental', rentalSchema);
function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}
module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
//# sourceMappingURL=rental.js.map