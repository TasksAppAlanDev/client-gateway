import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, TASK_SERVICE } from 'src/config';

@Module({
  controllers: [TasksController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: TASK_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.taskMicroserviceHost,
          port: envs.taskMicroservicePort,
        },
      },
    ]),
  ],
})
export class TasksModule {}
