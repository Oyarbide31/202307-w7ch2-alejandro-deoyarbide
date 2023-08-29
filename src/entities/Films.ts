export type WithId = {
  id: string;
};

export type FilmNoId = {
  title: string;
  filmDirector: string;
  watched: boolean;
};

export type Film = WithId & FilmNoId;
