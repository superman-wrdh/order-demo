import { Injectable } from '@nestjs/common';
import { ShoppingCartItem } from './schemas/shopping-cart.schema';

@Injectable()
export class ShoppingCartService {
  private shoppingCart: ShoppingCartItem[] = [];
  create(
    productId: string,
    quantity: number,
    price: number,
    userId: string,
    name: string,
    img_url: string,
  ) {
    const cartItemId = (Math.random() * 1000000000).toString();
    const newCartItem = new ShoppingCartItem(
      cartItemId,
      productId,
      quantity,
      price,
      userId,
      name,
      img_url,
    );
    this.shoppingCart.push(newCartItem);
    return cartItemId;
  }

  // findById(id: string): ShoppingCartDocument {}
  findByProductId(cartItemId: string): ShoppingCartItem {
    const carts = this.shoppingCart.filter(
      (item) => item.productId === cartItemId,
    );
    if (carts.length > 0) {
      return carts[0];
    }
    return null;
  }

  findAll(): ShoppingCartItem[] {
    return this.shoppingCart;
  }
  update(cartItemId: string, quantity: number) {
    const cartItemIndex = this.shoppingCart.findIndex(
      (item) => item.id === cartItemId,
    );
    if (cartItemIndex > -1) {
      this.shoppingCart[cartItemIndex].quantity = quantity;
    }
  }

  // delete(id: string){
  delete(cartItemId: string) {
    const cartItemIndex = this.shoppingCart.findIndex(
      (item) => item.id === cartItemId,
    );
    if (cartItemIndex > -1) {
      this.shoppingCart.splice(cartItemIndex, 1);
    }
  }
}
