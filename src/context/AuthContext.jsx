import React, { createContext, useState, useEffect, useMemo } from 'react';
import API_URL from '../config';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(!!localStorage.getItem('token'));

    const logout = React.useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        toast.success('Logged out successfully');
    }, []);

    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Token invalid');
                })
                .then(data => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => {
                    logout();
                    setLoading(false);
                });
        }
    }, [token, logout]);

    const login = React.useCallback(async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data);
                toast.success('Login successful!');
                return { success: true };
            } else {
                toast.error(data.message || 'Login failed');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
            return { success: false, message: 'Network error' };
        }
    }, []);

    const register = React.useCallback(async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                setUser(data);
                toast.success('Registration successful!');
                return { success: true };
            } else {
                toast.error(data.message || 'Registration failed');
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
            return { success: false, message: 'Network error' };
        }
    }, []);

    const value = useMemo(() => ({ user, token, login, register, logout, loading }), [user, token, login, register, logout, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
