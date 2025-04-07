import React from "react";

import freeShippingIcon from "../assets/freeShippingIcon.png";
import moneyBackIcon from "../assets/moneyBackIcon.png";
import securePaymentIcon from "../assets/securePaymentIcon.png";
import supportIcon from "../assets/supportIcon.png";

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
        <section className="w-full px-4 md:px-16 lg:px-28 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="bg-gray-100 hover:shadow-lg p-16 transition-all duration-300"
                    >
                        <img
                            src={feature.icon}
                            alt={feature.title}
                            className="w-12 h-12 mx-auto mb-4"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureCards;
