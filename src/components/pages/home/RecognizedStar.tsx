import React from "react";

const RecognizedStar = React.memo(() => {
    return (
        <div className="w-full py-12">
            <div className="flex flex-col md:flex-row w-full justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 gap-10">

                {/* Text Section */}
                <div className="w-full md:w-1/2 z-10 md:pl-10 text-center md:text-left">
                    <p className="text-white text-[20px] sm:text-[24px] lg:text-[30px] xl:text-[35px] leading-normal">
                        <span className="text-gray-800 ">Our </span>
                        <span className="text-gray-800 ">Artists </span>
                        <span className="text-gray-800 ">- </span>
                        <span className="text-gray-600">Captivated </span>
                        <span className="text-gray-600">the </span>
                        <span className="text-gray-600">audience </span>
                        <span className="text-gray-600">with </span>
                        <span className="text-gray-600">his </span>
                        <span className="text-gray-800 ">soulful </span>
                        <span className="text-gray-800 ">performance </span>
                        <span className="text-gray-800 ">at </span>
                        <span className="text-gray-800 ">mega events. </span>
                        <span className="text-gray-600">Events </span>
                        <span className="text-gray-600">that </span>
                        <span className="text-gray-600">remember </span>
                        <span className="text-gray-600">filled </span>
                        <span className="text-gray-600">with </span>
                        <span className="text-gray-600">his </span>
                        <span className="text-gray-600">iconic </span>
                        <span className="text-gray-600">melodies! </span>
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center items-center relative">
                    <div className="relative w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px]">

                        {/* Background Image */}
                        <img
                            alt="decorative-background"
                            src="/images/svg1.png"
                            className="absolute inset-0 w-full h-full object-contain z-0"
                            loading="lazy"
                        />

                        {/* Rotating Image */}
                        <img
                            alt="decorative-circle"
                            src="/images/svg2.png"
                            className="absolute inset-0 w-[90%] h-[90%] m-auto object-contain z-10"
                            style={{ animation: "spin 25s linear infinite" }}
                            loading="lazy"
                        />
                    </div>
                </div>

            </div>
        </div>

    );
});

export default RecognizedStar;
