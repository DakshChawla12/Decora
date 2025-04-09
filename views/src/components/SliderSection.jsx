import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import sliderImage1 from "../assets/landingPageImages/sliderImage1.png";
import sliderImage2 from "../assets/landingPageImages/sliderImage2.png";

const SliderSection = () => {
  return (
    <section className="">
      <div className="w-full px-4 md:px-16 lg:px-38">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          className="h-[300px] sm:h-[300px] md:h-[400px] lg:h-[600px]"
        >
          {[sliderImage1, sliderImage2].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-4 sm:px-6 md:px-16 lg:px-38 py-7 md:py-8 sm:py-16">
        <div className="text-start mx-auto md:text-left flex md:justify-center">
          <h2 className="text-4xl sm:text-4xl md:text-7xl font-bold text-gray-800 leading-snug">
            Simply Unique/<br />
            Simply Better.
          </h2>
        </div>

        <div className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-auto md:my-auto text-center md:text-left">
          <span className="text-black font-bold">Decora</span> is a modern home
          decor brand based in Patiala, India — committed to turning houses into
          homes. With carefully selected pieces that combine elegance and
          comfort, we help you create spaces that reflect your style and
          personality.
        </div>
      </div>
    </section>
  );
};

export default SliderSection;
