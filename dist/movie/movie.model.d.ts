import { type GenreDocument } from '#genre/genre.model';
import Joi from 'joi';
import mongoose from 'mongoose';
declare const Movie: mongoose.Model<MovieDocument, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, MovieDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<MovieDocument, mongoose.Model<MovieDocument, any, any, any, (mongoose.Document<unknown, any, MovieDocument, any, mongoose.DefaultSchemaOptions> & MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, MovieDocument, any, mongoose.DefaultSchemaOptions> & MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}), any, MovieDocument>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MovieDocument, mongoose.Document<unknown, {}, MovieDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, MovieDocument, mongoose.Document<unknown, {}, MovieDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    title?: mongoose.SchemaDefinitionProperty<string, MovieDocument, mongoose.Document<unknown, {}, MovieDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    genre?: mongoose.SchemaDefinitionProperty<Pick<GenreDocument, "_id" | "name">, MovieDocument, mongoose.Document<unknown, {}, MovieDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    numberInStock?: mongoose.SchemaDefinitionProperty<number, MovieDocument, mongoose.Document<unknown, {}, MovieDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    dailyRentalRate?: mongoose.SchemaDefinitionProperty<number, MovieDocument, mongoose.Document<unknown, {}, MovieDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<MovieDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, MovieDocument>, MovieDocument>;
declare function validateMovie(movie: MovieObject): Joi.ValidationResult<any>;
declare function validateMovieUpdate(movie: Partial<MovieObject>): Joi.ValidationResult<any>;
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
//# sourceMappingURL=movie.model.d.ts.map