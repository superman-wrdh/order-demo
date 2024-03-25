import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ShoppingCart,
  ShoppingCartDocument,
} from './schemas/shopping-cart.schema';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: Model<ShoppingCartDocument>,
  ) {}

  async create(createDto: any): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel(createDto);
    return createdCart.save();
  }

  async findAll(): Promise<ShoppingCart[]> {
    return this.shoppingCartModel.find().exec();
  }

  async findOne(id: string): Promise<ShoppingCartDocument> {
    return this.shoppingCartModel.findById(id).exec();
  }

  async findByProductId(productId: string): Promise<ShoppingCartDocument> {
    return this.shoppingCartModel.findOne({ productId }).exec();
  }

  async update(id: string, updateDto: any): Promise<ShoppingCart> {
    return this.shoppingCartModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.shoppingCartModel.deleteOne({ _id: id }).exec();
  }
}
