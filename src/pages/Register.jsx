import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, UserCheck, ArrowRight, Loader, Eye, EyeOff } from 'lucide-react';
import { isValidEmail, isValidMobile, isValidPassword, isNotEmpty } from '../utils/validation';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        gender: 'Female'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleNameInput = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
        setFormData({ ...formData, name: value });
    };

    const handleMobileInput = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= 10) {
            setFormData({ ...formData, mobile: value });
        }
    };

    const validate = () => {
        if (!isNotEmpty(formData.name)) return "Full Name is required";
        if (!isValidEmail(formData.email)) return "Please enter a valid email address";
        if (!isValidPassword(formData.password)) return "Password must be at least 6 characters long";
        if (!isValidMobile(formData.mobile)) return "Mobile number must be exactly 10 digits";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsLoading(true);
        try {
            const result = await register(formData);
            if (result.success) {
                navigate('/my-bookings');
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-50 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="container mx-auto px-4 z-10 py-12">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Left Side - Welcome Section */}
                    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary to-primary-dark text-white p-10 h-full text-center relative">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pattern-dots" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10"
                        >
                            <div className="mb-6 bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm shadow-xl">
                                <img src="/logo.png" alt="SariCare" className="h-16 w-16 object-contain filter drop-shadow-md" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Join SariCare</h2>
                            <p className="text-lg text-white/90 mb-8 leading-relaxed">
                                Create an account to schedule free pickups, track your orders, and enjoy premium laundry services.
                            </p>
                            <Link to="/login" className="inline-block border border-white/30 hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-full transition-all">
                                Already have an account?
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Side - Form Section */}
                    <div className="p-8 md:p-12 w-full">
                        <div className="text-center md:hidden mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                            <p className="text-gray-500 mt-2">Join the premium laundry experience</p>
                        </div>
                        <h2 className="hidden md:block text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="hidden md:block text-gray-500 mb-8">Fill in your details to get started</p>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm flex items-start"
                            >
                                <span className="font-medium mr-1">Error:</span> {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-5">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        value={formData.name}
                                        onChange={handleNameInput}
                                    />
                                </div>

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            name="mobile"
                                            placeholder="Mobile Number"
                                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            value={formData.mobile}
                                            onChange={handleMobileInput}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Gender</label>
                                    <div className="flex gap-4">
                                        {['Female', 'Male', 'Other'].map((option) => (
                                            <label key={option} className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={option}
                                                    checked={formData.gender === option}
                                                    onChange={handleChange}
                                                    className="sr-only peer"
                                                />
                                                <div className="text-center py-3 border border-gray-200 rounded-xl peer-checked:bg-primary/5 peer-checked:border-primary peer-checked:text-primary transition-all hover:bg-gray-50 text-gray-600 font-medium">
                                                    {option}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="animate-spin" size={20} />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center md:hidden">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary font-bold hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
