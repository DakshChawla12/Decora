import React from "react";
import { Link } from "react-router-dom";
import ticketPercent from "../assets/iconImages/ticket-percent.svg";
import close from "../assets/iconImages/close.svg";

const NotificationBar = () => {
    return (
        <div className="w-full bg-gray-100 py-2 flex items-center justify-center text-xs font-semibold gap-10">

            <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-2 text-center md:text-left">
                <div className="flex items-center space-x-2">
                    <img src={ticketPercent} alt="Discount Icon" className="h-5 w-5" />
                    <span className="text-gray-700">30% off storewide - Limited Time!</span>
                </div>
                <Link to="/offers" className="text-blue-500 underline hover:text-blue-600 hidden md:block">
                    Click here
                </Link>
            </div>

            <div className="flex">
                <img src={close} alt="Close Notification" className="h-3 w-3 cursor-pointer" />
            </div>
        </div>
    );
};

export default NotificationBar;