import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { USER_SERVICE } from 'src/config';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send('createUser', createUserDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.userClient.send('findAllUsers', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userClient.send('findUser', id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userClient
      .send('updateUser', {
        id,
        ...updateUserDto,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch('delete/:id')
  softDeleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userClient.send('softDeleteUser', id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('seed')
  async seedTasks() {
    return this.userClient.send('seedUsers', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
