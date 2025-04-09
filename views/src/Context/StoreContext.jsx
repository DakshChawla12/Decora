import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from '../utils/toatsUtils';

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState(null);
    const [cart, setCart] = useState([]);
    const [filterCategory, setFilterCategory] = useState("All Categories");
    const [filterPrice, setFilterPrice] = useState("All Prices");
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

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

    const fetchAllProducts = async () => {
        setLoadingProducts(true);
        setProductsError(null);

        try {
            const res = await axios.get("http://localhost:5001/api/product");
            setProducts(res.data.products);
        } catch (err) {
            setProductsError("Failed to fetch all products.");
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

            const { success, message, user, token } = response.data;

            if (success) {
                showSuccessToast(message);
                setUser(user || { email });
                localStorage.setItem('token', token);
                navigate("/");
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

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:5001/api/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { success, cartItems } = response.data;
            if (success) {
                setCart(cartItems);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:5001/api/cart/add',
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { success, message, cart: updatedCart } = response.data;

            if (success) {
                setCart(updatedCart);
                showSuccessToast(message || 'Product added to cart!');
            }
        } catch (error) {
            console.error("Add to cart error:", error);
            const errorMsg = error.response?.data?.message || 'Failed to add to cart.';
            showErrorToast(errorMsg);
        }
    };

    const updateCartHandler = async (productId, change) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.put(
                'http://localhost:5001/api/cart',
                {
                    productId,
                    quantity: change
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { success, cart: updatedCart } = response.data;

            if (success) {
                setCart(updatedCart);
            }
        } catch (error) {
            console.error("Update cart error:", error);
        }
    };

    const removeCartItem = async (productId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:5001/api/cart/remove',
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const { success, message, cart: updatedCart } = response.data;

            if (success) {
                setCart(updatedCart);
                showSuccessToast(message || "Item removed from cart.");
            }
        } catch (error) {
            console.error("Remove cart item error:", error);
            const errorMsg = error.response?.data?.message || "Failed to remove item from cart.";
            showErrorToast(errorMsg);
        }
    };

    const handleLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };

    const fetchReviewsByProduct = async (productId) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:5001/api/review/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const reviews = response.data.reviews.map((review) => ({
                id: review._id,
                review: review.review,
                customerName: review.customer?.user?.name || "Anonymous",
            }));

            setReviews(reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error.response?.data || error.message);
            showErrorToast("Failed to load product reviews.");
            setReviews([]);
        }
    };


    const addReview = async (productId, reviewText) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                "http://localhost:5001/api/review",
                {
                    productId,
                    review: reviewText
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const { success, message } = response.data;

            if (success) {
                showSuccessToast(message || "Review added!");
                fetchReviewsByProduct(productId); // ✅ Refresh reviews after posting
            }
        } catch (error) {
            console.error("Add review error:", error);
            const errorMsg = error.response?.data?.message || "Failed to add review.";
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
                fetchAllProducts,
                signupUser,
                loginUser,
                handleNavigate,
                filterCategory,
                setFilterCategory,
                filterPrice,
                setFilterPrice,
                fetchCart,
                user,
                cart,
                handleAddToCart,
                updateCartHandler,
                removeCartItem,
                handleLogOut,
                reviews,
                fetchReviewsByProduct,
                addReview
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
