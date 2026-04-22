import mongoose from 'mongoose';
export declare const getMovies: () => Promise<(mongoose.Document<unknown, {}, import("#movie/movie.model").MovieDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#movie/movie.model").MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const createMovie: (data: MovieData) => Promise<(mongoose.Document<unknown, {}, import("#movie/movie.model").MovieDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#movie/movie.model").MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export declare const updateMovie: (id: string, data: Partial<MovieData>) => Promise<{
    movie: (mongoose.Document<unknown, {}, import("#movie/movie.model").MovieDocument, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#movie/movie.model").MovieDocument & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }) | null;
    genreNotFound: boolean;
}>;
export declare const deleteMovie: (id: string) => Promise<(mongoose.Document<unknown, {}, import("#movie/movie.model").MovieDocument, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<import("#movie/movie.model").MovieDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
interface MovieData {
    title: string;
    genreId: string;
    numberInStock: number;
    dailyRentalRate: number;
}
export {};
//# sourceMappingURL=movie.service.d.ts.map