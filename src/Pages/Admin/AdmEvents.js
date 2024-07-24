import React, { useState, useEffect } from 'react';
import '../Pages.css';

export default function AdminEvents() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
    const intervalId = setInterval(fetchBookings, 5000); // Adjust interval as needed

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <div className="admin-events-container">
      <div className="user-dashboard__projects-section-header">
        <p>User Bookings</p>
      </div>
      <div className="booking-list">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-list-item">
            <span>{booking.eventTitle} booked by {booking.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
