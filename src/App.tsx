import { useState } from "react";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import ProductOrderConfirm from "./components/ProductOrderConfirmed";
import data from "./data/data.json";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    cart,
    addToCart,
    isEmpty,
    itemInCart,
    totalProduct,
    decreaseFromCart,
    deleteFromCart,
    totalCart,
    restartCart,
  } = useCart();

  const [modal, setModal] = useState(false);

  return (
    <>
      <main className="relative h-[100vh] p-6 flex flex-col gap-6 items-center bg-rose-50 md:flex-row md:gap-8 md:p-[100px] md:items-start">
        {modal && (
          <>
            <div
              className="absolute w-full h-full top-0 left-0 bg-black z-10 opacity-50"
              onClick={() => setModal(false)}
            ></div>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              className="bg-white absolute w-full md:w-[590px] top-[95px] md:top-1/2 md:-translate-y-1/2 left-0 md:left-1/2 md:-translate-x-1/2 h-fit opacity-1 z-20 rounded-tl-lg rounded-tr-lg md:rounded-2xl px-7 md:p-11 py-11 flex flex-col gap-7 items-start"
            >
              <img src="/icon-order-confirmed.svg" alt="" aria-hidden="true" />
              <div className="flex flex-col gap-4">
                <h2
                  id="modal-title"
                  className="text-rose-900 text-5xl font-bold text-start"
                >
                  Order Confirmed
                </h2>
                <p id="modal-desc" className="text-rose-500 font-medium">
                  We hope you enjoy your food!
                </p>
              </div>
              <div className="p-6 bg-rose-50 rounded w-full flex flex-col gap-4">
                {cart.map((product) => (
                  <ProductOrderConfirm
                    product={product}
                    totalProduct={totalProduct}
                  />
                ))}
                <div className="flex justify-between items-center">
                  <p>Order Total</p>
                  <p className="text-2xl text-rose-900 font-bold">
                    ${totalCart().toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="w-full text-white bg-orange-700 hover:bg-orange-800 rounded-full py-4 font-semibold"
                aria-label="Click this button to start a new order"
                type="button"
                onClick={() => {
                  restartCart();
                  setModal(false);
                }}
              >
                Start New Order
              </button>
            </div>
          </>
        )}
        <div
          className="flex flex-col gap-8 md:w-2/3"
          aria-labelledby="desserts-title"
        >
          <h1 id="desserts-title" className="text-4xl text-rose-900 font-bold">
            Desserts
          </h1>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3">
            {data.map((product) => (
              <ProductDetail
                key={product.id}
                product={product}
                addToCart={addToCart}
                itemInCart={itemInCart}
                decreaseFromCart={decreaseFromCart}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/3">
          <Cart
            cart={cart}
            isEmpty={isEmpty}
            totalProduct={totalProduct}
            deleteFromCart={deleteFromCart}
            totalCart={totalCart}
            setModal={setModal}
          />
        </div>
      </main>
    </>
  );
}

export default App;
