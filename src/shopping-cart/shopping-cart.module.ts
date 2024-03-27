import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
//import { MongooseModule } from '@nestjs/mongoose';
//import { ShoppingCartSchema } from './schemas/shopping-cart.schema';
import { ProductsService } from '../products/products.service';
//import { ProductSchema } from '../products/schemas/product.schema';

@Module({
  // imports: [
  //   MongooseModule.forFeature([
  //     { name: 'ShoppingCart', schema: ShoppingCartSchema },
  //     { name: 'Product', schema: ProductSchema },
  //   ]),
  // ],
  providers: [ShoppingCartService, ProductsService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
