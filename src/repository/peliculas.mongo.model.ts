import { Schema, model } from 'mongoose';
import { Film } from '../entities/peliculas';

const filmsSchema = new Schema<Film>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  filmDirector: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    required: true,
  },
});

export const NoteModel = model('Film', filmsSchema, 'films');
