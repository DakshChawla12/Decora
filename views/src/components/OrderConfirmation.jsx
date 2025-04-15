import { useEffect, useState, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { StoreContext } from '../Context/StoreContext';

const OrderConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const { handleNavigate } = useContext(StoreContext);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            handleNavigate('/');
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading, handleNavigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="text-center p-8 bg-green-50">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Successful!</h1>
            <p className="text-gray-600 mb-2">Thank you for your purchase</p>
            <p className="text-sm text-gray-500 mb-4">Redirecting you to home in <span className="font-semibold">{countdown}</span> seconds...</p>
            <button
              className="mt-4 w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              onClick={() => handleNavigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
