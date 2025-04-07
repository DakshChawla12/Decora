import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [productsError, setProductsError] = useState(null);

    const [filterCategory, setFilterCategory] = useState("All Categories");
    const [filterPrice, setFilterPrice] = useState("All Prices");

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



    return (
        <StoreContext.Provider
            value={{
                products,
                loadingProducts,
                productsError,
                fetchProducts,
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
