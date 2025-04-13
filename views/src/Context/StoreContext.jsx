import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
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
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const isTokenValid = (token) => {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    const checkAuthAndSignOutIfInvalid = () => {
        const token = localStorage.getItem('token');
        if (!token || !isTokenValid(token)) {
            localStorage.clear();
            handleNavigate('/login');
        }
    }

    useEffect(() => {
        fetchAllProducts();
        checkAuthAndSignOutIfInvalid();
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
                setIsLoggedIn(true);
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
        setIsLoggedIn(false);
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

    {/** Department */ }
    const getAllDepartments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5001/api/department`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const { success, departments } = response.data;
            if (success) {
                setDepartments(departments);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const createDepartment = async (name) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5001/api/department",
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // ✅ Make sure response.data exists
            if (response.data && response.data.success) {
                setDepartments(response.data.departments); // or whatever your setter is
                showSuccessToast("Department Created");
            } else {
                console.error("Failed to create department:", response.data);
                showErrorToast("Failed to create department");
            }
        } catch (error) {
            showErrorToast("Failed to create department");
            console.error("Error creating department:", error.message);
        }
    };

    const updateDepartment = async (id, name) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(`http://localhost:5001/api/department/${id}`, { name }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data && response.data.success) {
                setDepartments(response.data.departments); // or whatever your setter is
                showSuccessToast("Department Updated");
            } else {
                console.error("Failed to update department:", response.data);
                showErrorToast("Failed to update department");
            }
        } catch (error) {
            showErrorToast("Failed to update department");
            console.log(error);
        }
    };

    const deleteDepartment = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:5001/api/department/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setDepartments(response.data.departments); // or whatever your setter is
                showSuccessToast("Department deleted");
            } else {
                console.error("Failed to deleted department:", response.data);
                showErrorToast("Failed to deleted department");
            }
        } catch (err) {
            showErrorToast("Failed to delete department");
            console.log(err);
        }
    };

    {/** Designation */ }
    const getAllDesignations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5001/api/designation`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setDesignations(response.data.designations);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createDesignation = async (title) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5001/api/designation`,
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setDesignations(response.data.designations);
                showSuccessToast("Designation Created");
            }
        } catch (err) {
            showErrorToast("Failed to add designation");
            console.log(err);
        }
    };

    const deleteDesignation = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:5001/api/designation/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setDesignations(response.data.designations);
                showSuccessToast("Designation deleted");
            }
        } catch (err) {
            showErrorToast("Failed to delete designation");
            console.log(err);
        }
    };

    const updateDesignation = async (id, title) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:5001/api/designation/${id}`,
                { title },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setDesignations(response.data.designations);
                showSuccessToast("Designation Updated");
            }
        } catch (error) {
            showErrorToast("Failed to update designation");
            console.log(error);
        }
    };

    const getAllBrands = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/brand`);
            if (response.data && response.data.success) {
                setBrands(response.data.brands);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createBrand = async (brandName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5001/api/brand`,
                { brandName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setBrands(response.data.brands);
                showSuccessToast("Brand Created");
            }
        } catch (err) {
            showErrorToast("Failed to add brand");
            console.log(err);
        }
    };

    const deleteBrand = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:5001/api/brand/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setBrands(response.data.brands);
                showSuccessToast("Brand deleted");
            }
        } catch (err) {
            showErrorToast("Failed to delete brand");
            console.log(err);
        }
    };

    const updateBrand = async (id, brandName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:5001/api/brand/${id}`,
                { brandName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setBrands(response.data.brands);
                showSuccessToast("Brand Updated");
            }
        } catch (error) {
            showErrorToast("Failed to update brand");
            console.log(error);
        }
    };

    const getAllCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/category`);
            if (response.data && response.data.success) {
                setCategories(response.data.categories);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const createCategory = async (name) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5001/api/category`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setCategories(response.data.categories);
                showSuccessToast("Category Created");
            }
        } catch (err) {
            showErrorToast("Failed to add category");
            console.log(err);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:5001/api/category/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setCategories(response.data.categories);
                showSuccessToast("Category deleted");
            }
        } catch (err) {
            showErrorToast("Failed to delete category");
            console.log(err);
        }
    };

    const updateCategory = async (id, name) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:5001/api/category/${id}`,
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.data && response.data.success) {
                setCategories(response.data.categories);
                showSuccessToast("Category Updated");
            }
        } catch (err) {
            showErrorToast("Failed to update category");
            console.log(err);
        }
    };

    // Get all orders (admin only)
    const getAllOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5001/api/order/admin/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data && response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    const createOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:5001/api/order`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data.success) {
                setOrders(response.data.orders);
            }
        } catch (err) {
            console.error("Failed to create order:", err);
        }
    };

    const updateOrder = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5001/api/order/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data.success) {
                setOrders(response.data.orders);
                showSuccessToast("Status Updated");
            }
        } catch (err) {
            showErrorToast("Failed to update status");
            console.error("Failed to update order:", err);
        }
    };

    const getCustomerOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:5001/api/order`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data && response.data.success) {
                setCustomerOrders(response.data.orders);
            }
        } catch (err) {
            console.error("Failed to fetch customer orders:", err);
        }
    };

    const handleAddProduct = async (productData) => {
        try {
            setLoadingProducts(true);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:5001/api/product`,
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data.success) {
                showSuccessToast("Product created");
                setProducts(response.data.products);
            }
        } catch (err) {
            showErrorToast("Failed to add product");
            console.error(err);
        } finally {
            setLoadingProducts(false);
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `http://localhost:5001/api/product/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data.success) {
                showSuccessToast("Product updated");
                setProducts(response.data.products);
            }
        } catch (error) {
            showErrorToast("Failed to update product");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log("Deleting product with ID:", id);

            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `http://localhost:5001/api/product/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data.success) {
                showSuccessToast("Product deleted");
                setProducts(response.data.products);
            }
        } catch (err) {
            showErrorToast("Failed to delete product");
            console.error(err);
        }
    };

    const getAllEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5001/api/employee`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const { success, employees } = response.data;
            if (success) {
                setEmployees(employees);
            } else {
                showErrorToast("Failed to fetch employees");
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
            showErrorToast("Something went wrong while fetching employees");
        }
    };

    const createEmployee = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "http://localhost:5001/api/employee",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.success) {
                setEmployees(response.data.employees); // Assuming response returns updated list
                showSuccessToast("Employee created");
            } else {
                console.error("Failed to create employee:", response.data);
                showErrorToast("Failed to create employee");
            }
        } catch (error) {
            showErrorToast("Error creating employee");
            console.error("Error:", error.message);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(
                `http://localhost:5001/api/employee/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.success) {
                setEmployees(response.data.employees);
                showSuccessToast("Employee deleted");
            } else {
                showErrorToast("Failed to delete employee");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            showErrorToast("Something went wrong");
        }
    };

    const getAllUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `http://localhost:5001/api/user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const { success, users } = response.data;
            if (success) {
                setUsers(users);
            } else {
                showErrorToast("Failed to fetch users");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            showErrorToast("Something went wrong while fetching users");
        }
    }


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
                addReview,
                getAllDepartments,
                departments,
                createDepartment,
                updateDepartment,
                deleteDepartment,
                getAllDesignations,
                designations,
                createDesignation,
                deleteDesignation,
                updateDesignation,
                brands,
                getAllBrands,
                deleteBrand,
                updateBrand,
                createBrand,
                categories,
                createCategory,
                getAllCategories,
                updateCategory,
                deleteCategory,
                orders,
                getAllOrders,
                createOrder,
                updateOrder,
                handleAddProduct,
                handleDelete,
                handleUpdate,
                employees,
                getAllEmployees,
                createEmployee,
                deleteEmployee,
                getAllUsers,
                users,
                getCustomerOrders,
                customerOrders,
                isLoggedIn
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
