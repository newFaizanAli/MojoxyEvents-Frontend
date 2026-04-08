import React from "react";
import {
    HeroSection, TopImages, RecognizedStar,
    ExcellenceSection, CategoriesSection
} from "../../components/pages/home";
import { PageMeta, SuspenseComp } from "../../components/shared";


const HomePage = React.memo(() => {
    return (
        <div>
            <PageMeta title="Home" />
            <div className="text-gray-800">
                <SuspenseComp>
                    <HeroSection />
                </SuspenseComp>
            </div>
            <div className="flex justify-center">
                <SuspenseComp>
                    <TopImages />
                </SuspenseComp>
            </div>
            <div className="bg-gray-100  shadow-gray-200  shadow-md m-4 rounded-4xl">
                <SuspenseComp>
                    <RecognizedStar />
                </SuspenseComp>
            </div>
            <div>
                <SuspenseComp>
                    <ExcellenceSection />
                </SuspenseComp>
            </div>
            <div className="bg-gray-100  ">
                <SuspenseComp>
                    <CategoriesSection />
                </SuspenseComp>
            </div>
        </div>
    );
});

export default HomePage;
