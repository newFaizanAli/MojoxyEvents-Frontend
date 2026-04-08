import React from "react";

const ExcellenceSection = React.memo(() => {
    return (
        <div className="px-4 sm:px-6 md:px-8 py-12">
            <div className="
        relative 
        w-full 
        p-6 
        sm:p-8 
        rounded-[2rem] 
        max-w-7xl 
        mx-auto 
        flex 
        flex-col 
        xl:flex-row 
        items-center 
        xl:items-start 
        gap-12
      ">

                {/* Left Text */}
                <div className="relative z-10 text-center xl:text-left">

                    <p className=" text-gray-700 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                        Committed{" "}
                        <span className="opacity-40 text-gray-500">
                            to <br /> excellence
                        </span>{" "}
                        since <br />
                        <span className="text-[80px] sm:text-[120px] leading-[1]">2020.</span>
                    </p>
                </div>




                {/* Right Stats Grid (Mobile → Desktop) */}
                <div className="
          w-full 
          xl:w-[60%]
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          gap-4 
          xl:flex 
          xl:flex-wrap 
          xl:justify-end
        ">

                    {/* Stat Card */}
                    {[
                        { value: "500+", label: "Celebrities", color: "text-green-400" },
                        { value: "1K+", label: "Performances", color: "text-pink-400" },
                        { value: "100+", label: "Cities", color: "text-red-400" },
                        { value: "5Cr+", label: "Booking Value", color: "text-gray-700" },
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="
                relative 
                w-full 
                xl:w-[300px] 
                h-[160px] 
                sm:h-[180px] 
                rounded-[2rem] 
                p-6 
                flex 
                flex-col 
                items-center 
                justify-center 
                text-center 
                bg-gradient-to-br 
                from-gray-100 
                to-gray-300 
               
                overflow-hidden
              "
                        >
                            <p className={`text-[40px] sm:text-[48px] font-semibold z-10 ${stat.color}`}>
                                {stat.value}
                            </p>
                            <p className="text-sm sm:text-xl  text-gray-600 z-10">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ExcellenceSection;
