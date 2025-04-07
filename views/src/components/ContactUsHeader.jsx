import React from "react";

const ContactUsHeader = () => {
    return (
        <div className="w-[85%] mx-auto">
            <div className="flex justify-left w-full px-4 md:px-8 py-8">
                <h1>Home &gt; Contact Us</h1>
            </div>
            <div className="flex justify-between items-center w-full px-4 md:px-8 py-4">
                <h1 className="text-2xl md:text-6xl md:w-[75%]">
                    We believe in sustainable decor. We’re passionate about life at home.
                </h1>
            </div>

            <div className="flex justify-between items-center w-full px-4 md:px-8 py-8">
                <h1 className="text-lg md:text-xl md:w-[75%]">
                    Our features timeless furniture, with natural fabrics, curved lines, plenty of
                    mirrors and classic design, which can be incorporated into any decor project.
                    The pieces enchant for their sobriety, to last for generations, faithful to the
                    shapes of each period, with a touch of the present
                </h1>
            </div>
        </div>
    );
};

export default ContactUsHeader;
