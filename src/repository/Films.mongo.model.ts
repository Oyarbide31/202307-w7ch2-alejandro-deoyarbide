import { Schema, model } from 'mongoose';
import { Film } from '../entities/Films';

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

export const FilmModel = model('Film', filmsSchema, 'films');
