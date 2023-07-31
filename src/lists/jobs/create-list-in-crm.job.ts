import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ListGateway } from '../gateways/list-gateway';
import { Inject } from '@nestjs/common';
import { ListCreatedEvent } from '../events/list-created.event';

@Processor()
export class CreateListInCrmJob {
  constructor(
    @Inject('ListIntegrationGateway')
    private listIntegrationGateway: ListGateway,
  ) {}

  @Process('list.created')
  async handle(job: Job<ListCreatedEvent>) {
    console.log('job processando...');
    console.log(job.data);
    const event = job.data;
    await this.listIntegrationGateway.create(event.list);
  }

  @OnQueueFailed({ name: 'list.created' })
  handleError(error: Error) {
    console.log('CreateListInCrmJob', error);
  }
}
