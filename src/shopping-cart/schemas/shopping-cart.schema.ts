// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
//
// export type ShoppingCartDocument = ShoppingCart & Document;
//
// @Schema()
// export class ShoppingCart {
//   @Prop()
//   productId: string;
//
//   @Prop()
//   quantity: number;
//
//   @Prop()
//   price: number;
//
//   @Prop()
//   userId: string;
//
//   @Prop()
//   name: string;
//
//   @Prop()
//   img_url: string;
// }
//
// export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);

export class ShoppingCartItem {
  constructor(
    public id: string,
    public productId: string,
    public quantity: number,
    public price: number,
    public userId: string,
    public name: string,
    public img_url: string,
  ) {}
}
