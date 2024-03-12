// src/products/dto/create-product.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsUrl()
  img_url?: string;

  @IsOptional()
  @IsUrl()
  video_url?: string;
}
