// src/products/dto/create-product.dto.ts
import { IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  price: number;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsUrl()
  img_url?: string;

  @IsOptional()
  @IsUrl()
  video_url?: string;
}
