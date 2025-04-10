import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import sliderImage1 from "../assets/landingPageImages/sliderImage1.png";
import sliderImage2 from "../assets/landingPageImages/sliderImage2.png";

const SliderSection = () => {
  const images = [sliderImage1, sliderImage2];

  return (
    <section>
      {/* Slider */}
      <div className="w-full px-8 md:px-16 lg:px-38">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 3000 }}
          loop
          className="h-[19rem] sm:h-[300px] md:h-[400px] lg:h-[33.5rem]"
        >
          {images.map((img, idx) => (
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

      {/* Tagline & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-8 md:px-16 lg:px-38 py-6 sm:py-16 md:py-8 lg:py-15">
        <div className="flex items-start md:items-center">
          <h2 className="text-[2.5rem] sm:text-4xl md:text-7xl lg:text-[4.5rem] font-medium text-gray-800 leading-11 lg:leading-tight">
            Simply Unique/<br />
            Simply Better.
          </h2>
        </div>

        <div className="text-[0.875rem] sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 md:my-auto">
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
