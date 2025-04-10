import React from "react";

import freeShippingIcon from "../assets/iconImages/shipping.svg";
import moneyBackIcon from "../assets/iconImages/money.svg";
import securePaymentIcon from "../assets/iconImages/lock.svg";
import supportIcon from "../assets/iconImages/support.svg";

const features = [
    {
        id: 1,
        icon: freeShippingIcon,
        title: "Free Shipping",
        description: "Order above $200",
    },
    {
        id: 2,
        icon: moneyBackIcon,
        title: "Money-back",
        description: "30 days gaurantee",
    },
    {
        id: 3,
        icon: securePaymentIcon,
        title: "Secure Payments",
        description: "100% Secure Payment",
    },
    {
        id: 4,
        icon: supportIcon,
        title: "24/7 Support",
        description: "Phone and Email support",
    },
];

const FeatureCards = () => {
    return (
        <section className="sm:px-6 w-full p-8 lg:py-12 lg:px-38">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-6">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="bg-gray-100 hover:shadow-lg px-4 py-10 sm:p-0 lg:px-10 lg:py-14 rounded transition-all duration-300"
                    >
                        <img
                            src={feature.icon}
                            alt={feature.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 mb-4"
                        />
                        <h3 className="text-sm lg:text-base font-bold lg:font-semibold text-gray-800">
                            {feature.title}
                        </h3>
                        <p className="text-sm lg:text-normal text-gray-600 mt-1">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};



export default FeatureCards;
