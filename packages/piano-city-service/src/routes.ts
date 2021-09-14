import SERVER from './server';
import PianoController, { PianoControllerImpl } from './controllers/PianoController';
import Repository, { RepositoryImpl } from './utils/Repository';
import PianoService, { PianoServiceImpl } from './services/PianoService';
import Piano from './models/Piano';

const pianoRepository: Repository<Piano> = new RepositoryImpl<Piano>(
  process.env.NODE_ENV === 'test' ? 'piano.test' : 'piano',
  (item) => item.id,
);
const pianoService: PianoService = new PianoServiceImpl(pianoRepository);
const pianoController: PianoController = new PianoControllerImpl(pianoService);

SERVER.get('/pianos', pianoController.getAllPianos);
SERVER.get('/pianos/:pianoId', pianoController.getSinglePiano);
SERVER.put('/pianos/:pianoId', pianoController.savePiano);
SERVER.delete('/pianos/:pianoId', pianoController.deletePiano);
