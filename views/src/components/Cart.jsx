import React, { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";

const Cart = ({ cartItems }) => {

  const { updateCartHandler, removeCartItem } = useContext(StoreContext);

  const [selectedShipping, setSelectedShipping] = useState("");


  const getSubtotal = (price, quantity) => (price * quantity).toFixed(2);

  const getTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="flex flex-col h-full w-full gap-20 py-20">
      {/* Title Section */}
      <div className="w-[58%] flex flex-col items-center mx-auto gap-8">
        <h1 className="text-6xl font-semibold">Cart</h1>
        {/* Checkout Steps */}
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

      {/* Cart Section */}
      <div className="flex flex-col items-center">
        <div className="flex w-[80%] justify-between mx-auto">
          {/* Product List */}
          <div className="h-[59vh] w-[58%] overflow-y-auto">
            {cartItems.length > 0 ? (
              <>
                {/* Header */}
                <div className="flex justify-between text-lg font-semibold mb-6 border-b pb-6">
                  <p className="w-[40%]">Product</p>
                  <p className="w-[20%] text-center">Quantity</p>
                  <p className="w-[15%] text-center">Price</p>
                  <p className="w-[15%] text-center">Subtotal</p>
                </div>

                {/* Products */}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center w-full h-34 pb-6 mb-4 border-b border-b-gray-300"
                  >
                    {/* Product Info */}
                    <div className="flex items-center w-[40%] h-full">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover"
                      />
                      <div className="flex flex-col justify-center ml-4">
                        <p className="font-semibold text-lg">
                          {item.product.name}
                        </p>
                        <button
                          className="text-red-500 text-sm underline hover:text-red-700 transition"
                          onClick={() => removeCartItem(item.productId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center w-[20%]">
                      <button
                        className="w-8 h-8 border border-gray-400 text-xl rounded hover:bg-gray-200"
                        onClick={() => updateCartHandler(item.productId, -1)}
                      >
                        -
                      </button>
                      <span className="mx-4 text-lg">{item.quantity}</span>
                      <button
                        className="w-8 h-8 border border-gray-400 text-xl rounded hover:bg-gray-200"
                        onClick={() => updateCartHandler(item.productId, +1)}
                      >
                        +
                      </button>
                    </div>

                    <p className="w-[15%] text-center text-lg font-medium">
                      ${item.product.price}
                    </p>
                    <p className="w-[15%] text-center text-lg font-semibold">
                      ${getSubtotal(item.product.price, item.quantity)}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <div className="h-[100%] w-[100%] flex items-center justify-center text-3xl font-medium text-gray-500">Your cart is empty.</div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col justify-evenly items-center h-[59vh] w-[36%] border border-1 rounded-md">
            <h1 className="text-2xl w-[90%] font-semibold">Cart summary</h1>
            {/* Shipping Options */}
            <div className="flex flex-col w-[90%] gap-3">
              {[
                { label: "Free shipping", value: "free", cost: "$0" },
                { label: "Express shipping", value: "express", cost: "$10" },
                { label: "Pick Up", value: "pickup", cost: "$5" },
              ].map((option) => (
                <div
                  key={option.value}
                  className={`border p-3 rounded-sm flex items-center justify-between cursor-pointer transition ${selectedShipping === option.value ? "bg-gray-200" : ""
                    }`}
                  onClick={() => setSelectedShipping(option.value)}
                >
                  <div className="flex items-center gap-2 text-[1.2rem]">
                    <input
                      type="radio"
                      name="shipping"
                      className="w-5 h-5 accent-black"
                      checked={selectedShipping === option.value}
                      onChange={() => setSelectedShipping(option.value)}
                    />
                    <label>{option.label}</label>
                  </div>
                  <span className="font-semibold text-[1.2rem]">
                    {option.cost}
                  </span>
                </div>
              ))}
            </div>

            <div className="w-[90%]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span>
                <span>${getTotal()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-[90%] bg-black text-white text-xl py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="flex flex-col items-start mx-auto w-[80%]">
        <p>Have a coupon?</p>
        <p>Add your code for an instant cart</p>
        <div className="flex w-[20%] justify-between">
          <p>Coupon Code</p>
          <p>Apply</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
