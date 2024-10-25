import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TASK_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { AssignTaskDto, UpdateTaskDto, CreateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
  constructor(@Inject(TASK_SERVICE) private readonly taskClient: ClientProxy) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskClient.send('createTask', createTaskDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  getAllTasks(@Query() paginationDto: PaginationDto) {
    return this.taskClient.send('findAllTasks', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  getTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskClient.send('findTask', id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskClient.send('updateTask', { id, ...updateTaskDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('delete/:id')
  softDeleteTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskClient.send('softDeleteTask', id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('asign/:id')
  async assignTask(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    return this.taskClient.send('asignTask', { taskId, ...assignTaskDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get('userTasks/:userId')
  async getTaskByUserId(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.taskClient
      .send('getTasksByUserId', { userId, paginationDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Post('seed')
  async seedTasks() {
    return this.taskClient.send('seedTasks', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
