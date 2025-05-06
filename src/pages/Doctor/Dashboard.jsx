import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorLayout from '../../layouts/DoctorLayout';
import { FaUserInjured, FaCalendarCheck } from 'react-icons/fa';
import { formatDate } from '../../utils/dateUtils';
import { useAuth } from '../../context/AuthContext';
import './Dashboard.css';

// Mock data for dashboard - This will be replaced with API calls
const mockUpcomingAppointments = [
  { id: 1, patient: 'John Smith', condition: 'Hypertension', time: '10:00 AM', date: '2024-03-15', status: 'Confirmed', type: 'Follow-up' },
  { id: 2, patient: 'Sarah Wilson', condition: 'Diabetes', time: '02:30 PM', date: '2024-03-15', status: 'Confirmed', type: 'New Patient' },
  { id: 3, patient: 'Michael Brown', condition: 'Asthma', time: '09:15 AM', date: '2024-03-16', status: 'Pending', type: 'Consultation' }
];

const mockRecentPatients = [
  { id: 1, name: 'Emma Thompson', lastVisit: '2024-03-14', condition: 'Hypertension', age: 45, gender: 'Female' },
  { id: 2, name: 'David Lee', lastVisit: '2024-03-13', condition: 'Diabetes', age: 52, gender: 'Male' },
  { id: 3, name: 'Lisa Anderson', lastVisit: '2024-03-12', condition: 'Asthma', age: 28, gender: 'Female' }
];

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API calls
        // const appointmentsResponse = await fetch('/api/doctor/appointments');
        // const patientsResponse = await fetch('/api/doctor/recent-patients');
        
        // For now, using mock data
        setAppointments(mockUpcomingAppointments);
        setRecentPatients(mockRecentPatients);
        
        // Set the next appointment (first in the sorted list)
        if (mockUpcomingAppointments.length > 0) {
          const sortedAppointments = [...mockUpcomingAppointments].sort((a, b) => 
            new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)
          );
          setNextAppointment(sortedAppointments[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewAppointmentDetails = (appointmentId) => {
    navigate(`/doctor/appointments/${appointmentId}`);
  };

  const handleViewAllAppointments = () => {
    navigate('/doctor/appointments');
  };

  const handleViewPatientDetails = (patientId) => {
    navigate(`/doctor/patients/${patientId}`);
  };

  const handleViewAllPatients = () => {
    navigate('/doctor/patients');
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        // TODO: Replace with actual API call
        // await fetch(`/api/doctor/appointments/${appointmentId}/cancel`, {
        //   method: 'POST',
        // });
        
        // For now, just update the local state
        setAppointments(appointments.filter(apt => apt.id !== appointmentId));
        if (nextAppointment?.id === appointmentId) {
          const remainingAppointments = appointments.filter(apt => apt.id !== appointmentId);
          if (remainingAppointments.length > 0) {
            const sortedAppointments = [...remainingAppointments].sort((a, b) => 
              new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time)
            );
            setNextAppointment(sortedAppointments[0]);
          } else {
            setNextAppointment(null);
          }
        }
      } catch (error) {
        console.error('Error canceling appointment:', error);
        // TODO: Add proper error handling
      }
    }
  };

  if (loading) {
    return (
      <DoctorLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div className="doctor-dashboard">
        <div className="welcome-section">
          <h1>Welcome, {user?.name || 'Smith'}</h1>
          <p>Your medical dashboard - {formatDate(new Date())}</p>
        </div>

        <div className="dashboard-summary">
          {/* Upcoming Appointments Card */}
          <div className="summary-card">
            <div className="card-header">
              <h2>Today's Appointments</h2>
              <button 
                onClick={handleViewAllAppointments}
                className="view-all-btn"
              >
                View All
              </button>
            </div>
            <div className="card-content">
              {appointments.length > 0 ? (
                <ul className="summary-list">
                  {appointments.slice(0, 2).map((appointment) => (
                    <li key={appointment.id} className="summary-item">
                      <div className="item-icon appointment-icon">
                        <FaCalendarCheck />
                      </div>
                      <div className="item-details">
                        <h3>{appointment.patient}</h3>
                        <p>{appointment.condition}</p>
                        <p>{formatDate(appointment.date)} at {appointment.time}</p>
                      </div>
                      <div className="item-status">{appointment.status}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-data">
                  <p>No appointments scheduled for today.</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Patients Card */}
          <div className="summary-card">
            <div className="card-header">
              <h2>Recent Patients</h2>
              <button 
                onClick={handleViewAllPatients}
                className="view-all-btn"
              >
                View All
              </button>
            </div>
            <div className="card-content">
              {recentPatients.length > 0 ? (
                <ul className="summary-list">
                  {recentPatients.slice(0, 2).map((patient) => (
                    <li key={patient.id} className="summary-item">
                      <div className="item-icon record-icon">
                        <FaUserInjured />
                      </div>
                      <div className="item-details">
                        <h3>{patient.name}</h3>
                        <p>{patient.condition}</p>
                        <p>Last Visit: {formatDate(patient.lastVisit)}</p>
                      </div>
                      <button 
                        className="btn btn-outline"
                        onClick={() => handleViewPatientDetails(patient.id)}
                      >
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-data">
                  <p>No recent patients.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="detail-cards">
          {/* Next Appointment Card */}
          <div className="detail-card next-appointment">
            <div className="card-header">
              <h2>Next Appointment</h2>
            </div>
            <div className="card-content">
              {nextAppointment ? (
                <div className="appointment-details">
                  <div className="appointment-header">
                    <div className="doctor-info">
                      <h3>{nextAppointment.patient}</h3>
                      <p>{nextAppointment.condition}</p>
                    </div>
                    <div className="appointment-status">{nextAppointment.status}</div>
                  </div>
                  <div className="appointment-time">
                    <div className="date-time">
                      <div className="date-icon">📅</div>
                      <div className="date-details">
                        <p className="label">Date</p>
                        <p className="value">{formatDate(nextAppointment.date)}</p>
                      </div>
                    </div>
                    <div className="date-time">
                      <div className="time-icon">⏰</div>
                      <div className="time-details">
                        <p className="label">Time</p>
                        <p className="value">{nextAppointment.time}</p>
                      </div>
                    </div>
                  </div>
                  <div className="appointment-actions">
                    <button 
                      className="btn btn-outline"
                      onClick={() => handleViewAppointmentDetails(nextAppointment.id)}
                    >
                      View Details
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleCancelAppointment(nextAppointment.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-data">
                  <p>No upcoming appointments scheduled.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
