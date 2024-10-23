import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { envs, USER_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.usersMicroserviceHost,
          port: envs.usersMicroservicePort
        },
      },
    ]),
  ],
})
export class UsersModule {}
