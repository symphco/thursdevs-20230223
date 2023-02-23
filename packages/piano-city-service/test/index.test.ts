import * as fs from 'fs';
import SERVER from '../src/server';
import '../src/routes';
import { RepositoryImpl } from '../src/utils/Repository';
import Piano from '../src/models/Piano';

const DATABASE_DIR = '.database';
const DATABASE_NAME = 'piano.test';

describe('Piano API', () => {
  let repository;

  beforeEach(async () => {
    repository = new RepositoryImpl<Piano>(DATABASE_NAME, (item) => item.id, DATABASE_DIR);
    await repository.connect();
    await fs.promises.writeFile(`${DATABASE_DIR}/${DATABASE_NAME}.json`, JSON.stringify(
      [
        {
          id: '1',
          model: 'Model B',
          brand: 'Steinway & Sons',
          price: '1000000.00',
          year: '1956',
          imageUrl: '',
        },
      ],
      null,
      2,
    ));
  });

  afterEach(async () => {
    await fs.promises.writeFile(`${DATABASE_DIR}/${DATABASE_NAME}.json`, JSON.stringify(
      [
        {
          id: '1',
          model: 'Model B',
          brand: 'Steinway & Sons',
          price: '1000000.00',
          year: '1956',
          imageUrl: '',
        },
      ],
      null,
      2,
    ));
  });

  describe('GET /pianos', () => {
    it('should return 200 on fetching all', async () => {
      const response = await SERVER.inject()
        .get('/pianos')
        .headers({
          Accept: 'application/json',
        });
      expect(response.statusCode).toBe(200);
    });

    it('should return 200 on query', async () => {
      const response = await SERVER.inject()
        .get('/pianos?q=foo')
        .headers({
          Accept: 'application/json',
        });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('GET /pianos/:pianoId', () => {
    it('should return 200 for an existing resource', async () => {
      const response = await SERVER.inject()
        .get('/pianos/1')
        .headers({
          Accept: 'application/json',
        });
      expect(response.statusCode).toBe(200);
    });

    it('should return 400 for a non-existing resource', async () => {
      const response = await SERVER.inject()
        .get('/pianos/100')
        .headers({
          Accept: 'application/json',
        });
      expect(response.statusCode).toBe(404);
    });
  });

  describe('PUT /pianos/:pianoId', () => {
    it('should return 201 for a created resource', async () => {
      const response = await SERVER
        .inject()
        .put('/pianos/2')
        .headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        })
        .payload({
          id: '4',
          model: 'Model B',
          brand: 'Steinway & Sons',
          price: '1000000.00',
          year: '1956',
          imageUrl: '',
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toBe(JSON.stringify({
        id: '2',
        model: 'Model B',
        brand: 'Steinway & Sons',
        price: '1000000.00',
        year: '1956',
        imageUrl: '',
      }));
    });

    it('should return 200 for an updated resource', async () => {
      await SERVER
        .inject()
        .put('/pianos/3')
        .headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })
        .payload({
          id: '3',
          model: 'Model B',
          brand: 'Steinway & Sons',
          price: '1000000.00',
          year: '1956',
          imageUrl: '',
        });

      const response = await SERVER
        .inject()
        .put('/pianos/3')
        .headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })
        .payload({
          id: '3',
          model: 'Model B',
          brand: 'Steinway & Sons',
          price: '1000000.00',
          year: '1956',
          imageUrl: '',
        });
      expect(response.statusCode).toBe(200);
    });

    it('should return 400 for an invalid request', async () => {
      const response = await SERVER
        .inject()
        .put('/pianos/2')
        .headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        })
        .payload({});

      expect(response.statusCode).toBe(400);
    });
  });

  describe('DELETE /pianos/:pianoId', () => {
    it('should return 204 for a deleted resource', async () => {
      await SERVER
        .inject()
        .put('/pianos/4')
        .headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
        })
        .payload({
          id: '4',
          model: 'Model B',
          brand: 'Steinway & Sons',
          price: '1000000.00',
          year: '1956',
          imageUrl: '',
        });

      const response = await SERVER
        .inject()
        .delete('/pianos/4')
        .headers({
          Accept: 'application/json',
        });
      expect(response.statusCode).toBe(204);
    });

    it('should return 404 for deleting a non-existing resource', async () => {
      const response = await SERVER
        .inject()
        .delete('/pianos/400')
        .headers({
          Accept: 'application/json',
        });
      expect(response.statusCode).toBe(404);
    });
  });
});
