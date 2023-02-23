import PianoService, { PianoServiceImpl } from './PianoService';
import Piano from '../models/Piano';
import Repository, { RepositoryImpl } from '../utils/Repository';

jest.mock('../utils/repository', () => {
  class MockRepository implements Repository<Piano> {
    private readonly items: Piano[];

    constructor() {
      this.items = [
        {
          id: '0',
          brand: 'Yamaha',
          model: 'CFX',
          price: '1000000.00',
          imageUrl: '',
          year: '2004',
        },
      ];
    }

    connect = () => Promise.resolve()

    findAll(): Promise<Piano[]> {
      return Promise.resolve<Piano[]>(this.items);
    }

    findMultiple(): Promise<Piano[]> {
      return Promise.resolve<Piano[]>(this.items);
    }

    findById(): Promise<Piano> {
      return Promise.resolve<Piano>(this.items[0]);
    }

    save(): Promise<Piano> {
      return Promise.resolve<Piano>(this.items[0]);
    }

    delete = () => Promise.resolve();
  }

  return {
    RepositoryImpl: MockRepository,
  };
});

describe('PianoService', () => {
  let pianoService: PianoService;
  let pianoRepository: Repository<Piano>;

  beforeEach(() => {
    pianoRepository = new RepositoryImpl<Piano>('piano', (piano) => piano.id);
    pianoService = new PianoServiceImpl(pianoRepository);
  });

  describe('getPianos', () => {
    it('should connect to the data source', async () => {
      const connect = jest.spyOn(pianoRepository, 'connect');
      await pianoService.getAllPianos();
      expect(connect).toBeCalled();
    });

    it('should retrieve all pianos from the data source', async () => {
      const findAll = jest.spyOn(pianoRepository, 'findAll');
      await pianoService.getAllPianos();
      expect(findAll).toBeCalled();

      const pianos = await pianoService.getAllPianos();
      expect(pianos).toEqual([
        {
          id: '0',
          brand: 'Yamaha',
          model: 'CFX',
          price: '1000000.00',
          imageUrl: '',
          year: '2004',
        },
      ]);
    });
  });

  describe('searchPianos', () => {
    it('should connect to the data source', async () => {
      const connect = jest.spyOn(pianoRepository, 'connect');
      await pianoService.getAllPianos();
      expect(connect).toBeCalled();
    });

    it('should retrieve filtered pianos from the data source', async () => {
      const findMultiple = jest.spyOn(pianoRepository, 'findMultiple');
      await pianoService.searchPianos('yamaha');
      expect(findMultiple).toBeCalled();

      const pianos = await pianoService.getAllPianos();
      expect(pianos).toEqual([
        {
          id: '0',
          brand: 'Yamaha',
          model: 'CFX',
          price: '1000000.00',
          imageUrl: '',
          year: '2004',
        },
      ]);
    });
  });

  describe('getSinglePiano', () => {
    it('should connect to the data source', async () => {
      const connect = jest.spyOn(pianoRepository, 'connect');
      await pianoService.getSinglePiano('0');
      expect(connect).toBeCalled();
    });

    it('should retrieve a single piano from the data source', async () => {
      const findById = jest.spyOn(pianoRepository, 'findById');
      await pianoService.getSinglePiano('0');
      expect(findById).toBeCalledWith('0');

      const piano = await pianoService.getSinglePiano('0');
      expect(piano).toEqual({
        id: '0',
        brand: 'Yamaha',
        model: 'CFX',
        price: '1000000.00',
        imageUrl: '',
        year: '2004',
      });
    });
  });

  describe('savePiano', () => {
    it('should connect to the data source', async () => {
      const connect = jest.spyOn(pianoRepository, 'connect');
      await pianoService.savePiano({});
      expect(connect).toBeCalled();
    });

    it('should save a single item to the data source', async () => {
      const save = jest.spyOn(pianoRepository, 'save');
      await pianoService.savePiano({
        id: '2',
      });
      expect(save).toBeCalledWith({
        id: '2',
      });
    });
  });

  describe('deletePiano', () => {
    it('should connect to the data source', async () => {
      const connect = jest.spyOn(pianoRepository, 'connect');
      await pianoService.deletePiano('0');
      expect(connect).toBeCalled();
    });

    it('should remove a single item to the data source', async () => {
      const del = jest.spyOn(pianoRepository, 'delete');
      await pianoService.deletePiano('0');
      expect(del).toBeCalledWith('0');
    });
  });
});
