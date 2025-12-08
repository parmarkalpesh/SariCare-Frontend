import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (user && user.role === 'admin') {
        return <Outlet />;
    }

    // Redirect non-admins to home (or login if not authenticated, but usually just home/user dashboard)
    return <Navigate to="/" replace />;
};

export const UserRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    // Strict Rule: If Admin attempts to access User routes, redirect to Admin Dashboard
    if (user && user.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
