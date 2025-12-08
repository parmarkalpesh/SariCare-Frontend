import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import API_URL from "../config";
import Popup from "../components/Popup";
import toast from 'react-hot-toast';

function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const validate = (formData) => {
    const newErrors = {};
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const message = formData.get('message');

    // Strict Validation Rule: Name must contain only letters and spaces
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name must contain only alphabets";
    }

    // Strict Validation Rule: Phone must be exactly 10 digits
    if (!phone || !/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email Validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { // Simple regex for email
      newErrors.email = "Enter a valid email address";
    }

    if (!message || message.trim().length === 0) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneInput = (e) => {
    // Allow only numeric input
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > 10) {
      e.target.value = e.target.value.slice(0, 10);
    }
    setErrors({ ...errors, phone: '' });
  };

  const handleNameInput = (e) => {
    // Allow only letters and spaces
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setErrors({ ...errors, name: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const formData = new FormData(e.target);

    if (!validate(formData)) {
      setStatus('idle');
      return;
    }

    const data = {
      firstName: formData.get('name')?.split(' ')[0] || 'User',
      lastName: formData.get('name')?.split(' ').slice(1).join(' ') || '.',
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        setShowPopup(true); // Show Popup instead of Toast
        e.target.reset();
      } else {
        setStatus('error');
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Popup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="We will connect with you very soon as per as possible."
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-8 md:p-10 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
        <p className="text-gray-600 mb-4">
          Fill out the form below and we&apos;ll get back to you shortly.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              onInput={handleNameInput}
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="9876543210"
              className={`w-full rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              onInput={handlePhoneInput}
              maxLength={10}
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            onChange={() => setErrors({ ...errors, email: '' })}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            rows={5}
            name="message"
            placeholder="Tell us how we can help you..."
            className={`w-full rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            onChange={() => setErrors({ ...errors, message: '' })}
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold shadow-md hover:opacity-90 transition disabled:opacity-70"
        >
          <Send size={18} />
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}

export default function Contact() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-primary/5 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                  <p className="text-gray-600 leading-relaxed">
                    123 Fashion Street, Silk City,
                    <br />
                    Gujarat, India 400001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Phone Number</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-500 text-sm mt-1">Mon-Sat 9am to 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                  <p className="text-gray-600">hello@saricare.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}