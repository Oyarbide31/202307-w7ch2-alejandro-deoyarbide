import createDebug from 'debug';
import { readFile, writeFile } from 'fs/promises';
import { Film } from '../entities/Films.js';
import { HttpError } from '../model/http.error.js';
import { Repository } from './repository.js';
const debug = createDebug('W6E:Repo:TasksFsRepo');

export class FilmsRepo implements Repository<Film> {
  private file: string;
  constructor() {
    this.file = 'data.json';
    debug('Instantiated');
  }

  private async saveData(data: Film[]) {
    // Aki
    await writeFile(this.file, JSON.stringify(data), { encoding: 'utf-8' });
  }

  async getAll(): Promise<Film[]> {
    const data: Film[] = JSON.parse(
      await readFile(this.file, { encoding: 'utf-8' })
    );
    return data;
    /* La funcion de get all es que lo que le devuelve readFile */
  }

  async getById(id: Film['id']): Promise<Film> {
    const data: Film[] = await this.getAll();
    const item = data.find((item) => item.id === id);
    if (!item)
      throw new HttpError(
        404,
        'Not Found',
        'escalador not found in file system',
        {
          cause: 'Trying getById',
        }
      );
    return item;
  }

  async post(newData: Film): Promise<Film> {
    // Duda  newData:FilmNoId -> lo he pasado a Film pq en el tipado Film auna ambas, es correcto¿?
    const data: Film[] = await this.getAll();
    const newEscalador: Film = {
      ...newData,
      id: Math.floor(Math.random() * 9999).toString(),
    };
    data.push(newEscalador);
    await this.saveData(data);
    return newEscalador;
  }

  async patch(id: Film['id'], item: Partial<Film>): Promise<Film> {
    const data: Film[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(
        404,
        'Not Found',
        'escalador not found in file system',
        {
          cause: 'Trying update',
        }
      );
    data[index] = { ...data[index], ...item };
    await this.saveData(data);
    return data[index];
  }

  async delete(id: Film['id']): Promise<void> {
    const data: Film[] = await this.getAll();
    const index = data.findIndex((item) => item.id === id);
    if (index < 0)
      throw new HttpError(
        404,
        'Not Found',
        'escalador not found in file system',
        {
          cause: 'Trying delete',
        }
      );
    data.splice(index, 1);

    await this.saveData(data);
  }
}
