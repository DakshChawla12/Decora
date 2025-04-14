import { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

const OrderFailure = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="text-center p-8 bg-red-50">
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Failed!</h1>
            <p className="text-gray-600">We couldn't process your order</p>
            <button className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFailure;