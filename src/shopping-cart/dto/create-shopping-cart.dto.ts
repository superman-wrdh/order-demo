import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateShoppingCartDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  price: number;

  @IsOptional()
  name: string;

  @IsOptional()
  img_url: string;

  @IsOptional()
  userId: string;
}
