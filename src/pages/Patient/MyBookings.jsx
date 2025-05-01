import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PatientLayout from '../../layouts/PatientLayout';
import Modal from '../../components/common/Modal';
import './MyBookings.css';

const MyBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  
  // Mock data for appointments with more details
  const [allBookings, setAllBookings] = useState([
    { 
      id: 1, 
      doctor: 'Dr. John Smith', 
      department: 'Cardiology',
      doctorImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: '2025-05-10', 
      time: '10:00 AM', 
      status: 'Upcoming',
      reason: 'Annual heart checkup',
      notes: 'Please bring previous reports',
      fee: '$150'
    },
    { 
      id: 2, 
      doctor: 'Dr. Emily Johnson', 
      department: 'Neurology',
      doctorImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      date: '2025-05-03', 
      time: '02:00 PM', 
      status: 'Upcoming',
      reason: 'Recurring headaches',
      notes: 'No food 2 hours before appointment',
      fee: '$180'
    },
    { 
      id: 3, 
      doctor: 'Dr. Michael Brown', 
      department: 'Dermatology',
      doctorImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      date: '2025-04-25', 
      time: '11:30 AM', 
      status: 'Completed',
      reason: 'Skin rash examination',
      notes: 'Follow-up in 2 weeks recommended',
      prescription: 'Topical cream applied twice daily',
      fee: '$130'
    },
    { 
      id: 4, 
      doctor: 'Dr. Sarah Wilson', 
      department: 'Pediatrics',
      doctorImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      date: '2025-04-18', 
      time: '09:00 AM', 
      status: 'Cancelled',
      reason: 'Regular checkup',
      cancellationReason: 'Doctor unavailable due to emergency',
      fee: '$140'
    },
  ]);

  // Filter bookings based on status
  const bookings = statusFilter === 'all' 
    ? allBookings 
    : allBookings.filter(booking => booking.status.toLowerCase() === statusFilter);
  
  // Generate dates for the next 7 days (for rescheduling)
  useEffect(() => {
    if (showRescheduleModal) {
      const dates = [];
      const today = new Date();
      
      for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      
      setAvailableDates(dates);
    }
  }, [showRescheduleModal]);

  // Generate time slots for selected date (for rescheduling)
  useEffect(() => {
    if (selectedDate) {
      // Generate mock time slots
      const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
      const afternoonSlots = ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'];
      const eveningSlots = ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'];
      
      // Different time slots for different dates to simulate real availability
      const day = new Date(selectedDate).getDay();
      
      let slots = [];
      
      if (day === 0) { // Sunday
        slots = morningSlots.slice(2); // Limited morning hours
      } else if (day === 6) { // Saturday
        slots = [...morningSlots, ...afternoonSlots.slice(0, 2)]; // Morning and early afternoon
      } else if (day % 2 === 0) { // Even weekdays
        slots = [...morningSlots, ...afternoonSlots, ...eveningSlots];
      } else { // Odd weekdays
        slots = [...morningSlots.slice(1), ...afternoonSlots, ...eveningSlots.slice(0, 3)];
      }
      
      setAvailableTimeSlots(slots);
    }
  }, [selectedDate]);

  // Format date to display in a user-friendly format
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status class for styling
  const getStatusClass = (status) => {
    switch(status) {
      case 'Upcoming':
        return 'status-upcoming';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };
  
  // Handle filter change
  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  // Handle reschedule appointment
  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
    setSelectedDate('');
    setSelectedTime('');
  };
  
  // Handle date selection for rescheduling
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };
  
  // Handle time selection for rescheduling
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  
  // Confirm rescheduling
  const confirmReschedule = () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    
    // Update the appointment in our mock data
    const updatedBookings = allBookings.map(booking => {
      if (booking.id === selectedAppointment.id) {
        return {
          ...booking,
          date: selectedDate,
          time: selectedTime
        };
      }
      return booking;
    });
    
    setAllBookings(updatedBookings);
    setShowRescheduleModal(false);
    
    // Show success message
    alert(`Appointment successfully rescheduled to ${formatDate(selectedDate)} at ${selectedTime}`);
  };
  
  // Handle cancel appointment
  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };
  
  const confirmCancelAppointment = () => {
    // Update the appointment status to 'Cancelled' in our mock data
    const updatedBookings = allBookings.map(booking => {
      if (booking.id === selectedAppointment.id) {
        return {
          ...booking,
          status: 'Cancelled',
          cancellationReason: 'Cancelled by patient'
        };
      }
      return booking;
    });
    
    setAllBookings(updatedBookings);
    setShowCancelModal(false);
    
    // Show success message
    alert(`Appointment with ${selectedAppointment.doctor} has been cancelled.`);
  };
  
  // Handle view appointment details
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  return (
    <PatientLayout>
      <div className="my-bookings-page">
        <div className="page-header">
          <h1>My Bookings</h1>
          <p>Manage your appointments with our healthcare providers</p>
        </div>
        
        <div className="booking-actions">
          <button 
            className="new-booking-btn"
            onClick={() => navigate('/patient/book-appointments')}
          >
            Book New Appointment
          </button>
          
          <div className="booking-filters">
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={handleFilterChange}
            >
              <option value="all">All Appointments</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="bookings-container">
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>No appointments found matching your filter.</p>
              <button 
                className="book-now-btn"
                onClick={() => navigate('/patient/book-appointments')}
              >
                Book an Appointment
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking.id} className={`booking-card ${getStatusClass(booking.status)}`}>
                  <div className="booking-header">
                    <div className="doctor-info">
                      <div className="doctor-avatar">
                        <img src={booking.doctorImage} alt={booking.doctor} />
                      </div>
                      <div>
                        <h3>{booking.doctor}</h3>
                        <p className="department">{booking.department}</p>
                      </div>
                    </div>
                    <div className={`booking-status ${getStatusClass(booking.status)}`}>
                      {booking.status}
                    </div>
                  </div>
                  
                  <div className="booking-details">
                    <div className="detail-item">
                      <p className="detail-value">{formatDate(booking.date)} • {booking.time}</p>
                    </div>
                  </div>
                  
                  <div className="booking-actions">
                    {booking.status === 'Upcoming' && (
                      <>
                        <button 
                          className="btn-reschedule"
                          onClick={() => handleReschedule(booking)}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancelClick(booking)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {(booking.status === 'Completed' || booking.status === 'Cancelled') && (
                      <button 
                        className="btn-details"
                        onClick={() => handleViewDetails(booking)}
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cancel Appointment Modal */}
        <Modal 
          title="Cancel Appointment" 
          onClose={() => setShowCancelModal(false)}
          isOpen={showCancelModal}
        >
          {selectedAppointment && (
            <div className="cancel-modal-content">
              <p>Are you sure you want to cancel your appointment with {selectedAppointment.doctor} on {formatDate(selectedAppointment.date)} at {selectedAppointment.time}?</p>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowCancelModal(false)}
                >
                  No, Keep It
                </button>
                <button 
                  className="btn-primary btn-danger"
                  onClick={confirmCancelAppointment}
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          )}
        </Modal>
        
        {/* Reschedule Appointment Modal */}
        <Modal 
          title="Reschedule Appointment" 
          onClose={() => setShowRescheduleModal(false)}
          isOpen={showRescheduleModal}
        >
          {selectedAppointment && (
            <div className="reschedule-modal-content">
              <p>Reschedule your appointment with {selectedAppointment.doctor}</p>
              
              <div className="current-appointment">
                <h4>Current Appointment:</h4>
                <p>{formatDate(selectedAppointment.date)} at {selectedAppointment.time}</p>
              </div>
              
              <div className="reschedule-form">
                <h4>Select New Date:</h4>
                <div className="date-grid">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      className={`date-btn ${selectedDate === date ? 'selected' : ''}`}
                      onClick={() => handleDateSelect(date)}
                    >
                      <span className="day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="date">{new Date(date).getDate()}</span>
                      <span className="month">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    </button>
                  ))}
                </div>
                
                {selectedDate && (
                  <>
                    <h4>Select New Time:</h4>
                    <div className="time-grid">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowRescheduleModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary"
                  onClick={confirmReschedule}
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirm Reschedule
                </button>
              </div>
            </div>
          )}
        </Modal>
        
        {/* Appointment Details Modal */}
        <Modal 
          title="Appointment Details" 
          onClose={() => setShowDetailsModal(false)}
          isOpen={showDetailsModal}
        >
          {selectedAppointment && (
            <div className="details-modal-content">
              <div className="modal-doctor-info">
                <img src={selectedAppointment.doctorImage} alt={selectedAppointment.doctor} />
                <div>
                  <h3>{selectedAppointment.doctor}</h3>
                  <p>{selectedAppointment.department}</p>
                </div>
              </div>
              
              <div className="modal-appointment-details">
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Date:</span>
                  <span className="modal-detail-value">{formatDate(selectedAppointment.date)}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Time:</span>
                  <span className="modal-detail-value">{selectedAppointment.time}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Status:</span>
                  <span className={`modal-detail-value ${getStatusClass(selectedAppointment.status)}`}>
                    {selectedAppointment.status}
                  </span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Fee:</span>
                  <span className="modal-detail-value">{selectedAppointment.fee}</span>
                </div>
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Reason:</span>
                  <span className="modal-detail-value">{selectedAppointment.reason}</span>
                </div>
                
                {selectedAppointment.status === 'Completed' && (
                  <>
                    <div className="modal-detail-row">
                      <span className="modal-detail-label">Notes:</span>
                      <span className="modal-detail-value">{selectedAppointment.notes}</span>
                    </div>
                    {selectedAppointment.prescription && (
                      <div className="modal-detail-row">
                        <span className="modal-detail-label">Prescription:</span>
                        <span className="modal-detail-value">{selectedAppointment.prescription}</span>
                      </div>
                    )}
                  </>
                )}
                
                {selectedAppointment.status === 'Cancelled' && (
                  <div className="modal-detail-row">
                    <span className="modal-detail-label">Cancellation Reason:</span>
                    <span className="modal-detail-value">{selectedAppointment.cancellationReason}</span>
                  </div>
                )}
              </div>
              
              {selectedAppointment.status === 'Completed' && (
                <div className="modal-actions">
                  <button className="btn-secondary">Download Prescription</button>
                  <button className="btn-primary">Book Follow-up</button>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </PatientLayout>
  );
};

export default MyBookings;