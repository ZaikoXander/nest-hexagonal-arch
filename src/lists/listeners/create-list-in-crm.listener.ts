import { Inject, Injectable } from '@nestjs/common';
import { ListCreatedEvent } from '../events/list-created.event';
import { ListGateway } from '../gateways/list-gateway';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CreateListInCrmListener {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGateway,
  ) {}

  @OnEvent('list.created')
  async handle(event: ListCreatedEvent) {
    this.listIntegrationGateway.create(event.list);
  }
}
