import React from "react";
import { Link } from "react-router";
import { ROUTES_PATHS } from "../../../routes/route_paths";

const CategoriesSection = React.memo(() => {
    return (
        <div>
            <div className="py-20 flex flex-wrap justify-center gap-16 px-4 text-gray-500 ">
                {/* TEXT SECTION */}
                <div className="max-w-3xl text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
                        Discover Artists from{" "}
                        <span className="text-gray-700"> 10+ Categories </span>
                    </h1>

                    <p className="py-6 text-lg sm:text-xl md:text-2xl text-gray-500 ">
                        Explore all categories and find the perfect artist for your event!
                    </p>

                    <Link
                        to={ROUTES_PATHS?.PUBLIC?.CATEGORIES}
                        className="inline-block py-4 px-8 bg-gradient-to-r from-brand-600 to-purple-700 text-white font-semibold rounded-full text-lg sm:text-xl"
                    >
                        Explore now !
                    </Link>
                </div>

                {/* IMAGE SECTION */}
                <div className="hiddex hidden xl:block relative w-72 sm:w-80 md:w-96">
                    {/* Left image */}
                    <div
                        className="absolute w-32 sm:w-36 md:w-40 h-48 sm:h-56 md:h-64 left-1/2 top-0 -translate-x-1/2"
                        style={{ transform: "rotate(-45deg) translateY(-40px)" }}
                    >
                        <img
                            src="https://cdn.pixabay.com/photo/2023/08/16/10/17/ai-generated-8193799_1280.jpg"
                            alt="Artist 1"
                            className="w-full h-full object-cover rounded-xl shadow-lg border-4 border-white"
                            loading="lazy"
                        />
                    </div>

                    {/* Right image */}
                    <div
                        className="absolute w-32 sm:w-36 md:w-40 h-48 sm:h-56 md:h-64 left-1/2 top-0 -translate-x-1/2"
                        style={{ transform: "rotate(45deg) translateY(40px)" }}
                    >
                        <img
                            src="https://img.freepik.com/premium-photo/indian-belly-dancer-modern-mint-green_961875-342735.jpg"
                            alt="Artist 2"
                            className="w-full h-full object-cover rounded-xl shadow-lg border-4 border-white"
                            loading="lazy"
                        />
                    </div>

                    {/* Center image */}
                    <div
                        className="absolute w-32 sm:w-36 md:w-40 h-48 sm:h-56 md:h-64 left-1/2 top-0 -translate-x-1/2"
                        style={{ transform: "rotate(0deg) translateY(0px)" }}
                    >
                        <img
                            src="https://framerusercontent.com/images/C7Xkw5c48mxHnQX4dm288fvfRs.jpg"
                            alt="Artist 3"
                            className="w-full h-full object-cover rounded-xl shadow-lg border-4 border-white"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CategoriesSection;
