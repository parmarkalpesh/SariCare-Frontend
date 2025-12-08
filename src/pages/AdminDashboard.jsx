import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import API_URL from '../config';

import { Users, Calendar, CheckCircle, Clock, AlertCircle, Send, IndianRupee, Search, MessageSquare } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ userCount: 0, bookingCount: 0, statusCounts: {} });
    const [bookings, setBookings] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('bookings');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [showReportModal, setShowReportModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [reportForm, setReportForm] = useState({ condition: 'Good', notes: '', recommendation: '' });
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${token}` };

                const statsRes = await fetch(`${API_URL}/admin/stats`, { headers });
                const statsData = await statsRes.json();
                setStats(statsData);

                const bookingsRes = await fetch(`${API_URL}/admin/bookings`, { headers });
                const bookingsData = await bookingsRes.json();
                setBookings(bookingsData);

                const contactsRes = await fetch(`${API_URL}/admin/contacts`, { headers });
                const contactsData = await contactsRes.json();
                setContacts(contactsData);

                const usersRes = await fetch(`${API_URL}/admin/users`, { headers });
                const usersData = await usersRes.json();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/admin/bookings/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleAmountChange = async (id, amount) => {
        try {
            const response = await fetch(`${API_URL}/admin/bookings/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ totalAmount: amount })
            });

            if (response.ok) {
                setBookings(bookings.map(b => b._id === id ? { ...b, totalAmount: amount } : b));
            }
        } catch (error) {
            console.error('Error updating amount:', error);
        }
    };

    const updateContactStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/admin/contacts/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus } : c));
            }
        } catch (error) {
            console.error('Error updating contact status:', error);
        }
    };

    const submitHealthReport = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/bookings/${selectedBooking._id}/health-report`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(reportForm)
            });

            if (response.ok) {
                setShowReportModal(false);
                setBookings(bookings.map(b => b._id === selectedBooking._id ? { ...b, healthReport: reportForm } : b));
                alert('Health Report Saved!');
            }
        } catch (error) {
            console.error('Error saving health report:', error);
        }
    };

    const sendPaymentLink = (booking) => {
        const upiId = "parmarkalpesh436@oksbi";
        const amount = booking.totalAmount || 0;
        const name = "SariCare";
        const note = `SariCare Order ${booking._id.slice(-6).toUpperCase()}`;

        // Construct standard UPI URI
        const upiUri = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&tr=${booking._id}&tn=${note}&cu=INR`;

        // Generate QR Code Image URL (using qrserver API)
        const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUri)}`;

        // Message with Direct Image URL
        const message = `Namaste ${booking.name}, please pay ₹${amount} for your SariCare service. Here is the QR Code: ${qrImageUrl}`;

        const whatsappUrl = `https://wa.me/91${booking.phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) {
        return <div className="pt-24 min-h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="pt-24 pb-16 min-h-screen bg-gray-50 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.userCount}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Bookings</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.bookingCount}</p>
                        </div>
                    </div>
                    {/* Add more stats if needed */}
                </div>

                <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === 'bookings' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Bookings
                        {activeTab === 'bookings' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === 'messages' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Messages
                        {activeTab === 'messages' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`pb-2 px-4 font-medium transition-colors relative ${activeTab === 'users' ? 'text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Users
                        {activeTab === 'users' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />}
                    </button>
                </div>

                {/* Bookings Table */}
                {activeTab === 'bookings' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by ID or Phone..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-sm">
                                    <tr>
                                        <th className="p-4 font-medium">Booking ID</th>
                                        <th className="p-4 font-medium">User</th>

                                        <th className="p-4 font-medium">Address</th>
                                        <th className="p-4 font-medium">Service</th>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium">Amount</th>
                                        <th className="p-4 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {bookings.filter(booking =>
                                        booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        booking.phone.includes(searchTerm)
                                    ).map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm text-gray-500">#{booking._id.slice(-6).toUpperCase()}</td>
                                            <td className="p-4">
                                                <div className="font-medium text-gray-900">{booking.name}</div>
                                                <div className="text-xs text-gray-500">{booking.phone}</div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-700 max-w-xs truncate" title={booking.address}>
                                                {booking.address}
                                            </td>
                                            <td className="p-4 text-sm text-gray-700">
                                                {booking.items && booking.items.length > 0 ? (
                                                    <ul className="list-disc list-inside text-xs">
                                                        {booking.items.map((item, i) => (
                                                            <li key={i}><span className="font-medium">{item.service}</span> <span className="text-gray-500">x{item.quantity}</span></li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span className="text-gray-400 italic">No services</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-sm text-gray-700">
                                                {new Date(booking.pickupDate).toLocaleDateString()}
                                                <div className="text-xs text-gray-500">{booking.preferredTime}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        booking.status === 'Working' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-100 text-gray-700'}`}>
                                                    {booking.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <IndianRupee size={14} className="text-gray-400" />
                                                    <input
                                                        type="number"
                                                        value={booking.totalAmount || ''}
                                                        onChange={(e) => handleAmountChange(booking._id, e.target.value)}
                                                        placeholder="0"
                                                        className="w-20 p-1 border border-gray-200 rounded text-sm focus:outline-none focus:border-primary"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        className="text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                        value={booking.status || 'Pending'}
                                                        onChange={(e) => updateStatus(booking._id, e.target.value)}
                                                    >
                                                        <option value="Pending">Pending</option>
                                                        <option value="Working">Working</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Cancelled">Cancelled</option>
                                                    </select>
                                                    <button
                                                        onClick={() => sendPaymentLink(booking)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Send WhatsApp Payment Link"
                                                    >
                                                        <Send size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedBooking(booking);
                                                            setReportForm(booking.healthReport || { condition: 'Good', notes: '', recommendation: '' });
                                                            setShowReportModal(true);
                                                        }}
                                                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                        title="Add Health Report"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Messages Table */}
                {activeTab === 'messages' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <MessageSquare size={20} /> Contact Messages
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-sm">
                                    <tr>
                                        <th className="p-4 font-medium">Date</th>
                                        <th className="p-4 font-medium">Name</th>
                                        <th className="p-4 font-medium">Phone</th>
                                        <th className="p-4 font-medium">Contact</th>
                                        <th className="p-4 font-medium">Message</th>
                                        <th className="p-4 font-medium">Status</th>
                                        <th className="p-4 font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {contacts.map((contact) => (
                                        <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-sm text-gray-700 whitespace-nowrap">
                                                {new Date(contact.createdAt).toLocaleDateString()}
                                                <div className="text-xs text-gray-500">{new Date(contact.createdAt).toLocaleTimeString()}</div>
                                            </td>
                                            <td className="p-4 font-medium text-gray-900">
                                                {contact.firstName} {contact.lastName}
                                            </td>
                                            <td className="p-4 text-sm text-gray-700">
                                                {contact.phone || '-'}
                                            </td>
                                            <td className="p-4">
                                                <div className="text-sm text-gray-900">{contact.email}</div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 max-w-md">
                                                {contact.message}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${contact.status === 'Replied' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {contact.status || 'New'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {contact.status !== 'Replied' ? (
                                                    <button
                                                        onClick={() => updateContactStatus(contact._id, 'Replied')}
                                                        className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors"
                                                    >
                                                        Mark Replied
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => updateContactStatus(contact._id, 'New')}
                                                        className="text-xs text-gray-500 hover:text-gray-700 underline"
                                                    >
                                                        Mark New
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {contacts.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500">
                                                No messages found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Users Table */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Users size={20} /> Registered Users
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-sm">
                                    <tr>
                                        <th className="p-4 font-medium">Name</th>
                                        <th className="p-4 font-medium">Email</th>
                                        <th className="p-4 font-medium">Mobile</th>
                                        <th className="p-4 font-medium">Gender</th>
                                        <th className="p-4 font-medium">Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{user.name}</td>
                                            <td className="p-4 text-sm text-gray-700">{user.email}</td>
                                            <td className="p-4 text-sm text-gray-700">{user.mobile}</td>
                                            <td className="p-4 text-sm text-gray-700">{user.gender}</td>
                                            <td className="p-4 text-sm text-gray-700">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-500">
                                                No users found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Health Report Modal */}
            {
                showReportModal && selectedBooking && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl animate-scale-in">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <CheckCircle className="text-primary" />
                                Fabric Health Report
                            </h2>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                submitHealthReport();
                            }}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Overall Condition</label>
                                        <select
                                            className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            value={reportForm.condition}
                                            onChange={(e) => setReportForm({ ...reportForm, condition: e.target.value })}
                                        >
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Needs Repair">Needs Repair</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Notes</label>
                                        <textarea
                                            className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                            rows={3}
                                            placeholder="E.g., Removed turmeric stain from border..."
                                            value={reportForm.notes}
                                            onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Care Recommendation</label>
                                        <textarea
                                            className="w-full border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                            rows={3}
                                            placeholder="E.g., Store in a muslin cloth to preserve zari..."
                                            value={reportForm.recommendation}
                                            onChange={(e) => setReportForm({ ...reportForm, recommendation: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowReportModal(false)}
                                        className="flex-1 py-2.5 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                                    >
                                        Save Report
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    );
}
