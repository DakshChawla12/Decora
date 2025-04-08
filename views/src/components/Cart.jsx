import React, { useState } from "react";

const Cart = () => {
  const [selectedShipping, setSelectedShipping] = useState("");
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product Name",
      image: "/path/to/image.jpg",
      price: 19,
      quantity: 2,
    },
  ]);

  const increaseQty = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const decreaseQty = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex flex-col h-full w-full gap-20 py-20">
      {/* subdiv 1 */}
      <div className="w-[58%] flex flex-col items-center mx-auto gap-8">
        <h1 className="text-6xl font-semibold">Cart</h1>
        <div className="w-full flex justify-between items-center mx-auto">
          <p className="flex gap-5 items-center font-semibold text-xl border-b-3 p-6">
            <span className="bg-black rounded-full text-white w-11 h-11 flex items-center justify-center">
              1
            </span>
            Shopping cart
          </p>
          <p className="flex gap-5 items-center font-semibold text-xl p-6">
            <span className="bg-black rounded-full text-white w-11 h-11 flex items-center justify-center">
              2
            </span>
            Checkout details
          </p>
          <p className="flex gap-5 items-center font-semibold text-xl p-6">
            <span className="bg-black rounded-full text-white w-11 h-11 flex items-center justify-center">
              3
            </span>
            Order complete
          </p>
        </div>
      </div>

      {/* subdiv 2 */}
      <div className="flex flex-col items-center">
        <div className="flex h-[100%] w-[80%] justify-between mx-auto">
          {/* Product List */}
          <div className="h-[59vh] w-[58%] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between text-lg font-semibold mb-6 border-b pb-6">
              <p className="w-[40%]">Product</p>
              <p className="w-[20%] text-center">Quantity</p>
              <p className="w-[15%] text-center">Price</p>
              <p className="w-[15%] text-center">Subtotal</p>
            </div>

            {/* Products */}
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center w-full h-34 pb-6 mb-4 border-b border-b-gray-300"
              >
                {/* Product Info */}
                <div className="flex items-center justify-between w-[40%] h-full">
                  {/* Image */}
                  <div className="h-full w-28 bg-gray-300 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Remove */}
                  <div className="flex flex-col justify-center ml-4">
                    <p className="font-semibold text-lg">{product.name}</p>
                    <button
                      className="text-red-500 text-sm underline hover:text-red-700 transition"
                      onClick={() => removeProduct(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-center w-[20%]">
                  <button
                    className="w-8 h-8 border border-gray-400 text-xl rounded hover:bg-gray-200"
                    onClick={() => decreaseQty(product.id)}
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{product.quantity}</span>
                  <button
                    className="w-8 h-8 border border-gray-400 text-xl rounded hover:bg-gray-200"
                    onClick={() => increaseQty(product.id)}
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <p className="w-[15%] text-center text-lg font-medium">
                  ${product.price}
                </p>

                {/* Subtotal */}
                <p className="w-[15%] text-center text-lg font-semibold">
                  ${product.price * product.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col justify-evenly items-center h-[59vh] w-[36%] border border-1 rounded-md">
            <h1 className="text-2xl items-start w-[90%] font-semibold">
              Cart summary
            </h1>

            {/* Shipping Options */}
            <div className="flex flex-col w-[90%] gap-3 rounded-md">
              {[
                { label: "Free shipping", value: "free", cost: "$0" },
                { label: "Express shipping", value: "express", cost: "$10" },
                { label: "Pick Up", value: "pickup", cost: "$5" },
              ].map((option) => (
                <div
                  key={option.value}
                  className={`border p-3 rounded-sm flex items-center justify-between cursor-pointer transition ${
                    selectedShipping === option.value ? "bg-gray-200" : ""
                  }`}
                  onClick={() => setSelectedShipping(option.value)}
                >
                  <div className="flex items-center gap-2 text-black text-[1.2rem]">
                    <input
                      type="radio"
                      name="shipping"
                      className="w-5 h-5 accent-black"
                      checked={selectedShipping === option.value}
                      onChange={() => setSelectedShipping(option.value)}
                    />
                    <label>{option.label}</label>
                  </div>
                  <span className="font-semibold text-black text-[1.2rem]">
                    {option.cost}
                  </span>
                </div>
              ))}
            </div>

            <div className="">
              <div className="flex w-full justify-between">Subtotal<span>$1000</span></div>
              <div className="flex w-full justify-between">Total<span>$1000</span></div>
            </div>

            {/* Checkout Button */}
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
