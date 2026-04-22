import Joi from 'joi';
import mongoose from 'mongoose';
import moment from 'moment';

const rentalSchema = new mongoose.Schema<RentalDocument, RentalModel>({
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

rentalSchema.statics.lookup = function(customerId, movieId) {
    return this.findOne({
        'movie._id': movieId,
        'customer._id': customerId
    });
}

rentalSchema.methods.return = function() {
    this.dateReturned = new Date();
    const rentalDays = moment().diff(this.dateOut, 'days'); // might need to change to dayjs or luxon
    this.rentalFee = this.movie.dailyRentalRate * rentalDays; 
}

const Rental = mongoose.model<RentalDocument, RentalModel>('Rental', rentalSchema);

function validateRental(rental: RentalObject) {
    const schema = Joi.object({
        customerId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        movieId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        })
    });
    
    return schema.validate(rental);
}

interface Rental {
    customer: {
        _id: mongoose.Types.ObjectId;
        isGold: boolean;
        name: string;
        phone: string;
    };
    movie: {
        _id: mongoose.Types.ObjectId;
        title: string;
        dailyRentalRate: number;
    };
    dateOut: Date;
    dateReturned?: Date;
    rentalFee?: number;
}

interface RentalDocument extends Rental, mongoose.Document {
    return(): void;
}

interface RentalModel extends mongoose.Model<RentalDocument> {
    lookup(customerId: mongoose.Types.ObjectId, movieId: mongoose.Types.ObjectId): Promise<RentalDocument>;
}

interface RentalObject {
    customerId: mongoose.Types.ObjectId;
    movieId: mongoose.Types.ObjectId;
}

export { Rental, validateRental };
export type { RentalDocument, RentalObject, RentalModel };   