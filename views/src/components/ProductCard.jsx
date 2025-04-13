import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import newIcon from "../assets/iconImages/newbtn.svg";
import discountIcon from "../assets/iconImages/discountgreen.svg";

const ProductCard = ({ product }) => {

  const { handleNavigate, handleAddToCart } = useContext(StoreContext);

  return (
    <div
      className="h-[24.5] w-[14.44rem] max-w-xs sm:max-w-sm md:max-w-md flex flex-col overflow-hidden cursor-pointer group"
      onClick={() => handleNavigate(`/product/${product.productId}`)}
    >
      {/* Image Section */}
      <div className="relative h-[19.28rem] w-full aspect-[3/4]">
        <div className="absolute top-3 left-3 flex flex-col gap-y-2 z-10">
          <img src={newIcon} alt="New" className="h-[1.5rem]" />
          <img src={discountIcon} alt="Discount" className="h-[1.5rem]" />
        </div>

        <img
          src={product.images[0]}
          alt="Product"
          className="w-full h-full object-cover"
        />

        {/* Add to Cart Button */}
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-xs lg:text-[1rem] w-[13rem] py-3 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.productId);
          }}
        >
          Add to cart
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-col h-full justify-center">
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
