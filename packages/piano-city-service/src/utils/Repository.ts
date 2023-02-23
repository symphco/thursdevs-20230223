import * as fs from 'fs';

export default interface Repository<T, I = string> {
  connect(): Promise<void>;
  findAll(): Promise<T[]>;
  findById(id: I): Promise<T | undefined>;
  findMultiple(q: string, attributes: string[]): Promise<T[]>;
  save(itemToSave: Partial<T>): Promise<T>;
  delete(id: I): Promise<void>;
}

export class RepositoryImpl<T, I = string> implements Repository<T, I> {
  private items: T[];

  private readonly name: string;

  private readonly idRetriever: (item: T) => I;

  private readonly baseDir: string;

  constructor(name: string, idRetriever: (item: T) => I, baseDir = '.database') {
    this.items = [];
    this.name = name;
    this.idRetriever = idRetriever;
    this.baseDir = baseDir;
  }

  private async sync() {
    return fs.promises.writeFile(`${this.baseDir}/${this.name}.json`, JSON.stringify(this.items, null, 2));
  }

  async connect(): Promise<void> {
    try {
      await fs.promises.mkdir(this.baseDir);
    } catch {
      // noop
    }

    try {
      const itemsRaw = await fs.promises.readFile(`${this.baseDir}/${this.name}.json`);
      const itemsStr = itemsRaw.toString('utf-8');
      this.items = JSON.parse(itemsStr) as T[];
      return;
    } catch {
      // noop
    }

    try {
      this.items = [];
      await this.sync();
    } catch {
      // noop
    }
  }

  async findAll(): Promise<T[]> {
    return Promise.resolve(this.items);
  }

  async findById(id: I): Promise<T | undefined> {
    return Promise.resolve(this.items.find((item) => this.idRetriever(item) === id));
  }

  async findMultiple(q: string, attributes: string[]): Promise<T[]> {
    return Promise.resolve(
      this.items.filter((item) => attributes.reduce(
        (e, attr) => e
          || (item as unknown as Record<string, string>)[attr]
            .toString()
            .toLowerCase()
            .includes(q.toLowerCase().trim()),
        false as boolean,
      )),
    );
  }

  async save(itemToSave: Partial<T>): Promise<T> {
    const resolvedItem = itemToSave as T;
    const itemId = this.idRetriever(resolvedItem);

    if (typeof itemId === 'undefined' || itemId === null) {
      throw new TypeError('Cannot generate ID.');
    }

    const index = this.items.findIndex((item) => this.idRetriever(item) === itemId);
    if (index > -1) {
      this.items.splice(index, 1, resolvedItem);
      await this.sync();
      return resolvedItem;
    }

    this.items.push(resolvedItem);
    await this.sync();
    return resolvedItem;
  }

  async delete(id: I): Promise<void> {
    const index = this.items.findIndex((item) => this.idRetriever(item) === id);
    if (index > -1) {
      this.items.splice(index, 1);
      await this.sync();
    }
  }
}
