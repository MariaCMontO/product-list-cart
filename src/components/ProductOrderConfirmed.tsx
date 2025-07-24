import { useCart } from "../hooks/useCart";
import type { ProductItem } from "../types";

type ProductOrderConfirmProps = {
  product: ProductItem;
};

export default function ProductOrderConfirm({
  product,
}: ProductOrderConfirmProps) {

  const {totalProduct}=useCart();
  return (
    <div className="flex justify-between items-center pb-4 border-b">
      <div className="flex gap-3">
        <img
          className="rounded w-12"
          src={product.image.thumbnail}
          alt="Product icon"
        />
        <div>
          <p className="text-rose-900 font-semibold text-sm">{product.name}</p>
          <span className="text-orange-700 font-semibold mr-3 text-sm">
            {product.amount}x
          </span>
          <span className="text-rose-500 mr-3 text-sm">
            @ ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
      <span className="text-rose-900 font-semibold text-sm">
        ${totalProduct(product.id)?.toFixed(2)}
      </span>
    </div>
  );
}
