import React from "react";

const Blog_card = ({ image, title, date }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between gap-5">
      <img src={image} alt={title} />
      <p className="text-[18px] text-wrap">{title}</p>
      <p className="text-gray-600 text-[10px] text-wrap">{date}</p>
    </div>
  );
};

export default Blog_card;
