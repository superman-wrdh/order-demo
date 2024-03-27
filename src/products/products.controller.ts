// src/products/products.controller.ts
import {
  //Body,
  Controller,
  //Delete,
  Get,
  Query,
  Param,
  //Post,
  //Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
//import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/update-product.dto';
import { productData } from './moke-data';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async findAll(@Query('name') name: string) {
    if (name) {
      return this.productsService.findByName(name);
    }
    return productData;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }
}
