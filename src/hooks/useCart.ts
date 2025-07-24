import { useCartContext } from "../context/CartContext";
import type { ProductItem } from "../types";


export const useCart = () => {

  const {state, dispatch}= useCartContext();
  const {cart}= state

  //Funciones auxiliares
  function itemInCart(id: number): ProductItem | undefined {
    return cart.find((item) => item.id === id);
  }

  function totalProduct(id: number) {
    const product = itemInCart(id);
    if (product) {
      return product?.price * product?.amount;
    }
  }

  function totalCart() {
    return cart.reduce((sum, item) => {
      return sum + item.price * item.amount;
    }, 0);
  }

  return {
    itemInCart,
    totalProduct,
    totalCart,
    state,
    dispatch
  };
};
