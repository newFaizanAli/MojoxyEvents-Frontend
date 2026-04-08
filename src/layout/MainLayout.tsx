import { Outlet } from "react-router";
import { Footer, Header } from "../components/layout_comp";
import { SuspenseComp } from "../components/shared";



const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1 bg-gradient-to-br from-gray-50 via-white to-gray-100 p-3">
                <div className="max-w-screen-2xl mx-auto">
                    <SuspenseComp>
                        <Outlet />
                    </SuspenseComp>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;