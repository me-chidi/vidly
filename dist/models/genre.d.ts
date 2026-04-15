import Joi from 'joi';
import mongoose from 'mongoose';
declare const genreSchema: mongoose.Schema<GenreDocument, mongoose.Model<GenreDocument, any, any, any, (mongoose.Document<unknown, any, GenreDocument, any, mongoose.DefaultSchemaOptions> & GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, GenreDocument, any, mongoose.DefaultSchemaOptions> & GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}), any, GenreDocument>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, GenreDocument, mongoose.Document<unknown, {}, GenreDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, GenreDocument, mongoose.Document<unknown, {}, GenreDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, GenreDocument, mongoose.Document<unknown, {}, GenreDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, GenreDocument>;
declare const Genre: mongoose.Model<GenreDocument, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, GenreDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<GenreDocument, mongoose.Model<GenreDocument, any, any, any, (mongoose.Document<unknown, any, GenreDocument, any, mongoose.DefaultSchemaOptions> & GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, GenreDocument, any, mongoose.DefaultSchemaOptions> & GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}), any, GenreDocument>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, GenreDocument, mongoose.Document<unknown, {}, GenreDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, GenreDocument, mongoose.Document<unknown, {}, GenreDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    name?: mongoose.SchemaDefinitionProperty<string, GenreDocument, mongoose.Document<unknown, {}, GenreDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<GenreDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, GenreDocument>, GenreDocument>;
declare function validateGenre(genre: GenreObject): Joi.ValidationResult<any>;
interface GenreDocument extends mongoose.Document {
    name: string;
}
interface GenreObject {
    name: string;
}
export { Genre, validateGenre, genreSchema };
export type { GenreDocument };
//# sourceMappingURL=genre.d.ts.map