import { PrismaService } from 'src/database/prisma/prisma.service';
import { List } from '../entities/list.entity';
import { ListGateway } from './list-gateway';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListGatewayPrisma implements ListGateway {
  // Repository
  constructor(private prisma: PrismaService) {}

  async create(list: List): Promise<List> {
    const newList = await this.prisma.list.create({
      data: list,
    });
    list.id = newList.id;
    return list;
  }

  async findAll(): Promise<List[]> {
    const lists = await this.prisma.list.findMany();
    return lists.map((list) => new List(list.name, list.id));
  }

  async findById(id: string): Promise<List> {
    const list = await this.prisma.list.findUnique({
      where: {
        id,
      },
    });

    if (!list) {
      throw new Error('List not found');
    }

    return new List(list.name, list.id);
  }
}
