import {
  Controller,
  Get,
  Post,
  //Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
//import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ProductsService } from '../products/products.service';
//import { ShoppingCartDocument } from './schemas/shopping-cart.schema';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly productsService: ProductsService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateShoppingCartDto) {
    // 添加购物车
    // 先根据id查找商品，如果存在就将数量加1，否则就创建一个新的购物车
    const product = this.productsService.findOne(createDto.productId);
    if (!product) {
      return {
        status: 400,
        message: '商品不存在',
      };
    }
    const cart = this.shoppingCartService.findByProductId(createDto.productId);
    if (cart) {
      createDto.quantity = cart.quantity + 1;
      //更新购物车
      return this.shoppingCartService.update(cart.id, createDto.quantity);
    } else {
      //购物车不存在 新建购物车
      createDto.userId = '1';
      createDto.price = product.price;
      createDto.quantity = 1;
      createDto.name = product.name;
      createDto.img_url = product.img_url;
      return this.shoppingCartService.create(
        createDto.productId,
        createDto.quantity,
        createDto.price,
        createDto.userId,
        createDto.name,
        createDto.img_url,
      );
    }
  }

  @Get()
  async findAll() {
    // 获取购物车列表
    return this.shoppingCartService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.shoppingCartService.delete(id);
  }
}
