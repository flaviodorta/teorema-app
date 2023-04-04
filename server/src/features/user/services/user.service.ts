import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UserExistsException } from 'src/errors/UserExistsException';
import { UserNotExistsException } from 'src/errors/UserNotExistsException';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const allUsers = await this.userRepository.find();

    return allUsers;
  }

  async findBy(options: FindOptionsWhere<UserEntity>): Promise<UserEntity[]> {
    const users = (await this.userRepository.findBy(options)) as UserEntity[];

    if (users.length === 0) {
      throw new UserNotExistsException();
    }

    return users;
  }

  async findOneBy(options: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    try {
      const user = (await this.userRepository.findBy(options))[0];

      console.log(user);

      // if (!user) {
      //   throw new BadRequestException();
      // }

      return user as UserEntity;
    } catch {
      throw new NotFoundException('User not exists');
    }
  }

  async create(newUser: CreateUserDto): Promise<UserEntity> {
    const emailExists = await this.emailExists(newUser.email);

    if (emailExists) {
      throw new UserExistsException();
    }

    const hashedPassword = await this.hashPassword(newUser.password);

    newUser.password = hashedPassword;

    const savedUser = (await this.userRepository.save(newUser)) as UserEntity;

    console.log(savedUser);

    return savedUser;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async emailExists(email: string): Promise<boolean> {
    const emailExists = await this.userRepository.findOne({ where: { email } });

    if (emailExists) {
      return true;
    }

    return false;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    return isPasswordCorrect;
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
  }
}
