import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import backGround from '../assets/notFound.jpg'; // Import the image

const NotFound = () => {
    const { handleNavigate } = useContext(StoreContext);

    return (
        <section className="flex justify-center">
            <div
                className="w-[100%] h-[100vh] bg-cover bg-center flex items-center rounded-[10px]"
                style={{ backgroundImage: `url(${backGround})` }}
            >
                <div className="flex flex-col gap-[60px] ml-[10%] max-w-[90%] sm:ml-[5%]">
                    <div className="flex flex-col gap-2.5">
                        <p className="text-[#4438CA] font-bold text-[20px]">Not Found</p>
                        <h1 className="text-[70px] sm:text-[50px] xs:text-[35px] font-bold text-black">
                            We can't find the page
                        </h1>
                        <p className="text-[#525252] text-[22px] xs:text-[20px]">
                            Sorry, the page you are looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    <div>
                        <button
                            className="px-[35px] py-[20px] text-white bg-[#4438CA] rounded-[8px] text-[22px] w-fit xs:w-[95%] xs:mx-auto block"
                            onClick={() => handleNavigate('/')}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
