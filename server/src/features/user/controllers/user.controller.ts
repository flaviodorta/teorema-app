import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { UserService } from '../services/user.service';

@UseGuards(AuthGuard)
@Controller('/users')
export class UserController {
  constructor(private service: UserService) {}

  @Get('/all')
  async findAll(): Promise<UserEntity[]> {
    return await this.service.findAll();
  }

  // @Get('/get-by-id')
  // async getUserById(@Body() options: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
  //   const users = await this.service.findOneBy(options: FindOptionsWhere<UserEntity>);

  //   return users;
  // }

  @Get('/get-one-user-by')
  async getOneBy(
    @Body() options: FindOptionsWhere<UserEntity>,
  ): Promise<UserEntity> {
    const users = await this.service.findOneBy(options);

    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  async create(@Body() data: CreateUserDto): Promise<UserEntity | null> {
    const user = await this.service.create(data);

    return new UserEntity({ ...user });
  }
}
