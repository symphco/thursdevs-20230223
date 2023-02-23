import Repository from '../utils/Repository';
import Piano from '../models/Piano';

export default interface PianoService {
  getAllPianos(): Promise<Piano[]>;
  searchPianos(q: string): Promise<Piano[]>;
  getSinglePiano(id: string): Promise<Piano | undefined>;
  savePiano(pianoToSave: Partial<Piano>): Promise<Piano>;
  deletePiano(id: string): Promise<void>;
}

export class PianoServiceImpl implements PianoService {
  private readonly pianoRepository: Repository<Piano>;

  constructor(pianoRepository: Repository<Piano>) {
    this.pianoRepository = pianoRepository;
  }

  async getAllPianos(): Promise<Piano[]> {
    await this.pianoRepository.connect();
    return this.pianoRepository.findAll();
  }

  async searchPianos(q: string): Promise<Piano[]> {
    await this.pianoRepository.connect();
    return this.pianoRepository.findMultiple(q, ['brand', 'model']);
  }

  async getSinglePiano(id: string): Promise<Piano | undefined> {
    await this.pianoRepository.connect();
    return this.pianoRepository.findById(id);
  }

  async savePiano(pianoToSave: Partial<Piano>): Promise<Piano> {
    await this.pianoRepository.connect();
    return this.pianoRepository.save(pianoToSave);
  }

  async deletePiano(id: string): Promise<void> {
    await this.pianoRepository.connect();
    return this.pianoRepository.delete(id);
  }
}
