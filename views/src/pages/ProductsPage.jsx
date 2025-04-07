import React from "react";
import NotificationBar from "../components/NotificationBar";
import NavBar from "../components/Navbar";
import ProductPageHeader from "../components/ProductPageHeader";
import ProductListing from "../components/ProductListing";
import NewsLetterHeader from "../components/NewsLetterHeader";
import Footer from "../components/Footer";

const ProductsPage = () => {
    return (
        <div className="h-[100%] w-[100%]">
            <NotificationBar />
            <NavBar />
            <ProductPageHeader />
            <ProductListing />
            <NewsLetterHeader />
            <Footer />
        </div>
    );
};

export default ProductsPage;
