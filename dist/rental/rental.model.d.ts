import Joi from 'joi';
import mongoose from 'mongoose';
declare const Rental: RentalModel;
declare function validateRental(rental: RentalObject): Joi.ValidationResult<any>;
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
//# sourceMappingURL=rental.model.d.ts.map