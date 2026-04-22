"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenre = exports.getGenres = void 0;
const genre_model_1 = require("#genre/genre.model");
const getGenres = async () => {
    return genre_model_1.Genre.find().limit(10).sort({ name: 1 });
};
exports.getGenres = getGenres;
const getGenre = async (id) => {
    return genre_model_1.Genre.findById(id);
};
exports.getGenre = getGenre;
const createGenre = async (name) => {
    return genre_model_1.Genre.create({ name });
};
exports.createGenre = createGenre;
const updateGenre = async (id, name) => {
    return genre_model_1.Genre.findByIdAndUpdate(id, { name }, { new: true });
};
exports.updateGenre = updateGenre;
const deleteGenre = async (id) => {
    return genre_model_1.Genre.findByIdAndDelete(id);
};
exports.deleteGenre = deleteGenre;
