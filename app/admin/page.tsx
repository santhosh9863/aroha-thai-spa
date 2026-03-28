'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface Booking {
  id: string;
  fullName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-500/20 text-green-400 border border-green-500/30';
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400 border border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
  }
};

export default function AdminDashboard() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');

  const serviceData = [
    { name: 'Thai', value: bookings.filter(b => b.service?.toLowerCase().includes('thai')).length },
    { name: 'Swedish', value: bookings.filter(b => b.service?.toLowerCase().includes('swedish')).length },
    { name: 'Deep', value: bookings.filter(b => b.service?.toLowerCase().includes('deep')).length },
    { name: 'Aroma', value: bookings.filter(b => b.service?.toLowerCase().includes('aroma')).length },
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          router.push('/login');
          return;
        }

        setAuthenticated(true);
        setUserEmail(data.session.user?.email || '');
        await fetchBookings();
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase.from('bookings').select('*');

      if (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
        return;
      }

      const formattedBookings: Booking[] = (data || []).map((booking: any) => ({
        id: booking.id || '',
        fullName: booking.fullName || '',
        phone: booking.phone || '',
        service: booking.service || '',
        date: booking.date || '',
        time: booking.time || '',
        status: booking.status || 'pending',
      }));

      setBookings(formattedBookings);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) {
        console.error('Error updating status:', error);
        return;
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const deleteBooking = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBookingId) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', selectedBookingId);

      if (error) {
        console.error('Error deleting booking:', error);
        setIsModalOpen(false);
        return;
      }

      setBookings((prev) => prev.filter((b) => b.id !== selectedBookingId));
      setIsModalOpen(false);
      setSelectedBookingId(null);
    } catch (error) {
      console.error('Delete error:', error);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesService = serviceFilter === 'all' || booking.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 px-8 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 text-lg">Manage bookings and customers</p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-sm mb-3">Logged in as:</p>
          <p className="text-white font-semibold mb-4">{userEmail}</p>

          <div className="flex gap-2">
            <Link href="/calendar" className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 border border-yellow-600 rounded-lg text-white text-sm">
              Calendar
            </Link>

            <button onClick={handleLogout} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <p>Total</p>
            <p className="text-2xl text-yellow-500">{bookings.length}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <p>Confirmed</p>
            <p className="text-2xl text-green-400">{bookings.filter(b => b.status === 'confirmed').length}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <p>Pending</p>
            <p className="text-2xl text-yellow-400">{bookings.filter(b => b.status === 'pending').length}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg">
            <p>Cancelled</p>
            <p className="text-2xl text-red-400">{bookings.filter(b => b.status === 'cancelled').length}</p>
          </div>
        </div>

        {/* CHART */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h2 className="text-xl mb-4">Service Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={serviceData} dataKey="value" outerRadius={100} minAngle={10}>
                {serviceData.map((_, index) => (
                  <Cell key={index} fill={['#EAB308', '#22C55E', '#3B82F6', '#F97316'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* FILTER BAR */}
        <div className="mb-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="all">All Services</option>
              <option value="Thai Massage">Thai Massage</option>
              <option value="Swedish Massage">Swedish Massage</option>
              <option value="Deep Tissue Therapy">Deep Tissue Therapy</option>
              <option value="Aromatherapy">Aromatherapy</option>
            </select>

          </div>
        </div>

        {/* TABLE */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/50">
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Phone</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Service</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Date</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Time</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm text-gray-300">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-800">

                    <td className="px-6 py-4">{booking.fullName}</td>
                    <td className="px-6 py-4">{booking.phone}</td>
                    <td className="px-6 py-4">{booking.service}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4">{booking.time}</td>

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 flex gap-2">

                      {booking.status !== 'confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                        >
                          Confirm
                        </button>
                      )}

                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                        >
                          Cancel
                        </button>
                      )}

                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="px-2 py-1 bg-red-800 text-white rounded text-xs"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>

    </div>
  );
}