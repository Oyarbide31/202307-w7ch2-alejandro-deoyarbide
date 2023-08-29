import { Request, Response } from 'express';
import { Film } from '../entities/Films';
import { FilmsRepo } from '../repository/Films.mongo.repository';
import { FilmController } from './films.controller';
describe('FilmController', () => {
  describe('happy path', () => {
    const mockRepo: FilmsRepo = {
      saveData: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as unknown as FilmsRepo;

    const filmController = new FilmController(mockRepo);

    test('should call getAll and return data', async () => {
      const mockData: Film[] = [
        {
          id: '1',
          title: 'Dracula',
          filmDirector: 'Bram Stoker',
          watched: true,
        },
      ];
      (mockRepo.getAll as jest.Mock).mockResolvedValue(mockData);

      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await filmController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('errors', () => {
    const mockRepo: FilmsRepo = {
      getAll: jest.fn().mockRejectedValue(new Error('GetAll Error')),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as FilmsRepo;

    const filmController = new FilmController(mockRepo);

    test('should call getAll and next is call ', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await filmController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
  });
});

/*
Import { Request, Response } from 'express';
import { FilmsRepo } from '../repository/Films.mongo.repository';
import { FilmController } from './films.controller';
describe('FilmController', () => {
  describe('happy path', () => {
    const mockRepo: FilmController = {
      getAll: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as FilmController;

    const filmController = new FilmController(mockRepo);

    test('should call getAll and return data', async () => {
      const mockData = [{ id: '1', title: 'Dracula', filmDirector:'Bram Stoker', watched:true }];
      (mockRepo.getAll as jest.Mock).mockResolvedValue(mockData);

      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await filmController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('errors', () => {
    const mockRepo: FilmsRepo = {
      getAll: jest.fn().mockRejectedValue(new Error('GetAll Error')),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as FilmsRepo;

    const filmController = new FilmController(mockRepo);

    test('should call getAll and next is call ', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await filmController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
  });
});
*/
