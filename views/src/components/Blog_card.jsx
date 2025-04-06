import React from 'react'

const Blog_card = ({ image, title, date }) => {
    return (
        <div className="w-[357px] h-[433px] flex flex-col gap-4">
            <img src={image} alt={title} />
            <div className="h-[84px] w-[352px] flex flex-col gap-3">
                <p className="text-[18px] text-wrap">{title}</p>
                <p className="text-gray-600 text-[10px] text-wrap">{date}</p>
            </div>
        </div>
    );
}

export default Blog_card;