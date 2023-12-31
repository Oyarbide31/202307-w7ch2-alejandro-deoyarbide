/* eslint-disable lines-between-class-members */
import { readFile, writeFile } from 'fs/promises';
import { Escalador, escaladorNoID } from '../model/escalador';
import { HttpError } from '../model/http.error.js';
import { Repository } from './repository';

export class EscaladorRepo implements Repository<Escalador> {
  private file: string;
  constructor() {
    this.file = 'data.json';
  }

  private async saveData(data: Escalador[]) {
    // Aki
    await writeFile(this.file, JSON.stringify(data), { encoding: 'utf-8' });
  }

  async getAll(): Promise<Escalador[]> {
    const data: Escalador[] = JSON.parse(
      await readFile(this.file, { encoding: 'utf-8' })
    );
    return data;
    /* La funcion de get all es que lo que le devuelve readFile */
  }
  async getById(id: Escalador['id']): Promise<Escalador> {
    const data: Escalador[] = await this.getAll();
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

  async post(newData: escaladorNoID): Promise<Escalador> {
    const data: Escalador[] = await this.getAll();
    const newEscalador: Escalador = {
      ...newData,
      id: Math.floor(Math.random() * 9999).toString(),
    };
    data.push(newEscalador);
    await this.saveData(data);
    return newEscalador;
  }

  async patch(
    id: Escalador['id'],
    item: Partial<Escalador>
  ): Promise<Escalador> {
    const data: Escalador[] = await this.getAll();
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

  async delete(id: Escalador['id']): Promise<void> {
    const data: Escalador[] = await this.getAll();
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
