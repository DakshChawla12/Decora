import React from "react";
import { ReactComponent as Right } from "../assets/iconImages/right-pointer.svg";

const ContactUsHeader = () => {
  return (
    <div className="w-full p-8 space-y-8 lg:px-38">
      <div className="flex text-sm text-gray-800 gap-1">
        <span className="flex items-center">
          Home
          <Right className="h-3 w-3 mx-1" />
        </span>
        <span className="text-black">Contact Us</span>
      </div>
      <div className="flex justify-between items-center w-full lg:pr-80">
        <h1 className="text-3xl font-semibold md:text-6xl">
          We believe in sustainable decor. We’re passionate about life at home.
        </h1>
      </div>

      <div className="flex justify-between items-center w-full">
        <h1 className="text-md md:text-xl">
          Our features timeless furniture, with natural fabrics, curved lines,
          plenty of mirrors and classic design, which can be incorporated into
          any decor project. The pieces enchant for their sobriety, to last for
          generations, faithful to the shapes of each period, with a touch of
          the present
        </h1>
      </div>
    </div>
  );
};

export default ContactUsHeader;
