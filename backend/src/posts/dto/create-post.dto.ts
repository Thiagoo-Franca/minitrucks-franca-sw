/*
id        Int      @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean? @default(false)
  photosUrl     String[]
  videosUrl    String
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
*/

import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../generated/prisma/client.js';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  published: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photosUrl: string[];

  @IsOptional()
  @IsString()
  videosUrl: string;

  @IsOptional()
  @IsInt()
  authorId: number;
}
