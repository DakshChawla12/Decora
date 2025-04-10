import React, { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import ShoppingCart from "./ShoppingCart";

const Cart = ({ cartItems }) => {
  const { updateCartHandler, removeCartItem } = useContext(StoreContext);
  const [selectedShipping, setSelectedShipping] = useState("free");

  const getSubtotal = (price, quantity) => (price * quantity).toFixed(2);

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const shippingOptions = [
    { label: "Free shipping", value: "free", cost: 0, symbol: "$" },
    { label: "Express shipping", value: "express", cost: 15, symbol: "$" },
    { label: "Pick Up", value: "pickup", cost: 21, symbol: "$" },
  ];

  const getShippingCost = () => {
    const option = shippingOptions.find((o) => o.value === selectedShipping);
    return option ? option.cost : 0;
  };

  const subtotal = parseFloat(getTotal());
  const total = (subtotal + getShippingCost()).toFixed(2);

  return (
    <div className="flex flex-col h-full w-full gap-20 py-20">
      {/* Title Section */}
      <div className="w-[58%] flex flex-col items-center mx-auto gap-8">
        <h1 className="text-6xl font-semibold">Cart</h1>
        <div className="w-full flex justify-between items-center mx-auto">
          {["Shopping cart", "Checkout details", "Order complete"].map(
            (step, idx) => (
              <p
                key={idx}
                className="flex gap-5 items-center font-semibold text-xl p-6"
              >
                <span className="bg-black rounded-full text-white w-11 h-11 flex items-center justify-center">
                  {idx + 1}
                </span>
                {step}
              </p>
            )
          )}
        </div>
      </div>

      {/* ShoppingCart Component */}
      <ShoppingCart
        cartItems={cartItems}
        updateCartHandler={updateCartHandler}
        removeCartItem={removeCartItem}
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
        shippingOptions={shippingOptions}
        getSubtotal={getSubtotal}
        subtotal={subtotal}
        total={total}
      />
    </div>
  );
};

export default Cart;
