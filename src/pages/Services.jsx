// src/pages/Services.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shirt, Clock, Truck, Droplets, Sparkles, Scissors } from "lucide-react";
import { SERVICE_LIST } from "../constants/services";

const icons = {
    "Wash & Fold": Shirt,
    "Saree Polishing": Sparkles,
    "Dry Cleaning": Droplets,
    "Steam Ironing": Truck,
    "Darning & Rafoo": Scissors,
    "Express Service": Clock,
};



export default function Services() {
    const navigate = useNavigate();

    const handleBookNow = (service) => {
        navigate("/pickup", { state: { service: service.title } });
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We offer a comprehensive range of laundry and garment care services designed to make your life easier.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {SERVICE_LIST.map((service, index) => {
                        const Icon = icons[service.title] || Shirt;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 text-primary">
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.desc}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <span className="text-sm text-gray-500">Starting at</span>
                                    <span className="text-lg font-bold text-primary">{service.price}</span>
                                </div>
                                <button
                                    onClick={() => handleBookNow(service)}
                                    className="w-full mt-4 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                                >
                                    Book Now
                                </button>

                            </motion.div>
                        );
                    })}
                </div>

                {/* Pricing Table Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Detailed Pricing</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl mx-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-6 font-semibold text-gray-900">Item</th>
                                    <th className="p-6 font-semibold text-gray-900">Wash & Iron</th>
                                    <th className="p-6 font-semibold text-gray-900">Dry Clean</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr>
                                    <td className="p-6 text-gray-600">Shirt / T-Shirt</td>
                                    <td className="p-6 font-medium">₹25</td>
                                    <td className="p-6 font-medium">₹120</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-600">Trousers / Jeans</td>
                                    <td className="p-6 font-medium">₹30</td>
                                    <td className="p-6 font-medium">₹140</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-600">Saree (Cotton)</td>
                                    <td className="p-6 font-medium">₹80</td>
                                    <td className="p-6 font-medium">₹200</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-600">Saree (Silk/Heavy)</td>
                                    <td className="p-6 font-medium">-</td>
                                    <td className="p-6 font-medium">₹350</td>
                                </tr>
                                <tr>
                                    <td className="p-6 text-gray-600">Bedsheet (Double)</td>
                                    <td className="p-6 font-medium">₹60</td>
                                    <td className="p-6 font-medium">₹180</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}
