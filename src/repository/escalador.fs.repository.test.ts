import { readFile } from 'fs/promises';
import { EscaladorRepo } from './escalador.fs.repository';
jest.mock('fs/promises');

describe('Given the class repository ', () => {
  describe('When we instantiate it', () => {
    const repo = new EscaladorRepo();

    test('then should getAll should return the Fs data', async () => {
      (readFile as jest.Mock).mockReturnValue('[]');
      const result = await repo.getAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
