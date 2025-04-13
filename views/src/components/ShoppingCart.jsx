import React, { useState } from "react";
import { FiTag } from "react-icons/fi";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import axios from "axios"; // For HTTP requests
import { useNavigate } from "react-router-dom"; // For redirecting

// GraphQL query to validate coupon
const VALIDATE_COUPON = gql`
  query ValidateCoupon($code: String!) {
    validateCoupon(code: $code) {
      id
      code
      percentage
    }
  }
`;

const ShoppingCart = ({
  cartItems,
  updateCartHandler,
  removeCartItem,
  selectedShipping,
  setSelectedShipping,
  shippingOptions,
  getSubtotal,
  subtotal,
  total,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  const [validateCoupon, { loading }] = useLazyQuery(VALIDATE_COUPON, {
    onCompleted: (data) => {
      if (data.validateCoupon) {
        setDiscountPercentage(data.validateCoupon.percentage);
        setCouponError("");
        setCouponSuccess(`Coupon applied! ${data.validateCoupon.percentage}% off.`);
      } else {
        setDiscountPercentage(0);
        setCouponError("Invalid coupon code.");
        setCouponSuccess("");
      }
    },
    onError: () => {
      setCouponError("Error validating coupon. Please try again.");
      setCouponSuccess("");
    },
  });

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      setCouponSuccess("");
      return;
    }

    validateCoupon({ variables: { code: couponCode } });
  };

  // Function to send checkout request to the backend
  const sendCheckoutRequest = async (totalAmount) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/order",
        { totalAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth setup
          },
        }
      );

      return response.data; // Return response data for further handling
    } catch (error) {
      // Throw error with message for handling in caller
      throw new Error(
        error.response?.data?.message || "Error placing order. Please try again."
      );
    }
  };

  const handleCheckout = async () => {
    if (!cartItems.length) {
      setCheckoutError("Your cart is empty.");
      return;
    }

    if (!selectedShipping) {
      setCheckoutError("Please select a shipping option.");
      return;
    }

    setIsCheckingOut(true);
    setCheckoutError("");

    const shippingCost =
      shippingOptions.find((option) => option.value === selectedShipping)?.cost || 0;
    const discountAmount = subtotal * (discountPercentage / 100);
    const totalAmount = subtotal - discountAmount + shippingCost;

    try {
      const response = await sendCheckoutRequest(totalAmount);

      if (response.success) {
        // Clear local state
        setCouponCode("");
        setDiscountPercentage(0);
        setCouponSuccess("");
        setCouponError("");
        // Redirect to orders page
        navigate("/profile"); // Adjust to your route
      } else {
        setCheckoutError(response.message || "Failed to place order.");
      }
    } catch (error) {
      setCheckoutError(error.message);
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  // Calculate total with discount for display
  const shippingCost =
    shippingOptions.find((option) => option.value === selectedShipping)?.cost || 0;
  const discountAmount = subtotal * (discountPercentage / 100);
  const discountedTotal = subtotal - discountAmount + shippingCost;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col lg:flex-row w-[80%] justify-between mx-auto">
        {/* Product List */}
        <div className="h-[59vh] w-full lg:w-[58%] overflow-y-auto">
          {cartItems.length > 0 ? (
            <>
              <div className="flex justify-between text-lg font-semibold mb-6 border-b pb-6">
                <p className="w-[40%]">Product</p>
                <p className="w-[20%] hidden lg:block text-center">Quantity</p>
                <p className="w-[15%] hidden lg:block text-center">Price</p>
                <p className="w-[15%] hidden lg:block text-center">Subtotal</p>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center w-full h-34 pb-6 mb-4 border-b border-gray-300"
                >
                  <div className="flex items-center w-[40%] h-full">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover"
                    />
                    <div className="flex flex-col justify-center ml-4">
                      <p className="font-semibold text-lg">{item.product.name}</p>
                      <button
                        className="text-red-500 text-sm underline hover:text-red-700 transition"
                        onClick={() => removeCartItem(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

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
                      onClick={() => updateCartHandler(item.productId, 1)}
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
            <div className="h-[100%] w-[100%] flex items-center justify-center text-3xl font-medium text-gray-500">
              Your cart is empty.
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="w-[36%]">
          <div className="border-2 rounded-md p-6 border-gray-400 bg-white shadow-sm">
            <h1 className="text-xl font-semibold mb-5">Cart summary</h1>

            <div className="flex flex-col gap-3 mb-6">
              {shippingOptions.map((option) => (
                <div
                  key={option.value}
                  className={`flex justify-between items-center border-2 rounded-sm px-4 py-3 cursor-pointer transition-all duration-200 ${selectedShipping === option.value
                    ? "bg-gray-100 border-black"
                    : "border-gray-400"
                    }`}
                  onClick={() => setSelectedShipping(option.value)}
                >
                  <div className="flex items-center gap-3 text-base">
                    <input
                      type="radio"
                      name="shipping"
                      className="accent-black w-5 h-5"
                      checked={selectedShipping === option.value}
                      onChange={() => setSelectedShipping(option.value)}
                    />
                    <label className="cursor-pointer">{option.label}</label>
                  </div>
                  <span className="font-medium">
                    {option.symbol}
                    {option.cost.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({discountPercentage}%)</span>
                  <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-semibold">${shippingCost.toFixed(2)}</span>
              </div>

              <hr className="border-t border-gray-300" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${discountedTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="mt-6 w-full bg-black text-white py-3 rounded-md text-lg font-medium hover:bg-gray-800 transition disabled:bg-gray-500"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
            {checkoutError && (
              <p className="mt-2 text-red-500 text-sm">{checkoutError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="flex flex-col items-start mx-auto w-[80%] space-y-2 mt-10">
        <p className="text-xl font-semibold text-gray-800">Have a coupon?</p>
        <p className="text-lg text-gray-500">
          Add your code for an instant cart discount
        </p>

        <div className="flex items-center w-full max-w-md border-2 border-gray-500 overflow-hidden">
          <div className="p-4 text-gray-500">
            <FiTag className="w-6 h-6" />
          </div>
          <input
            type="text"
            placeholder="Coupon Code"
            className="flex-grow py-2 outline-none text-md placeholder-gray-500"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="px-4 text-lg font-medium text-black hover:text-gray-600 transition"
            onClick={handleApplyCoupon}
            disabled={loading}
          >
            {loading ? "Applying..." : "Apply"}
          </button>
        </div>
        {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
        {couponSuccess && (
          <p className="text-green-500 text-sm">{couponSuccess}</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;