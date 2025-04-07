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
            <div className="w-full px-4 md:px-16 lg:px-28">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{ delay: 3000 }}
                    loop
                    className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-6 md:px-16 lg:px-28 py-12 sm:py-16">
                <div className="text-center md:text-left flex items-center justify-center md:justify-start">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
                        Simply Unique /
                        <br className="hidden sm:block" /> Simply Better.
                    </h2>
                </div>

                <div className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto md:mx-0 text-center md:text-left">
                    Decora is a modern home decor brand based in Patiala, India — committed to
                    turning houses into homes. With carefully selected pieces that combine elegance
                    and comfort, we help you create spaces that reflect your style and personality.
                </div>
            </div>
        </section>
    );
};

export default SliderSection;