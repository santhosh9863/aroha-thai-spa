'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface Booking {
  id: string;
  fullName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function CalendarPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Check auth and fetch bookings
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          router.push('/login');
          return;
        }

        setAuthenticated(true);
        await fetchBookings();
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/login');
      }
    };

    checkAuthAndFetch();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase.from('bookings').select('*');
      if (!error && data) {
        setBookings(data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0-6, where 0 is Sunday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Format date to YYYY-MM-DD
  const formatDate = (day: number, month: number, year: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Get bookings for a specific date
  const getBookingsForDate = (dateStr: string) => {
    return bookings.filter((b) => b.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
  };

  // Generate calendar grid
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const calendarDays: (number | null)[] = [];

    // Add trailing days from previous month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    return calendarDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'border-l-4 border-green-500 bg-green-500/10';
      case 'pending':
        return 'border-l-4 border-yellow-500 bg-yellow-500/10';
      case 'cancelled':
        return 'border-l-4 border-red-500 bg-red-500/10';
      default:
        return 'border-l-4 border-gray-500 bg-gray-500/10';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();
  const todayDate = today.getDate();

  if (!authenticated || isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800 px-8 py-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Booking Calendar</h1>
            <p className="text-gray-400">View and manage bookings by date</p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white text-sm font-medium transition-all duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-yellow-500">{monthName}</h2>
          <div className="flex gap-3">
            <button
              onClick={() =>
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
              }
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors font-medium text-sm"
            >
              Today
            </button>
            <button
              onClick={() =>
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
              }
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors text-sm font-medium"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-7 gap-3">
            {/* Day headers */}
            {dayNames.map((day) => (
              <div
                key={day}
                className="h-12 flex items-center justify-center text-sm uppercase font-bold text-gray-400 border-b border-gray-800 pb-2"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {calendarDays.map((day, index) => {
              const dateStr =
                day !== null
                  ? formatDate(day, currentDate.getMonth(), currentDate.getFullYear())
                  : null;
              const dayBookings = day !== null ? getBookingsForDate(dateStr!) : [];
              const isToday = isCurrentMonth && day === todayDate;

              return (
                <div
                  key={index}
                  onClick={() => day !== null && setSelectedDate(dateStr)}
                  className={`min-h-32 p-3 rounded-lg border transition-all cursor-pointer ${
                    day === null
                      ? 'bg-gray-950 border-gray-800'
                      : isToday
                      ? 'bg-yellow-500/15 border-yellow-500 ring-2 ring-yellow-500/30'
                      : selectedDate === dateStr
                      ? 'bg-gray-800 border-yellow-500 ring-2 ring-yellow-500'
                      : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30'
                  }`}
                >
                  <div
                    className={`text-sm font-bold mb-2 ${
                      isToday ? 'text-yellow-400' : day ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayBookings.slice(0, 2).map((booking) => (
                      <div
                        key={booking.id}
                        className={`text-xs p-1.5 rounded truncate ${getStatusColor(booking.status)}`}
                      >
                        <span className={`font-medium ${getStatusTextColor(booking.status)}`}>
                          {booking.time}
                        </span>
                        <span className="text-gray-300 text-xs"> - {booking.service.split(' ')[0]}</span>
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-xs text-gray-500 px-1 font-medium">
                        +{dayBookings.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h3>
            {getBookingsForDate(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getBookingsForDate(selectedDate).map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 rounded-lg border transition-all ${getStatusColor(booking.status)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-white text-lg">{booking.fullName}</p>
                        <p className="text-sm text-gray-300 mt-1">
                          <span className="font-semibold">{booking.time}</span> • {booking.service}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">{booking.phone}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-4 ${getStatusBadgeColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No bookings for this date</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
