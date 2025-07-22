import type { Product, ProductItem } from "../types";

//Crear los types de los actions y los states
export type CartStates = {
  cart: ProductItem[];
};

export type CartActions =
  | { type: "add to cart"; payload: { product: Product } }
  | { type: "decrease from cart"; payload: { id:number } }
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

export const cartReducer = (
  state: CartStates = initialState,
  action: CartActions
) => {

  if (action.type === "add to cart") {
    //Verficiar si ya existe el producto en el carrito
    const itemExist = state.cart.findIndex(
      (item) => item.id === action.payload.product.id
    );
    let updatedCart = [...state.cart]; //Siempre trabajar sobre una copia del state

    if (itemExist >= 0) {
      //existe
      updatedCart[itemExist].amount++;
    } else {
      //No existe
      const newItem: ProductItem = { ...action.payload.product, amount: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "decrease from cart") {
    //Extraer el indice
    const index = state.cart.findIndex(
      (item) => item.id === action.payload.id
    );
    let updatedCart = [...state.cart]; //Siempre trabajar sobre una copia del state

    if (index >= 0) {
      updatedCart[index].amount--;
      if (updatedCart[index].amount === 0) {
        updatedCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
      }
    }

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
        cart:[]
    }
  }

  return state
};
