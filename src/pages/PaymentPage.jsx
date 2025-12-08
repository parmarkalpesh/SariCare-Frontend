import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import API_URL from '../config';
import { IndianRupee, CreditCard, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from "framer-motion";

export default function PaymentPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await fetch(`${API_URL}/bookings/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setBooking(data);
                } else {
                    setError(data.message || 'Booking not found');
                }
            } catch (err) {
                setError('Failed to load booking details');
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    const handlePayment = () => {
        if (!booking) return;

        const upiId = "parmarkalpesh436@oksbi";
        const name = "SariCare";
        const amount = booking.totalAmount;
        const note = `SariCare Order #${booking._id.slice(-6).toUpperCase()}`;

        // UPI Deep Link
        const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&tr=${booking._id}&tn=${note}&cu=INR`;

        // Redirect to UPI app
        window.location.href = upiLink;
    };

    if (loading) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md w-full">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                    <AlertTriangle size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
                <p className="text-gray-600">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Complete Payment</h2>
                        <p className="text-gray-500 mt-2">Order #{booking._id.slice(-6).toUpperCase()}</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8 text-center">
                        <p className="text-sm text-blue-600 font-medium uppercase tracking-wide mb-1">Total Amount</p>
                        <div className="flex items-center justify-center text-4xl font-bold text-blue-900">
                            <IndianRupee size={28} className="mt-1" />
                            {booking.totalAmount || 0}
                        </div>
                    </div>

                    <div className="mb-8 flex justify-center">
                        <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm inline-block">
                            <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=parmarkalpesh436@oksbi&pn=SariCare&am=${booking.totalAmount || 0}&tr=${booking._id}&tn=SariCare_Order_${booking._id.slice(-6)}&cu=INR`}
                                alt="Payment QR Code"
                                className="w-48 h-48"
                            />
                            <p className="mt-2 text-xs text-gray-400 font-mono">Scan to Pay</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Customer Name</span>
                            <span className="font-medium text-gray-900">{booking.name}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-gray-100">
                            <span className="text-gray-600">Service</span>
                            <span className="font-medium text-gray-900">Laundry Pickup</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-lg text-lg font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-95"
                    >
                        <span>Pay Now via UPI</span>
                        <ArrowRight size={20} />
                    </button>

                    <p className="mt-6 text-center text-xs text-gray-400">
                        Secured by UPI • SariCare
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
