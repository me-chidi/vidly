import { Movie } from '#movie/movie.model';
import { Genre } from '#genre/genre.model';
import mongoose from 'mongoose';
import _ from 'lodash';

export const getMovies = async () => {
    return Movie.find().limit(10).sort({ name: 1 });
}

export const createMovie = async (data: MovieData) => {
    const genre = await Genre.findById(data.genreId);
    if (!genre) return null;

    return Movie.create({
        title: data.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: data.numberInStock,
        dailyRentalRate: data.dailyRentalRate
    });
}

export const updateMovie = async (id: string, data: Partial<MovieData>) => {
    const genre = await Genre.findById(data.genreId);
    if (!genre) return { movie: null, genreNotFound: true };

    const updateDocument: UpdateDocumentInDb = {
        ..._.pick(data, ['title', 'numberInStock', 'dailyRentalRate']),
        ...(genre && { genre: { _id: genre._id, name: genre.name } })
    };

    const movie = await Movie.findByIdAndUpdate(id, updateDocument, { new: true });
    return { movie, genreNotFound: false };
}

export const deleteMovie = async (id: string) => {
    return Movie.findByIdAndDelete(id);
}

interface MovieData {
    title: string;
    genreId: string;
    numberInStock: number;
    dailyRentalRate: number;
}

interface UpdateDocumentInDb {
    title?: string;
    genre?: {
        _id: mongoose.Types.ObjectId;
        name: string;
    };
    numberInStock?: number;
    dailyRentalRate?: number;
}