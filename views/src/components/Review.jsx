import React from 'react'

const Review = ({ name, review }) => {
    return (
        <div className='w-[100%] border-b border-b-gray-200 h-[4rem] pb-2 flex flex-col gap-y-1 '>
            <span className='text-[0.8rem] font-medium'>{name}</span>
            <p className='text-[0.8rem] text-[#6C7275]'>{review}</p>
        </div>
    )
}

export default Review
