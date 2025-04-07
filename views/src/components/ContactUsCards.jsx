import React from "react";
import addressIcon from "../assets/addressIcon.png";
import supportIcon from "../assets/supportIcon.png";
import newsLetterIcon from "../assets/iconImages/newsLetterIcon.png";
const contacts = [
    {
        id: 1,
        icon: addressIcon,
        title: "ADDRESS",
        description: "#222 Urban Estate, Patiala",
    },
    {
        id: 2,
        icon: supportIcon,
        title: "CONTACT US",
        description: "+91 99889 20003",
    },
    {
        id: 3,
        icon: newsLetterIcon,
        title: "EMAIL",
        description: "hello@decora.com",
    },
];

const ContactUsCards = () => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 w-[85%] mx-auto py-8">
            <div className="text-xl sm:text-2xl md:text-4xl text-center font-semibold py-6">
                Contact Us
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                {contacts.map((feature) => (
                    <div
                        key={feature.id}
                        className="bg-gray-100 hover:shadow-lg p-6 sm:p-9 md:p-12 lg:p-16 rounded transition-all duration-300"
                    >
                        <img
                            src={feature.icon}
                            alt={feature.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4"
                        />
                        <h3 className="text-base sm:text-lg font-bold text-gray-800">
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

export default ContactUsCards;