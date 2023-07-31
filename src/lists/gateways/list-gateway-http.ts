import { HttpService } from '@nestjs/axios';
import { List } from '../entities/list.entity';
import { ListGateway } from './list-gateway';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListGatewayHttp implements ListGateway {
  /**
   * Todo repository é um Gateway
   * Mas nem todo Gateway é um repository
   * Repository tem uma responsabilidade de armazenamento
   * Gateway é mais abrangente
   */
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    await lastValueFrom(
      this.httpService.post('lists', {
        name: list.name,
      }),
    );

    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get('lists'));

    return data.map((d) => new List(d.name, d.id));
  }

  async findById(id: string): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`lists/${id}`));

    return new List(data.name, data.id);
  }
}
