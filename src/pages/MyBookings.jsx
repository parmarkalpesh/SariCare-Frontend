import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import API_URL from '../config';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Package } from 'lucide-react';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(`${API_URL}/bookings/mybookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchBookings();
        }
    }, [token]);

    if (loading) {
        return <div className="pt-24 min-h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
                        <Package size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 text-lg">You haven&apos;t made any bookings yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                                                {booking.status || 'Pending'}
                                            </span>
                                            <span>#{booking._id.slice(-6).toUpperCase()}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.name}</h3>
                                        <div className="space-y-1 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} /> {booking.address}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} /> {new Date(booking.pickupDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} /> {booking.preferredTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Smart Fabric Health Report Card */}
                                {booking.healthReport && booking.healthReport.condition && (
                                    <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Package size={64} className="text-primary" />
                                        </div>
                                        <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
                                            <span className="bg-white p-1.5 rounded-lg shadow-sm">✨</span> Smart Fabric Health Report
                                        </h4>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Condition</p>
                                                <p className={`font-bold ${booking.healthReport.condition === 'Excellent' ? 'text-green-600' :
                                                        booking.healthReport.condition === 'Good' ? 'text-blue-600' :
                                                            'text-amber-600'
                                                    }`}>{booking.healthReport.condition}</p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Treatment Notes</p>
                                                <p className="text-gray-700 text-sm leading-relaxed">{booking.healthReport.notes || 'Standard care applied.'}</p>
                                            </div>
                                            <div className="bg-white/60 p-3 rounded-lg backdrop-blur-sm">
                                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Expert Recommendation</p>
                                                <p className="text-gray-700 text-sm leading-relaxed">{booking.healthReport.recommendation || 'No special recommendations.'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
