import type { Product, ProductItem } from "../types";

//Crear los types de los actions y los states
export type CartStates = {
  cart: ProductItem[];
};

export type CartActions =
  | { type: "add to cart"; payload: { product: Product } }
  | { type: "decrease from cart"; payload: { id: number } }
  | { type: "delete from cart"; payload: { product: ProductItem } }
  | { type: "restart cart"; payload: {} };

//Cart inicial con local storage
const initialCart = (): ProductItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

//State inicial
export const initialState: CartStates = {
  cart: initialCart(),
};

export const cartReducer = (state: CartStates, action: CartActions) => {
  if (action.type === "add to cart") {
    //Verficar si ya existe el producto en el carrito
    const item = state.cart.find(
      (item) => item.id === action.payload.product.id
    );
    let updatedCart: ProductItem[] = [];

    //Hacer un arreglo de elementos copiados uno a uno depende si existe o no
    if (item) {
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.product.id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return { ...item };
        }
      });
    } else {
      //No existe
      const newItem: ProductItem = { ...action.payload.product, amount: 1 };
      updatedCart = [...state.cart, newItem]; //No es necesario copiar todos los objetos ya que solo se añade uno nuevo y no modificar los otros
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "decrease from cart") {
    
    const updatedCart: ProductItem[] = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return { ...item };
        }
      })
      .filter((item) => item.amount !== 0);

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "delete from cart") {
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.product.id
    );

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "restart cart") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
