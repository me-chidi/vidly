import logger from '#startup/logging';
import { Rental } from '#rental/rental.model';
import { Movie } from '#movie/movie.model';
import { Customer } from '#customer/customer.model';
import mongoose from 'mongoose';

export const getRentals = async () => {
    return Rental.find().sort('-dateOut');
}

export const createRental = async (customerId: string, movieId: string) => {
    const customer = await Customer.findById(customerId);
    if (!customer) return { rental: null, error: 'Invalid customer.', code: 400 };

    const movie = await Movie.findById(movieId);
    if (!movie) return { rental: null, error: 'Invalid movie.', code: 400 };

    if (movie.numberInStock === 0) return { rental: null, error: 'Movie not in stock.', code: 400 };

    let rental;
    try {
        await mongoose.connection.transaction(async () => {
            rental = new Rental({
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
    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.error(err.message, err);
        } else {
            logger.error('An unknown error occurred', err);
        }
        return { rental: null, error: 'Unable to create rental', code: 500 };
    }
}