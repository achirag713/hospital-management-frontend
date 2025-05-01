import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PatientLayout from '../../layouts/PatientLayout';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/dateUtils';
import './Dashboard.css';

// Mock data for dashboard
const mockUpcomingAppointments = [
  { id: 1, doctor: 'Dr. John Smith', specialty: 'Cardiology', time: '10:00 AM', date: '2025-05-15', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Sarah Johnson', specialty: 'Neurology', time: '02:30 PM', date: '2025-05-20', status: 'Confirmed' },
  { id: 3, doctor: 'Dr. Michael Brown', specialty: 'Orthopedics', time: '09:15 AM', date: '2025-05-25', status: 'Pending' }
];

const mockMedicalRecords = [
  { id: 1, title: 'Annual Physical Examination', date: '2025-03-10', doctor: 'Dr. Emily Davis', type: 'Examination' },
  { id: 2, title: 'Blood Test Results', date: '2025-03-15', doctor: 'Dr. John Smith', type: 'Lab Test' },
  { id: 3, title: 'X-Ray Report - Chest', date: '2025-04-05', doctor: 'Dr. Robert Wilson', type: 'Radiology' }
];

const mockBills = [
  { id: 1, service: 'Consultation - Cardiology', amount: 150.00, date: '2025-04-10', status: 'Unpaid', dueDate: '2025-05-10' },
  { id: 2, service: 'Laboratory Tests', amount: 275.50, date: '2025-04-15', status: 'Unpaid', dueDate: '2025-05-15' },
  { id: 3, service: 'Prescription Medication', amount: 85.25, date: '2025-04-20', status: 'Unpaid', dueDate: '2025-05-20' }
];

const mockHealthUpdates = [
  { id: 1, title: 'Blood Pressure', value: '120/80 mmHg', date: '2025-04-28', status: 'Normal' },
  { id: 2, title: 'Blood Sugar', value: '105 mg/dL', date: '2025-04-26', status: 'Normal' },
  { id: 3, title: 'Cholesterol', value: '190 mg/dL', date: '2025-04-20', status: 'Normal' }
];

const PatientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [bills, setBills] = useState([]);
  const [healthUpdates, setHealthUpdates] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        setAppointments(mockUpcomingAppointments);
        setMedicalRecords(mockMedicalRecords);
        setBills(mockBills);
        setHealthUpdates(mockHealthUpdates);
        
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

  const handleReschedule = (appointmentId) => {
    // This would open a modal or navigate to reschedule page
    console.log('Reschedule appointment', appointmentId);
  };

  const handleCancel = (appointmentId) => {
    // This would open a confirmation dialog
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      console.log('Cancel appointment', appointmentId);
    }
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="patient-dashboard">
        <div className="welcome-section">
          <h1>Welcome, {user?.name || 'Patient'}</h1>
          <p>Your health dashboard - {formatDate(new Date())}</p>
        </div>

        <div className="dashboard-summary">
          {/* Upcoming Appointments Card */}
          <div className="summary-card">
            <div className="card-header">
              <h2>Upcoming Appointments</h2>
              <Link to="/patient/my-bookings" className="view-all-btn">View All</Link>
            </div>
            <div className="card-content">
              {appointments.length > 0 ? (
                <ul className="summary-list">
                  {appointments.slice(0, 2).map((appointment) => (
                    <li key={appointment.id} className="summary-item">
                      <div className="item-icon appointment-icon">📅</div>
                      <div className="item-details">
                        <h3>{appointment.doctor}</h3>
                        <p>{appointment.specialty}</p>
                        <p>{formatDate(appointment.date)} at {appointment.time}</p>
                      </div>
                      <div className="item-status">{appointment.status}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-data">
                  <p>No upcoming appointments.</p>
                </div>
              )}
            </div>
          </div>

          {/* Medical Records Card */}
          <div className="summary-card">
            <div className="card-header">
              <h2>Medical Records</h2>
              <Link to="/patient/medical-records" className="view-all-btn">View All</Link>
            </div>
            <div className="card-content">
              {medicalRecords.length > 0 ? (
                <ul className="summary-list">
                  {medicalRecords.slice(0, 2).map((record) => (
                    <li key={record.id} className="summary-item">
                      <div className="item-icon record-icon">📋</div>
                      <div className="item-details">
                        <h3>{record.title}</h3>
                        <p>Dr. {record.doctor}</p>
                        <p>{formatDate(record.date)}</p>
                      </div>
                      <div className="item-status">{record.type}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-data">
                  <p>No medical records available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Outstanding Bills Card */}
          <div className="summary-card">
            <div className="card-header">
              <h2>Outstanding Bills</h2>
              <Link to="/patient/billings" className="view-all-btn">View All</Link>
            </div>
            <div className="card-content">
              {bills.length > 0 ? (
                <ul className="summary-list">
                  {bills.slice(0, 2).map((bill) => (
                    <li key={bill.id} className="summary-item">
                      <div className="item-icon bill-icon">💳</div>
                      <div className="item-details">
                        <h3>{bill.service}</h3>
                        <p>Due: {formatDate(bill.dueDate)}</p>
                        <p>${bill.amount.toFixed(2)}</p>
                      </div>
                      <div className="item-status">{bill.status}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-data">
                  <p>No outstanding bills.</p>
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
                      <h3>{nextAppointment.doctor}</h3>
                      <p>{nextAppointment.specialty}</p>
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
                      onClick={() => handleReschedule(nextAppointment.id)}
                    >
                      Reschedule
                    </button>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleCancel(nextAppointment.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="no-data">
                  <p>No upcoming appointments scheduled.</p>
                  <Link to="/patient/book-appointments" className="btn btn-primary">
                    Book an Appointment
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Health Updates Card */}
          <div className="detail-card health-updates">
            <div className="card-header">
              <h2>Recent Health Updates</h2>
            </div>
            <div className="card-content">
              {healthUpdates.length > 0 ? (
                <ul className="health-metrics">
                  {healthUpdates.map((update) => (
                    <li key={update.id} className="health-metric-item">
                      <div className="metric-title">{update.title}</div>
                      <div className="metric-value">{update.value}</div>
                      <div className={`metric-status ${update.status.toLowerCase()}`}>
                        {update.status}
                      </div>
                      <div className="metric-date">{formatDate(update.date)}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-data">
                  <p>No recent health updates available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
