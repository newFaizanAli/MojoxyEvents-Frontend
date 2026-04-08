import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header, Sidebar } from '../components/layout_comp';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <Sidebar />
            </div>

            {/* Main content wrapper */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <Header showIcon={false} showDashboardLink={false} />

                {/* Main area: content centered */}
                <main className="flex-1 flex items-start justify-center overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                    <div className="w-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile toggle button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-30 bg-brand-900 text-white p-4 rounded-full shadow-2xl hover:bg-brand-800 transition-all duration-200 hover:scale-110"
                aria-label="Toggle menu"
            >
                <Menu className="w-6 h-6" />
            </button>
        </div>
    );
};

export default DashboardLayout;