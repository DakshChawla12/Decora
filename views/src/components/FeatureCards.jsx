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
        description: "On orders above $100",
    },
    {
        id: 2,
        icon: moneyBackIcon,
        title: "Money Back Guarantee",
        description: "30-day money-back policy",
    },
    {
        id: 3,
        icon: securePaymentIcon,
        title: "Secure Payments",
        description: "100% secure payment gateway",
    },
    {
        id: 4,
        icon: supportIcon,
        title: "24/7 Support",
        description: "We're here to help anytime",
    },
];

const FeatureCards = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 w-[85%] mx-auto py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="bg-gray-100 hover:shadow-lg p-6 sm:p-9 lg:p-12 xl:p-16 rounded transition-all duration-300"
                    >
                        <img
                            src={feature.icon}
                            alt={feature.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
                        />
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                            {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};



export default FeatureCards;
