import * as fs from 'fs';
import { RepositoryImpl } from './Repository';

jest.mock('fs', () => ({
  promises: {
    writeFile() {
      // noop
    },
    mkdir() {
      // noop
    },
    readFile() {
      return Promise.resolve(Buffer.from('[{"id":"0"},{"id":"1"},{"id":"111"},{"id":"11111"}]'));
    },
  },
}));

type Entity = { id: string };

const ID_RETRIEVER = (item: Entity) => item.id;

describe('Repository', () => {
  let repository: RepositoryImpl<Entity>;

  beforeEach(() => {
    repository = new RepositoryImpl<Entity>('foo', ID_RETRIEVER);
  });

  describe('connect', () => {
    it('should ensure existence of default database directory', async () => {
      const mkdir = jest.spyOn(fs.promises, 'mkdir');

      await repository.connect();

      expect(mkdir).toBeCalledWith('.database');
    });

    it('should ensure existence of default database directory', async () => {
      const repositoryWithDir = new RepositoryImpl<Entity>('bar', ID_RETRIEVER, 'other/directory');
      const mkdir = jest.spyOn(fs.promises, 'mkdir');

      await repositoryWithDir.connect();

      expect(mkdir).toBeCalledWith('other/directory');
    });

    it('should load the items from the data source', async () => {
      const readFile = jest.spyOn(fs.promises, 'readFile');

      await repository.connect();

      expect(readFile).toBeCalledWith('.database/foo.json');
    });

    it('should attempt to reset the items when the read fails', async () => {
      const readFile = jest.spyOn(fs.promises, 'readFile');
      readFile.mockImplementationOnce(() => { throw new Error(); });

      const writeFile = jest.spyOn(fs.promises, 'writeFile');
      await repository.connect();

      expect(writeFile).toBeCalledWith('.database/foo.json', '[]');
    });
  });

  describe('findAll', () => {
    beforeEach(async () => {
      await repository.connect();
    });

    it('should return items from the data source', async () => {
      const items = await repository.findAll();
      expect(items).toEqual([
        { id: '0' },
        { id: '1' },
        { id: '111' },
        { id: '11111' },
      ]);
    });
  });

  describe('findMultiple', () => {
    beforeEach(async () => {
      await repository.connect();
    });

    it('should return items from the data source', async () => {
      const items = await repository.findMultiple('1', ['id']);
      expect(items).toEqual([
        { id: '1' },
        { id: '111' },
        { id: '11111' },
      ]);
    });
  });

  describe('findById', () => {
    beforeEach(async () => {
      await repository.connect();
    });

    it('should return an item with matching ID from the data source', async () => {
      const items = await repository.findById('0');
      expect(items).toEqual({ id: '0' });
    });
  });

  describe('save', () => {
    beforeEach(async () => {
      await repository.connect();
    });

    it('should save the item to the data source', async () => {
      const writeFile = jest.spyOn(fs.promises, 'writeFile');
      await repository.save({
        id: '1',
      });

      expect(writeFile).toBeCalled();
    });

    it('should return the new item save to the data source', async () => {
      const newItem = await repository.save({
        id: '1',
      });

      expect(newItem).toEqual({ id: '1' });
    });

    it('should make the new item retrievable', async () => {
      await repository.save({
        id: '1',
      });

      const checkItem = await repository.findById('1');
      expect(checkItem).toEqual({ id: '1' });
    });

    it('should throw when an invalid ID is given', async () => {
      await expect(() => repository.save({})).rejects.toThrow();
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await repository.connect();
    });

    it('should save the item to the data source', async () => {
      const writeFile = jest.spyOn(fs.promises, 'writeFile');
      await repository.delete('0');

      expect(writeFile).toBeCalled();
    });

    it('should do nothing when no matching item was found from the data source', async () => {
      const writeFile = jest.spyOn(fs.promises, 'writeFile');
      writeFile.mockReset();
      await repository.delete('42069');

      expect(writeFile).not.toBeCalled();
    });
  });
});
