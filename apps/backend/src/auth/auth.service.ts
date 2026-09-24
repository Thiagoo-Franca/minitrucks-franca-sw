import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto/auth.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    data: SignInDto,
  ): Promise<{ message: string; accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
    });

    return { message: 'Sign-in successful', accessToken };
  }

  async signUp(
    data: SignUpDto,
  ): Promise<{ message: string; email: string; name: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    // We are using only ADMIN role for now
    await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: 'ADMIN',
        password: passwordHash,
        id: undefined, // Let Prisma generate the ID
        posts: undefined, // No posts at sign-up
      },
    });

    return {
      message: 'Sign-up successful',
      email: data.email,
      name: data.name,
    };
  }
}
