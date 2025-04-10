import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import BlogPage from "./pages/BlogPage";
import LandingPage from "./pages/LandingPage";
import ContactUsPage from "./pages/ContactUsPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import the wrapper
import AdminPage from "./pages/AdminPage";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactUsPage />} />

            {/* 🔒 Protected Route */}
            <Route
                path="/product/:id"
                element={
                    <ProtectedRoute>
                        <SingleProductPage />
                    </ProtectedRoute>
                }
            />

            <Route path="/cart" element={<CartPage />} />

            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
};

export default App;
