import { Injectable } from '@nestjs/common';
//import { InjectModel } from '@nestjs/mongoose';
//import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { productData } from './moke-data';

@Injectable()
export class ProductsService {
  // constructor(
  //   @InjectModel(Product.name) private productModel: Model<Product>,
  // ) {}

  private products: Product[] = productData;

  findAll(): Product[] {
    return this.products;
  }

  findByName(name: string): Product[] {
    return this.products.filter((product) => product.name.includes(name));
  }

  findOne(name: string): Product {
    const products = this.products.filter((product) =>
      product._id.includes(name),
    );
    if (products.length > 0) {
      return products[0];
    } else {
      return null;
    }
  }
}
