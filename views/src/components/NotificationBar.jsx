import React from "react";
import { Link } from "react-router-dom";
import ticketPercent from "../assets/ticketPercent.png";
import unionIcon from "../assets/unionIcon.png";

const NotificationBar = () => {
    return (
        <div className="w-full bg-gray-100 px-4 py-2 flex flex-col md:flex-row items-center justify-between text-sm">
            <div className="hidden md:flex flex-1"></div>

            <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 text-center md:text-left">
                <div className="flex items-center space-x-2 mb-2 md:mb-0">
                    <img src={ticketPercent} alt="Discount Icon" className="h-5 w-5" />
                    <span className="text-gray-700">30% off storewide - Limited Time</span>
                </div>
                <Link to="/offers" className="text-blue-500 underline hover:text-blue-600">
                    Click here
                </Link>
            </div>

            <div className="hidden md:flex flex-1 justify-end">
                <img src={unionIcon} alt="Close Notification" className="h-3 w-3 cursor-pointer" />
            </div>
        </div>
    );
};

export default NotificationBar;