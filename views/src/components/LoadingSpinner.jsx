import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <svg viewBox="25 25 50 50" className="w-14 animate-spin-custom">
        <circle
          r="20"
          cy="50"
          cx="50"
          className="fill-none stroke-blue-600 stroke-2 stroke-linecap-round animate-dash-custom"
        />
      </svg>
      <style>
        {`
          @keyframes rotate4 {
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes dash4 {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }

            50% {
              stroke-dasharray: 90, 200;
              stroke-dashoffset: -35px;
            }

            100% {
              stroke-dashoffset: -125px;
            }
          }

          .animate-spin-custom {
            transform-origin: center;
            animation: rotate4 2s linear infinite;
          }

          .animate-dash-custom {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            animation: dash4 1.5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
