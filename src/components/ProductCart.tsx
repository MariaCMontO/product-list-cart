import type { ProductItem } from "../types";

type ProductCartProps = {
   cart: ProductItem[],
  product: ProductItem;
  totalProduct(id: number, cart: ProductItem[]): number | undefined
  deleteFromCart(product: ProductItem): void;
};

export default function ProductCart({
  cart,
  product,
  totalProduct,
  deleteFromCart,
}: ProductCartProps) {
  return (
    <div className="flex justify-between items-center pb-4 border-b">
      <div>
        <p className="text-rose-900 font-semibold">{product.name}</p>
        <span className="text-orange-700 font-semibold mr-3">
          {product.amount}x
        </span>
        <span className="text-rose-400 mr-3 ">
          @ ${product.price.toFixed(2)}
        </span>
        <span className="text-rose-500 font-semibold">
          ${totalProduct(product.id, cart)?.toFixed(2)}
        </span>
      </div>
      <button
        className="border-2 border-rose-300 w-fit h-full rounded-full p-1"
        aria-label="click this button to remove an item"
        type="button"
        onClick={() => deleteFromCart(product)}
      >
        <img className="w-auto" src="/icon-remove-item.svg" alt="Remove item" />
      </button>
    </div>
  );
}
