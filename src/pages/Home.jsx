import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Truck, Shirt, Clock, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import TestimonialCard from "../components/TestimonialCard";
import AuthContext from "../context/AuthContext";

export default function Home() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleBookPickup = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/pickup");
        }
    };

    return (
        <div className="pt-20">
            {/* HERO SECTION */}
            <section className="relative w-full h-[90vh] flex items-center overflow-hidden bg-secondary/30">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/40 z-10" />
                    <img
                        src="./Banner2.png"
                        alt="Laundry Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-primary text-sm font-semibold mb-6">
                            #1 Premium Laundry Service
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
                            Care for your <br />
                            <span className="text-primary">Sarees & Clothes</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                            Experience the finest laundry service with free home pickup &
                            delivery. We wash, clean, and dry your precious garments with
                            utmost care.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleBookPickup}
                                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
                            >
                                Book Free Pickup
                            </button>
                            <Link
                                to="/services"
                                className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-bold text-lg shadow-md border border-gray-100 transition-all transform hover:-translate-y-1"
                            >
                                View Services
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-sm font-medium text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-500" /> Free Delivery
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-500" /> 24h Turnaround
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle size={18} className="text-green-500" /> Eco Friendly
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We make laundry effortless. Just 3 simple steps to fresh clothes.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2" />

                        {[
                            {
                                icon: Clock,
                                title: "Schedule Pickup",
                                desc: "Book a slot online. We come to your door.",
                            },
                            {
                                icon: Shirt,
                                title: "Expert Cleaning",
                                desc: "We inspect, treat, and wash with care.",
                            },
                            {
                                icon: Truck,
                                title: "Fast Delivery",
                                desc: "Get fresh clothes delivered back in 24hrs.",
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50"
                            >
                                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-primary border-4 border-white shadow-lg">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
                            <p className="text-gray-600 max-w-xl">
                                From delicate sarees to daily wear, we handle everything.
                            </p>
                        </div>
                        <Link
                            to="/services"
                            className="hidden md:flex items-center text-primary font-semibold hover:translate-x-1 transition-transform"
                        >
                            View All Services <Truck size={18} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ServiceCard
                            title="Saree Polishing"
                            description="Restore the shine and softness of your expensive sarees with our specialized polishing."
                            icon={Shirt}
                            link="/services"
                        />
                        <ServiceCard
                            title="Dry Cleaning"
                            description="Premium dry cleaning for suits, lehengas, and delicate fabrics using eco-friendly solvents."
                            icon={Clock}
                            link="/services"
                        />
                        <ServiceCard
                            title="Steam Ironing"
                            description="Crisp, wrinkle-free ironing that gives your clothes a professional finish."
                            icon={Truck}
                            link="/services"
                        />
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
                        Loved by Families
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard
                            name="Priya Sharma"
                            role="Homemaker"
                            content="SariCare is a lifesaver! They handled my wedding silk sarees with such care. The pickup and delivery were right on time."
                        />
                        <TestimonialCard
                            name="Rahul Verma"
                            role="Software Engineer"
                            content="Very professional service. The app makes booking so easy, and the clothes come back smelling fresh and looking new."
                        />
                        <TestimonialCard
                            name="Anita Desai"
                            role="Fashion Designer"
                            content="I trust only SariCare for my boutique's garments. Their dry cleaning quality is unmatched in the city."
                        />
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-dots" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to experience premium care?
                    </h2>
                    <p className="text-xl opacity-90 mb-10">
                        Book your first free pickup today and get 20% off on your first order.
                    </p>
                    <Link
                        to="/pickup"
                        className="inline-block bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                    >
                        Schedule Pickup Now
                    </Link>
                </div>
            </section>
        </div>
    );
}
