import { List } from '../entities/list.entity';

export abstract class ListGateway {
  abstract create(list: List): Promise<List>;
  abstract findAll(): Promise<List[]>;
  abstract findById(id: string): Promise<List>;
}
