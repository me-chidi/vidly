import logger from '#startup/logging';
import { Rental } from '#rental/rental.model';
import { Movie } from '#movie/movie.model';
import mongoose from 'mongoose';

export const processReturn = async (customerId: mongoose.Types.ObjectId, movieId: mongoose.Types.ObjectId) => {
    const rental = await Rental.lookup(customerId, movieId);

    if (!rental) return { rental: null, error: 'No rental is found for this customer/movie.', code: 404 };
    if (rental.dateReturned) return { rental: null, error: 'Return is already processed.', code: 400 };

    try {
        await mongoose.connection.transaction(async () => {
            rental.return();
            await rental.save();

            await Movie.updateOne({ _id: rental.movie._id }, {
                $inc: { numberInStock: 1 }
            });
        });

        return { rental, error: null, code: 200 };
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message, err);
        } else {
            logger.error('An unknown error occurred', err);
        }
        return { rental: null, error: 'Unable to return', code: 500 };
    }
}