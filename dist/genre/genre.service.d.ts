export declare const getGenres: () => Promise<(import("mongoose").Document<unknown, {}, import("#genre/genre.model").GenreDocument, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<import("#genre/genre.model").GenreDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const getGenre: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("#genre/genre.model").GenreDocument, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<import("#genre/genre.model").GenreDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export declare const createGenre: (name: string) => Promise<import("mongoose").Document<unknown, {}, import("#genre/genre.model").GenreDocument, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<import("#genre/genre.model").GenreDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateGenre: (id: string, name: string) => Promise<(import("mongoose").Document<unknown, {}, import("#genre/genre.model").GenreDocument, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<import("#genre/genre.model").GenreDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
export declare const deleteGenre: (id: string) => Promise<(import("mongoose").Document<unknown, {}, import("#genre/genre.model").GenreDocument, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<import("#genre/genre.model").GenreDocument & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}) | null>;
//# sourceMappingURL=genre.service.d.ts.map