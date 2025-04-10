import React from "react";

const Checkout = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row p-4 gap-6">
        {/* Left Side - Forms */}
        <div className="flex-1 space-y-6">
          {/* Contact Information */}
          <div className="border rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone number"
                className="col-span-2 border p-2 rounded"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="col-span-2 border p-2 rounded"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full border p-2 rounded"
            />
            <div className="grid grid-cols-2 gap-4">
              <select className="border p-2 rounded">
                <option>Country</option>
              </select>
              <input
                type="text"
                placeholder="Town / City"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Zip Code"
                className="border p-2 rounded"
              />
            </div>
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" />
              Use a different billing address (optional)
            </label>
          </div>

          {/* Payment Method */}
          <div className="border rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold">Payment method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" checked />
                Pay by Card Credit
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Paypal
              </label>
              <input
                type="text"
                placeholder="1234 1234 1234"
                className="w-full border p-2 rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="CVC code"
                  className="border p-2 rounded"
                />
              </div>
            </div>
          </div>

          <button className="bg-black text-white py-2 px-4 rounded w-full">
            Place Order
          </button>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:w-1/3 border rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">Order summary</h2>
          {["Black", "Red", "Gold"].map((color, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded" />
                <div>
                  <p className="text-sm font-medium">
                    {color === "Gold" ? "Table lamp" : "Tray Table"}
                  </p>
                  <p className="text-xs text-gray-500">Color: {color}</p>
                </div>
              </div>
              <div className="flex items-center border rounded px-2 py-1">
                <button className="text-sm">-</button>
                <span className="mx-2">2</span>
                <button className="text-sm">+</button>
              </div>
              <p className="text-sm">$38.00</p>
            </div>
          ))}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Input"
              className="border p-2 rounded w-full"
            />
            <button className="bg-black text-white px-4 rounded">Apply</button>
          </div>
          <div className="text-sm text-green-600">
            JenkateMW -$25.00 [Remove]
          </div>
          <div className="text-sm text-gray-600">
            Shipping <span className="float-right">Free</span>
          </div>
          <div className="text-sm text-gray-600">
            Subtotal <span className="float-right">$99.00</span>
          </div>
          <div className="font-semibold">
            Total <span className="float-right">$234.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
