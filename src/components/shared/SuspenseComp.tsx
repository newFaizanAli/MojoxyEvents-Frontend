import React from "react";
import Loader from "./Loader";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const SuspenseComp: React.FC<Props> = ({ children, fallback }) => {
    return <React.Suspense fallback={fallback || <Loader />}>{children}</React.Suspense>;
};

export default SuspenseComp;
