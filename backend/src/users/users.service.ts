import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { User } from './entities/user.entity.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // create is made by auth module
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user: User | null = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('user #${id} not found!');
    }

    return user;
  }

  update(id: number, body: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return {
        message: 'User deleted successfully!',
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`user #${id} not found!`);
      }
      throw new InternalServerErrorException();
    }
  }
}
