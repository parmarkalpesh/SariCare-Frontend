import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Loader, Eye, EyeOff } from 'lucide-react';
import { isValidEmail, isNotEmpty } from '../utils/validation';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if (!isNotEmpty(password)) {
            setError('Password is required');
            return;
        }

        setIsLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/my-bookings');
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
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

                    {/* Left Side - Form Section */}
                    <div className="p-8 md:p-12 w-full order-2 md:order-1">
                        <div className="text-center md:text-left mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                            <p className="text-gray-500">Please enter your details to sign in</p>
                        </div>

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
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError('');
                                    }}
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError('');
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>



                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="animate-spin" size={20} />
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Don&apos;t have an account?{' '}
                                <Link to="/register" className="text-primary font-bold hover:underline">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Branding Section */}
                    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-primary to-primary-dark text-white p-10 h-full text-center relative order-1 md:order-2">
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
                            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                            <p className="text-lg text-white/90 leading-relaxed">
                                Access your dashboard to manage bookings and view your history.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
