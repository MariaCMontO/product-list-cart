
import { useCart } from "../hooks/useCart";
import type { Product } from "../types";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({
  product,
}: ProductDetailProps) {

  const {dispatch, itemInCart}= useCart();
  const {id}= product;
  const item= itemInCart(id);

  return (
    <div aria-labelledby="product-name" className="">
      <div className="relative mb-10">
        {item=== undefined || item.amount ===0 ? (
          <>
            <img
              className="rounded-lg"
              src={
                window.innerWidth > 768
                  ? product.image.desktop
                  : product.image.mobile
              }
              alt="Product image"
            />
            <button
              className="absolute w-[163.78px] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex bg-white border border-rose-400 items-center justify-center gap-2 py-3 px-6 rounded-full"
              aria-label="Click this button to add the product to the cart"
              type="button"
              onClick={() => dispatch({type:'add to cart', payload:{product}})}
            >
              <img src="/icon-add-to-cart.svg" alt="Add to cart Icon" />
              <p className="font-medium text-sm">Add to Cart</p>
            </button>
          </>
        ) : (
          <>
            <img
              className="rounded-lg border-[3px] border-orange-700"
              src={
                window.innerWidth > 768
                  ? product.image.desktop
                  : product.image.mobile
              }
              alt="Product image"
            />
            <div className="absolute w-[163.78px] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex bg-orange-700 items-center justify-between py-3 px-6 rounded-full">
              <button
                className="border rounded-full w-auto h-[15px] p-[2px]"
                aria-label="Click this button to decrement product quantity"
                type="button"
                onClick={()=> dispatch({type:'decrease from cart', payload:{id}})}
              >
                <img
                  className="w-auto"
                  src="/icon-decrement-quantity.svg"
                  alt="Decrement quantity"
                />
              </button>
              <p className="font-medium text-white">
                {item.amount}
              </p>
              <button
                className="border rounded-full w-auto p-[2px]"
                aria-label="Click this button to increment product quantity"
                type="button"
                onClick={()=> dispatch({type:'add to cart', payload:{product}})}
              >
                <img
                  className="w-auto"
                  src="/icon-increment-quantity.svg"
                  alt="Increment quantity"
                />
              </button>
            </div>
          </>
        )}
      </div>
      <p className="text-rose-400 text-sm">{product.category}</p>
      <h1 id="product-name" className="text-rose-900 font-semibold">
        {product.name}
      </h1>
      <p className="text-orange-700 font-semibold">
        ${product.price.toFixed(2)}
      </p>
    </div>
  );
}
