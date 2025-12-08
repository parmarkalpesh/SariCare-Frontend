import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, User, Phone, CheckCircle, Package, Plus, Trash2, Minus } from "lucide-react";
import { SERVICE_LIST } from "../constants/services";
import API_URL from "../config";
import AuthContext from "../context/AuthContext";
import { isValidMobile, isNotEmpty } from "../utils/validation";
import toast from 'react-hot-toast';

export default function Pickup() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { user, token } = useContext(AuthContext);
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pickupDate: "",
    preferredTime: "Morning (9 AM - 12 PM)",
    items: location.state?.service ? [{ service: location.state.service, quantity: 1 }] : [],
  });
  const [selectedServiceToAdd, setSelectedServiceToAdd] = useState("");

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        phone: user.mobile || "",
      }));
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};
    if (!isNotEmpty(formData.name)) newErrors.name = "Name is required";
    if (!isValidMobile(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number";
    if (!isNotEmpty(formData.address)) newErrors.address = "Address is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    else if (new Date(formData.pickupDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.pickupDate = "Date cannot be in the past";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleServiceChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleAddService = () => {
    if (!selectedServiceToAdd) return;
    const exists = formData.items.find(item => item.service === selectedServiceToAdd);
    if (exists) {
      toast.error("Service already added");
      return;
    }
    setFormData({
      ...formData,
      items: [...formData.items, { service: selectedServiceToAdd, quantity: 1 }]
    });
    setSelectedServiceToAdd("");
  };

  const handleRemoveService = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        toast.success("Pickup scheduled successfully!");
      } else {
        toast.error(data.message || 'Failed to schedule pickup.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pickup Scheduled!</h2>
          <p className="text-gray-600 mb-6">
            We have received your request. Our executive will call you shortly to confirm the pickup.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: "",
                phone: "",
                address: "",
                pickupDate: "",
                preferredTime: "Morning (9 AM - 12 PM)",
                items: [],
              });
            }}
            className="text-primary font-semibold hover:underline"
          >
            Book another pickup
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Schedule a Pickup</h1>
          <p className="text-gray-600">
            Fill in the details below and we&apos;ll be at your doorstep.
          </p>
        </div>

        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={16} /> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Phone size={16} /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                placeholder="9876543210"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
          </div>


          {/* Service Selection Dropdown */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <Package size={16} /> Select Service
            </label>
            <div className="flex gap-2">
              <select
                value={selectedServiceToAdd}
                onChange={(e) => setSelectedServiceToAdd(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
              >
                <option value="">-- Choose a Service --</option>
                {SERVICE_LIST.map((s, i) => (
                  <option key={i} value={s.title}>{s.title} ({s.price})</option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddService}
                disabled={!selectedServiceToAdd}
                className="bg-secondary text-primary px-4 rounded-lg font-bold hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {formData.items.length > 0 && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Package size={18} /> Selected Service
              </h3>
              {formData.items.map((item, index) => (
                <div key={index} className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Service Name</label>
                    <input
                      type="text"
                      value={item.service}
                      readOnly
                      className="w-full p-2 rounded-lg border border-gray-200 bg-white text-gray-500"
                    />
                  </div>
                  <div className="w-32">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Quantity</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const newQty = Math.max(1, item.quantity - 1);
                          handleServiceChange(index, 'quantity', newQty);
                        }}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="flex-1 text-center font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleServiceChange(index, 'quantity', item.quantity + 1);
                        }}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(index)}
                    className="text-red-400 hover:text-red-600 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2 mb-6">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin size={16} /> Address
            </label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none`}
              placeholder="Flat No, Building, Street, Area..."
            ></textarea>
            {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={16} /> Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border ${errors.pickupDate ? 'border-red-500' : 'border-gray-200'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
              />
              {errors.pickupDate && <p className="text-red-500 text-xs">{errors.pickupDate}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock size={16} /> Preferred Time
              </label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
              >
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 8 PM)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Scheduling...' : 'Confirm Pickup'}
          </button>
        </motion.form>
      </div>
    </div >
  );
}
