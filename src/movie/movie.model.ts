import { genreSchema, type GenreDocument } from '#genre/genre.model';
import Joi from 'joi';
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema<MovieDocument>({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 50
    }
});

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie: MovieObject) {
    const schema = Joi.object({
        title: Joi.string().required().min(5).max(255),
        genreId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }), // better to use genreId here to prevent bloat
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0)
    });
    
    return schema.validate(movie);
}

function validateMovieUpdate(movie: Partial<MovieObject>) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(255),
        genreId: Joi.string().hex().length(24).required().messages({
            '*': 'Provide a valid ObjectID'
        }),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0)
    }).min(1);

    return schema.validate(movie);
}

interface MovieDocument extends mongoose.Document {
    title: string;
    genre: Pick<GenreDocument, '_id' | 'name'>;
    numberInStock: number;
    dailyRentalRate: number;
}

interface MovieObject {
    title: string;
    genreId: mongoose.Types.ObjectId;
    numberInStock: number;
    dailyRentalRate: number;
}

export { Movie, validateMovie, validateMovieUpdate };
export type { MovieDocument, MovieObject };