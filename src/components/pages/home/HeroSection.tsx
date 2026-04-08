import React, { useEffect, useState, useMemo } from "react";

const categories = ["Comedian", "Singer", "Dancer", "Live Band", "Anchor"];

const HeroSection = React.memo(() => {
    const [index, setIndex] = useState(0);

    const currentCategory = useMemo(() => categories[index], [index]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % categories.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* Top Banner Text */}
            <div className="text-center text-lg font-light pt-8">
                Pakistan's Leading Artist Booking Platform for All Events and Celebrations
            </div>

            {/* Main Heading Section */}
            <div className="relative">
                <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-10 pt-12 pb-6 gap-4">
                    <h1 className="text-[60px] md:text-[100px] leading-none font-light">
                        Book
                    </h1>

                    {/* ✅ Animate only the changing word */}
                    <h1
                        className="text-[60px] md:text-[100px] leading-none font-light transition-all duration-500 
             bg-gradient-to-r from-brand-700 via-purple-500 to-brand-800 
             bg-clip-text text-transparent"
                    >
                        {currentCategory}
                    </h1>
                </div>

                {/* Subheading */}
                <p className="text-center text-2xl md:text-[40px] font-light leading-snug text-gray-700 py-6">
                    <span className="text-gray-400 ">for your</span>{" "}
                    <span className="font-medium">Iconic Event</span>
                </p>
            </div>
        </div>
    );
});

export default HeroSection;
