import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import './Dashboard.css'; // Assuming you have a CSS file for styling

const mockStats = {
  totalDoctors: 25,
  totalPatients: 120,
  appointmentsToday: 15,
  pendingRequests: 5
};

const mockAppointments = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', time: '09:00 AM' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Johnson', time: '10:30 AM' },
  { id: 3, patient: 'Alice Brown', doctor: 'Dr. Lee', time: '11:45 AM' }
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1 className="page-title">Dashboard</h1>

        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Doctors</h3>
            <p>{stats.totalDoctors}</p>
          </div>
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p>{stats.totalPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Appointments Today</h3>
            <p>{stats.appointmentsToday}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Requests</h3>
            <p>{stats.pendingRequests}</p>
          </div>
        </div>

        <div className="appointments">
          <h2>Today's Appointments</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.time} - {appointment.patient} with {appointment.doctor}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
