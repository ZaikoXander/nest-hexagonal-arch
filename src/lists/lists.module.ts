import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { HttpModule } from '@nestjs/axios';
import { ListGatewayPrisma } from './gateways/list-gateway-prisma';
import { DatabaseModule } from 'src/database/database.module';
import { ListGatewayHttp } from './gateways/list-gateway-http';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { PublishListCreatedListener } from './listeners/publish-list-created.listener';
import { CreateListInCrmJob } from './jobs/create-list-in-crm.job';

@Module({
  imports: [
    DatabaseModule,
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'default',
      defaultJobOptions: {
        attempts: 1,
      },
    }),
  ],
  controllers: [ListsController],
  providers: [
    ListsService,
    ListGatewayPrisma,
    ListGatewayHttp,
    PublishListCreatedListener,
    CreateListInCrmJob,
    {
      provide: 'ListPersistenceGateway',
      useExisting: ListGatewayPrisma,
    },
    {
      provide: 'ListIntegrationGateway',
      useExisting: ListGatewayHttp,
    },
    {
      provide: 'EventEmitter',
      useExisting: EventEmitter2,
    },
  ],
})
export class ListsModule {}
