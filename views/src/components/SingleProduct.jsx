import React, { useContext, useState, useEffect } from "react";
import heart from "../assets/iconImages/heart.svg";
import addReviewIcon from "../assets/iconImages/addReview.svg";
import Review from "./Review";
import { StoreContext } from "../Context/StoreContext";
import { ReactComponent as PrevIcon } from "../assets/iconImages/prev.svg";
import { ReactComponent as NextIcon } from "../assets/iconImages/next.svg";
import { ReactComponent as Right } from "../assets/iconImages/right-pointer.svg";

const SingleProduct = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handlePrevImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { handleAddToCart, fetchReviewsByProduct, addReview, reviews } =
    useContext(StoreContext);
  const [reviewInput, setReviewInput] = useState("");

  useEffect(() => {
    if (product?.productId) {
      fetchReviewsByProduct(product.productId);
    }
  }, [product?.productId]);

  const handleReviewSubmit = () => {
    if (reviewInput.trim() !== "") {
      addReview(product.productId, reviewInput);
      setReviewInput("");
    }
  };

  console.log(reviews);

  return (
    <div className="lg:pb-10">
      <div className="flex items-center px-8 lg:px-38">
            <span className="flex items-center text-gray-500">
              Home
              <Right className="h-3 w-3 mx-1" />
              Shop
              <Right className="h-3 w-3 mx-1" />
            </span>
            Product
          </div>
      <div className="w-full h-auto p-8 flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:justify-between lg:px-38 ">
        {/* Left Side - Images */}
        <div className="flex flex-col md:h-[28rem] lg:h-full lg:w-[35rem]">
          <div className="relative">
            <img
              src={product.images?.[activeImageIndex]}
              alt={product.name}
              className="object-cover w-full h-[25.875rem] lg:h-[33rem]"
            />

            {/* Next and Prev Buttons */}
            <PrevIcon
              onClick={handlePrevImage}
              className="absolute left-5 top-1/2 transform -translate-y-1/2 cursor-pointer bg-white rounded-full h-[2.5rem] w-[2.5rem] p-2"
            />
            <NextIcon
              onClick={handleNextImage}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer bg-white rounded-full h-[2.5rem] w-[2.5rem] p-2"
            />
          </div>

          {/* small images */}
          {product.images?.length > 1 && (
            <div className="hidden md:block mt-6 w-full overflow-x-auto">
              <div className="flex justify-between">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`relative cursor-pointer overflow-hidden flex-shrink-0 ${
                      index === activeImageIndex ? "brightness-80" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-24 w-24 object-cover"
                    />
                    {index === activeImageIndex && (
                      <div className="absolute inset-0 bg-black opacity-20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Product Details */}
        <div className="flex flex-col gap-y-3 lg:h-[40.5rem] lg:w-[35rem] justify-between lg:pt-10">
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
          <p className="text-[#6C7275]">{product.description}</p>

          <div className="w-full flex gap-x-4 items-center">
            <span className="font-bold text-3xl">${product.price}</span>
            <span className="font-bold text-2xl text-[#6C7275] line-through">
              ${(product.price * 1.3).toFixed(0)}
            </span>
          </div>

          {/* Brand, Category, Rating */}
          <div className="flex text-sm lg:text-lg justify-between text-gray-600">
            <div className="flex flex-col">
              <strong>Brand</strong>
              <strong>Category</strong>
              <strong>Rating</strong>
              <strong>Stock</strong>
            </div>
            <div className="flex flex-col text-right">
              <p>{product.brand?.brandName}</p>
              <p>{product.category?.name}</p>
              <p>
                {product.rating} ({product.total_reviews} reviews)
              </p>
              <p>
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </p>
            </div>
          </div>

          {/* Wishlist & Cart */}
          <div className="w-full h-full lg:h-[4rem] flex flex-col lg:flex-row gap-y-4 lg:gap-x-4">
            <button className="w-full lg:w-full h-[3rem] lg:h-full rounded-xl flex border-2 items-center justify-center gap-3 text-md lg:text-[1.125rem] font-bold cursor-pointer">
              <img src={heart} alt="Heart" className="h-4 lg:h-4" />
              Wishlist
            </button>
            <button
              className="w-full h-[3rem] lg:h-full bg-black text-white lg:text-[1.125rem] rounded-xl cursor-pointer hover:bg-gray-900"
              onClick={() => handleAddToCart(product.productId)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="flex flex-col h-[29rem] w-full mx-auto p-8 lg:px-38">
        <div className="flex flex-col gap-y-3 w-full">
          <span className="text-[#23262F] text-[1.25rem] font-medium">
            Customer Reviews
          </span>
          <div className="relative w-full h-full">
            <input
              type="text"
              value={reviewInput}
              onChange={(e) => setReviewInput(e.target.value)}
              className="h-[4rem] w-full rounded-2xl pl-5 plceholder:text-[0.875rem] placeholder:text-[#6C7275] border-2 border-gray-300 leading-[2.5rem]"
              placeholder="Share your thoughts"
            />
            <NextIcon
              src={addReviewIcon}
              alt="Add Review"
              onClick={handleReviewSubmit}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 h-[2rem] w-[2rem] p-1 cursor-pointer rounded-full bg-black text-white"
            />
          </div>
        </div>

        {/* Review List */}
        <div className="w-full flex-1 mt-4 overflow-y-auto flex flex-col gap-y-4 border-2 border-gray-200 rounded-2xl p-3">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Review
                key={index}
                name={review.customerName || "Anonymous"}
                review={review.review}
              />
            ))
          ) : (
            <p className="text-lg text-gray-500 text-center my-auto">no reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
