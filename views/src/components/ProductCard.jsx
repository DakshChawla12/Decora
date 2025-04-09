import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import newIcon from '../assets/iconImages/newbtn.svg';
import discountIcon from '../assets/iconImages/discountgreen.svg';

const ProductCard = ({ product }) => {
    const { handleNavigate, handleAddToCart } = useContext(StoreContext);

    return (
        <div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col border rounded-lg shadow overflow-hidden cursor-pointer group"
            onClick={() => handleNavigate(`/product/${product.productId}`)}
        >

            {/* Image Section */}
            <div className="relative w-full aspect-[3/4]">
                <div className="absolute top-3 left-2 flex flex-col gap-y-2 z-10">
                    <img src={newIcon} alt="New" className="h-4 w-10" />
                    <img src={discountIcon} alt="Discount" className="h-4 w-10" />
                </div>

                <img
                    src={product.images[0]}
                    alt="Product"
                    className="w-full h-full object-cover rounded-t-lg"
                />

                {/* Add to Cart Button */}
                <button
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product.productId)
                    }}
                >
                    Add to Cart
                </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-y-2 p-3">
                <div className="flex text-lg text-[#343839] font-bold gap-x-1">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </div>

                <p className="text-[#343839] font-bold text-base sm:text-lg">
                    {product.name}
                </p>

                <div className="flex items-center gap-x-2">
                    <span className="text-[#343839] font-bold text-base">
                        ${product.price}
                    </span>
                    <span className="text-gray-500 font-semibold line-through text-sm">
                        ${Math.round(product.price * 1.3)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
