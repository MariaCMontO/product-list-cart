import type { ProductItem } from "../types";

export const useCart = () => {

  //Funciones auxiliares
  function itemInCart(id: number, cart:ProductItem[]): ProductItem | undefined {
    return cart.find((item) => item.id === id);
  }

  function totalProduct(id: number, cart: ProductItem[]) {
    const product = itemInCart(id, cart);
    if (product) {
      return product?.price * product?.amount;
    }
  }

  function totalCart(cart: ProductItem[]) {
    return cart.reduce((sum, item) => {
      return sum + item.price * item.amount;
    }, 0);
  }

  return {
    itemInCart,
    totalProduct,
    totalCart
  };
};
