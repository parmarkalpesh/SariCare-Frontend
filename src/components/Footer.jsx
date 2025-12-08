import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-serif font-bold text-white">
                            Sari<span className="text-primary">Care</span>
                        </span>
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Premium laundry and dry cleaning service delivered to your doorstep.
                        We treat your clothes with the care they deserve.
                    </p>
                    <div className="flex gap-4 pt-2">
                        <a href="#" className="hover:text-primary transition-colors">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="hover:text-primary transition-colors">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/services"
                                className="hover:text-primary transition-colors"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/pricing"
                                className="hover:text-primary transition-colors"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-primary transition-colors"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Saree Polishing</li>
                        <li>Dry Cleaning</li>
                        <li>Steam Ironing</li>
                        <li>Stain Removal</li>
                        <li>Darning & Rafoo</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-primary shrink-0" />
                            <span>123 Fashion Street, Silk City, India 400001</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone size={18} className="text-primary shrink-0" />
                            <span>+91 98765 43210</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-primary shrink-0" />
                            <span>hello@saricare.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                <p>
                    © {new Date().getFullYear()} SariCare. All rights reserved. Designed
                    with ❤️ for your clothes.
                </p>
            </div>
        </footer>
    );
}
