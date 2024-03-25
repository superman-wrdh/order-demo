import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShoppingCartDocument = ShoppingCart & Document;

@Schema()
export class ShoppingCart {
  @Prop()
  productId: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  userId: string;

  @Prop()
  name: string;

  @Prop()
  img_url: string;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
