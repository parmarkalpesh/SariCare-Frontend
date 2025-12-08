import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ title, description, icon: Icon, link }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
        >
            <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <Icon size={28} className="text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
            {link && (
                <Link
                    to={link}
                    className="inline-flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300"
                >
                    Learn More <ArrowRight size={16} className="ml-2" />
                </Link>
            )}
        </motion.div>
    );
}
