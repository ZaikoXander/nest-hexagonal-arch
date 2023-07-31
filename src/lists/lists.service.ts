import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListGateway } from './gateways/list-gateway';
import { List } from './entities/list.entity';
import EventEmitter from 'events';
import { ListCreatedEvent } from './events/list-created.event';

// Criar uma lista no banco de dados e no CRM Externo
// Ports and Adapters
// Porta é uma interface(classe abstrata também)
@Injectable()
export class ListsService {
  constructor(
    @Inject('ListPersistenceGateway')
    private listPersistenceGateway: ListGateway, // porta ListGatewayPrisma
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    await this.listPersistenceGateway.create(list);
    this.eventEmitter.emit('list.created', new ListCreatedEvent(list));

    return list;
  }

  async findAll() {
    return await this.listPersistenceGateway.findAll();
  }

  async findOne(id: string) {
    const list = await this.listPersistenceGateway.findById(id);

    if (!list) {
      throw new Error('List not found');
    }

    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}