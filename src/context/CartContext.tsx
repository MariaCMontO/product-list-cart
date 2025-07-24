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