import { Genre } from '#genre/genre.model';

export const getGenres = async () => {
    return Genre.find().limit(10).sort({ name: 1 });
}

export const getGenre = async (id: string) => {
    return Genre.findById(id);
}

export const createGenre = async (name: string) => {
    return Genre.create({ name });
}

export const updateGenre = async (id: string, name: string) => {
    return Genre.findByIdAndUpdate(id, { name }, { new: true });
}

export const deleteGenre = async (id: string) => {
    return Genre.findByIdAndDelete(id);
}