import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

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
