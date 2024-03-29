// // src/products/schemas/product.schema.ts
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';
//
// @Schema()
// export class Product extends Document {
//   @Prop({ required: true })
//   name: string;
//
//   @Prop({ required: true })
//   price: number;
//
//   @Prop({ required: true })
//   category: string;
//
//   @Prop()
//   img_url: string;
//
//   @Prop()
//   video_url: string;
// }
//
// export const ProductSchema = SchemaFactory.createForClass(Product);

export class Product {
  constructor(
    public _id: string,
    public name: string,
    public price: number,
    public category: string,
    public img_url: string,
    public video_url: string,
  ) {}
}
