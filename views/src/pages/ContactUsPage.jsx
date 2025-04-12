import React from 'react'
import NavBar from '../components/Navbar'
import ContactUsHeader from "../components/ContactUsHeader";
import AboutUsBanner from "../components/AboutUsBanner";
import ContactUsCards from "../components/ContactUsCards";
import FeedbackSection from "../components/FeedbackSection";
import FeatureCards from "../components/FeatureCards";
import Footer from '../components/Footer'

const ContactUsPage = () => {
    return (
        <div className="w-[100%] h-[100%]">
            <NavBar />
            <ContactUsHeader />
            <AboutUsBanner />
            <ContactUsCards />
            <FeedbackSection />
            <FeatureCards />
            <Footer />
        </div>
    );
};

export default ContactUsPage;