import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Post, Prisma } from '../generated/prisma/client.js';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(body: CreatePostDto): Promise<{ message: string }> {
    try {
      await this.prisma.post.create({
        data: body,
      });

      return { message: 'Post created successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.prisma.post.findMany();

      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async update(id: number, body: UpdatePostDto): Promise<{ message: string }> {
    try {
      await this.prisma.post.update({
        where: { id },
        data: body,
      });

      return {
        message: 'Post updated successfully',
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Post #${id} not found!`);
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.post.delete({
        where: { id },
      });

      return 'Post deleted Successfully ';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Post #${id} not found!`);
      }
      throw new InternalServerErrorException();
    }
  }
}
