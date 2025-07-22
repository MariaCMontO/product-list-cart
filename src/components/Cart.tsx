import { useMemo } from "react";
import type { CartActions } from "../reducer/cart-reducer";
import type { ProductItem } from "../types";
import ProductCart from "./ProductCart";

type CartProps = {
  cart: ProductItem[];
  totalProduct(id: number, cart: ProductItem[]): number | undefined;
  dispatch: React.ActionDispatch<[action: CartActions]>
  totalCart(cart: ProductItem[]): number,
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Cart({
  cart,
  totalProduct,
  dispatch,
  totalCart,
  setModal,
}: CartProps) {
>
  const isEmpty = useMemo(() => cart.length === 0, [cart])

  return (
    <div className="bg-white rounded w-full p-6 pb-10 flex flex-col justify-center gap-5">
      <h1 className="text-orange-700 font-bold text-2xl text-left">{`Your Cart (${cart.length})`}</h1>

      {isEmpty ? (
        <div className="flex flex-col items-center gap-4">
          <img src="/illustration-empty-cart.svg" alt="Empty cart" />
          <p className="text-rose-500 font-medium">
            Your added items will appear here
          </p>
        </div>
      ) : (
        <>
          {cart.map((product) => (
            <ProductCart
              cart={cart}
              key={product.id}
              product={product}
              totalProduct={totalProduct}
              deleteFromCart={() => dispatch({type:'delete from cart', payload: {product}})}
            />
          ))}

          <div className="flex justify-between items-center">
            <p>Order Total</p>
            <p className="text-2xl text-rose-900 font-bold">
              ${totalCart(cart).toFixed(2)}
            </p>
          </div>
          <div className="flex gap-2 bg-rose-50 py-4 px-4 rounded">
            <img src="/icon-carbon-neutral.svg" alt="Carbon neutral" />
            <p className="text-sm">
              This is a <span className="font-semibold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            className="text-white bg-orange-700 hover:bg-orange-800 rounded-full py-4 font-semibold"
            aria-label="Click this button to confirm the order"
            type="button"
            onClick={() => setModal(true)}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}
