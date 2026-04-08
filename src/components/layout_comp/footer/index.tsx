import React from "react";
import { Link } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes/route_paths";
import { Facebook, Instagram, Twitter, } from "lucide-react";

const Footer = React.memo(() => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white border-t border-brand-700/50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <img
                            src="/images/logo_lg_white.png"
                            alt="Logo"
                            className="h-32 w-auto"
                            loading="lazy"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your premier platform for booking talented artists and entertainers
                            for any occasion.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>

                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to={ROUTES_PATHS?.PUBLIC?.HOME}
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={ROUTES_PATHS?.PUBLIC?.CATEGORIES}
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={ROUTES_PATHS?.PUBLIC?.ABOUT}
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={ROUTES_PATHS?.PUBLIC?.CONTACT}
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Artist Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">For Artists</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to={ROUTES_PATHS?.AUTH.SIGNUP}
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Become an Artist
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Artist Guidelines
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Pricing & Packages
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-300 hover:text-white transition-colors text-sm"
                                >
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-300">
                                <svg
                                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>123 Artist Street, Creative City, CC 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                <svg
                                    className="w-5 h-5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:info@example.com"
                                    className="hover:text-white transition-colors"
                                >
                                    info@example.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                <svg
                                    className="w-5 h-5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <a
                                    href="tel:+1234567890"
                                    className="hover:text-white transition-colors"
                                >
                                    +1 (234) 567-890
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-brand-700/50 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-300 text-sm text-center md:text-left">
                            © {currentYear} Artist Booking Platform. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </a>
                            <a
                                href="#"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
});

export default Footer;