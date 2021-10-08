export default class BaseService {
  async create(..._args: unknown[]): Promise<unknown> {
    throw new Error('Метод не определён');
  }

  async request(..._args: unknown[]): Promise<unknown> {
    throw new Error('Метод не определён');
  }

  async update(..._args: unknown[]): Promise<unknown> {
    throw new Error('Метод не определён');
  }

  async delete(..._args: unknown[]): Promise<unknown> {
    throw new Error('Метод не определён');
  }

  async find(..._args: unknown[]): Promise<unknown> {
    throw new Error('Метод не определён');
  }
}
