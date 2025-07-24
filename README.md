# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### Screenshot

![](./image.png)


### Links

- Solution URL: [Solution here](https://github.com/MariaCMontO/product-list-cart)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Grid
- Tailwind css
- Typescript
- React

### What I learned

With this project, I learned how to implement frameworks like react into my projects. I learned how to create components, include props and manage logic into them. I also learned how to include interaction with a global state using useContext of react, other important fact i included in this project is the integration of the context and other auxliar function in a custom hook.

```ts
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

import { createContext, useContext, useReducer} from 'react';
import type { ReactNode } from 'react';
import { cartReducer, initialState} from '../reducer/cart-reducer';
import type { CartStates, CartActions} from '../reducer/cart-reducer';

//Tipo que define que tendrá el contexto
type CartContextType ={
    state: CartStates,
    dispatch: React.Dispatch<CartActions>;
}

//Crear el contexto
 const CartContext= createContext<CartContextType | null>(null);

 //Crear el provider que envolverá el context
 export function CartProvider({children}: {children: ReactNode}){
    const [state, dispatch]= useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    );
 }

 export function useCartContext(){
    const context= useContext(CartContext);

    if(!context){
        throw new Error('useCart debe usarse dentro de CartProvider');
    }

    return context;
 }

```

### Continued development

I definitely want to keep developing interfaces with tailwind.css and react.

### Useful resources

## Author

- Frontend Mentor - [@MariaCMontO](https://github.com/MariaCMontO)


## Acknowledgments