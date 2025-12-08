import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Pickup from "./pages/Pickup.jsx";
import Services from "./pages/Services.jsx";

import ScrollToTop from "./components/ScrollToTop.jsx";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

import { AdminRoute, UserRoute, ProtectedRoute } from "./components/RouteGuards.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* User Routes (Protected from Admin) */}
          <Route element={<UserRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/pickup" element={<Pickup />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Route>
          </Route>
        </Route>

        {/* Public/Shared Routes (or wrap with UserRoute if strict admin blocking required) */}
        <Route path="/pay/:id" element={<PaymentPage />} />
      </Routes>
    </AuthProvider>
  );
}
