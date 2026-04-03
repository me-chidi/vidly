export const Movie: mongoose.Model<{
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
}, mongoose.Document<unknown, {}, {
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        title: string;
        dailyRentalRate: number;
        genre: {
            name: string;
        };
        numberInStock: number;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        title: string;
        dailyRentalRate: number;
        genre: {
            name: string;
        };
        numberInStock: number;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    dailyRentalRate: number;
    genre: {
        name: string;
    };
    numberInStock: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export function validateMovie(movie: any): Joi.ValidationResult<any>;
export function validateMovieUpdate(movie: any): Joi.ValidationResult<any>;
import mongoose = require("mongoose");
import Joi = require("joi");
//# sourceMappingURL=movie.d.ts.map