import { Injectable } from '@nestjs/common';
import { List } from '../entities/list.entity';
import { ListGateway } from './list-gateway';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ListGatewayInMemory implements ListGateway {
  items: List[] = new Array<List>();

  async create(list: List): Promise<List> {
    const uuid = randomUUID();
    list.id = uuid;
    this.items.push(list);

    return list;
  }

  async findAll(): Promise<List[]> {
    return this.items;
  }

  async findById(id: string): Promise<List> {
    const list = this.items.find((list) => list.id === id);
    if (!list) {
      throw new Error('List not found');
    }

    return list;
  }
}
