import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinkClass = (path) =>
        `text-sm font-medium transition-colors duration-300 ${location.pathname === path
            ? "text-primary font-semibold"
            : "text-gray-700 hover:text-primary"
        }`;

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
                : "bg-transparent py-5"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                            src="/logo.png"
                            alt="SariCare Logo"
                            className="relative h-12 w-12 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <span className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
                        Sari0<span className="text-primary">Care</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {user && user.role === 'admin' ? (
                        <Link className={navLinkClass("/admin")} to="/admin">
                            Admin Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link className={navLinkClass("/")} to="/">
                                Home
                            </Link>
                            <Link className={navLinkClass("/services")} to="/services">
                                Services
                            </Link>
                            <Link className={navLinkClass("/contact")} to="/contact">
                                Contact
                            </Link>
                            {user && (
                                <Link className={navLinkClass("/my-bookings")} to="/my-bookings">
                                    My Bookings
                                </Link>
                            )}
                        </>
                    )}
                </nav>
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Hi, {user.name.split(' ')[0]}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                            {user.role !== 'admin' && (
                                <Link
                                    to="/pickup"
                                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    Book Pickup
                                </Link>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {user && user.role === 'admin' ? (
                                <>
                                    <Link
                                        className={navLinkClass("/admin")}
                                        to="/admin"
                                        onClick={() => setOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setOpen(false);
                                        }}
                                        className="text-left text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                // User / Guest Mobile Links
                                <>
                                    <Link
                                        className={navLinkClass("/")}
                                        to="/"
                                        onClick={() => setOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className={navLinkClass("/services")}
                                        to="/services"
                                        onClick={() => setOpen(false)}
                                    >
                                        Services
                                    </Link>
                                    {user ? (
                                        <>
                                            <Link
                                                className={navLinkClass("/my-bookings")}
                                                to="/my-bookings"
                                                onClick={() => setOpen(false)}
                                            >
                                                My Bookings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setOpen(false);
                                                }}
                                                className="text-left text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                            >
                                                Logout
                                            </button>
                                            <Link
                                                to="/pickup"
                                                className="bg-primary text-white w-full text-center py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
                                                onClick={() => setOpen(false)}
                                            >
                                                Book Free Pickup
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                className={navLinkClass("/login")}
                                                to="/login"
                                                onClick={() => setOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/pickup"
                                                className="bg-primary text-white w-full text-center py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform"
                                                onClick={() => setOpen(false)}
                                            >
                                                Book Free Pickup
                                            </Link>
                                        </>
                                    )}
                                </>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
}
