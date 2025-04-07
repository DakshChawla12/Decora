import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from '../utils/toatsUtils';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState(null);

    const [filterCategory, setFilterCategory] = useState("All Categories");
    const [filterPrice, setFilterPrice] = useState("All Prices");

    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoadingProducts(true);
        setProductsError(null);

        try {
            let minPrice, maxPrice;

            if (filterPrice && filterPrice !== "All Prices") {
                if (filterPrice === "Under $50") {
                    maxPrice = 50;
                } else if (filterPrice === "$50 - $100") {
                    minPrice = 50;
                    maxPrice = 100;
                } else if (filterPrice === "Above $100") {
                    minPrice = 100;
                }
            }

            const res = await axios.post("http://localhost:5001/api/product/filter", {
                minPrice,
                maxPrice
            });

            setProducts(res.data.products);
        } catch (err) {
            setProductsError("Failed to fetch products.");
        } finally {
            setLoadingProducts(false);
        }
    };

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5001/api/user/login", {
                email,
                password,
            });

            const { success, message, user: userData } = response.data;

            if (success) {
                showSuccessToast(message);
                setUser(userData || { email }); // fallback if no user data returned
                setIsLoggedIn(true);
                navigate("/"); // redirect to homepage or dashboard
            }
        } catch (error) {
            showErrorToast(error.response?.data?.message || "Login failed.");
        }
    };

    const signupUser = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5001/api/user/register', formData);
            const { success, message } = response.data;

            if (success) {
                showSuccessToast(message || 'Signup successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Signup failed.';
            showErrorToast(errorMsg);
        }
    };



    return (
        <StoreContext.Provider
            value={{
                products,
                loadingProducts,
                productsError,
                fetchProducts,
                signupUser,
                loginUser,
                filterCategory,
                setFilterCategory,
                filterPrice,
                setFilterPrice,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
