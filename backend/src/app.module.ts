import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { PostsModule } from './posts/posts.module.js';
import { AuthService } from './auth/auth.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PostsModule,
  ],
  providers: [AuthService, PrismaService],
})
export class AppModule {}
