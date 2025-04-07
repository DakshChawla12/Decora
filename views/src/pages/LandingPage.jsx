import React from "react";
import NotificationBar from "../components/NotificationBar";
import NavBar from "../components/Navbar";
import SliderSection from "../components/SliderSection";
import BannerGrid from "../components/BannerGrid";
import ProductCarousel from "../components/ProductCarousel";
import FeatureCards from "../components/FeatureCards";
import BannerSection from "../components/BannerSection";
// import BlogSection from "../components/BlogSection";
import NewsLetterHeader from "../components/NewsLetterHeader";
import Footer from "../components/Footer";

const LandingPage = () => {
    return (
        <div>
            <NotificationBar />
            <NavBar />

            <SliderSection />
            <BannerGrid />

            <ProductCarousel />
            <FeatureCards />

            <BannerSection />
            {/* <BlogSection /> */}

            <NewsLetterHeader />
            <Footer />
        </div>
    );
};

export default LandingPage;
