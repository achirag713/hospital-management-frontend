import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Mock data for statistics
const mockStats = {
  totalDoctors: 25,
  totalPatients: 120,
  appointmentsToday: 15,
  revenue: 25000,
  activeDoctors: 20,
  completedAppointments: 12
};

// Mock data for recent appointments
const mockAppointments = [
  { 
    id: 1, 
    patient: 'John Doe', 
    doctor: 'Dr. Smith', 
    time: '09:00 AM',
    type: 'Follow-up',
    status: 'Completed'
  },
  { 
    id: 2, 
    patient: 'Jane Smith', 
    doctor: 'Dr. Johnson', 
    time: '10:30 AM',
    type: 'New Visit',
    status: 'Scheduled'
  },
  { 
    id: 3, 
    patient: 'Alice Brown', 
    doctor: 'Dr. Lee', 
    time: '11:45 AM',
    type: 'Consultation',
    status: 'Scheduled'
  }
];

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    status: 'Active',
    patients: 45
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    status: 'Active',
    patients: 38
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    specialization: 'Orthopedics',
    status: 'Active',
    patients: 52
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(mockStats);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API calls
        // const statsResponse = await api.admin.getStats();
        // const appointmentsResponse = await api.admin.getRecentAppointments();
        // const doctorsResponse = await api.admin.getRecentDoctors();
        
        // setStats(statsResponse.data);
        // setAppointments(appointmentsResponse.data);
        // setDoctors(doctorsResponse.data);
        
        // Using mock data for now
        setAppointments(mockAppointments);
        setDoctors(mockDoctors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewAllAppointments = () => {
    navigate('/admin/appointments');
  };

  const handleViewAllDoctors = () => {
    navigate('/admin/doctors');
  };

  const renderStatCard = (title, value, icon, color) => (
    <div className="stat-card" style={{ borderLeftColor: color }}>
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} className="appointment-card">
      <div className="appointment-header">
        <h4>{appointment.patient}</h4>
        <span className={`status-badge ${appointment.status.toLowerCase()}`}>
          {appointment.status}
        </span>
      </div>
      <div className="appointment-details">
        <p><strong>Doctor:</strong> {appointment.doctor}</p>
        <p><strong>Time:</strong> {appointment.time}</p>
        <p><strong>Type:</strong> {appointment.type}</p>
      </div>
    </div>
  );

  const renderDoctorCard = (doctor) => (
    <div key={doctor.id} className="doctor-card">
      <div className="doctor-header">
        <h4>{doctor.name}</h4>
        <span className={`status-badge ${doctor.status.toLowerCase()}`}>
          {doctor.status}
        </span>
      </div>
      <div className="doctor-details">
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Patients:</strong> {doctor.patients}</p>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="page-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <Button variant="outline">Export Report</Button>
            <Button variant="primary">Generate Analytics</Button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="stats-grid">
              {renderStatCard('Total Doctors', stats.totalDoctors, '👨‍⚕️', '#4CAF50')}
              {renderStatCard('Total Patients', stats.totalPatients, '👥', '#2196F3')}
              {renderStatCard('Today\'s Appointments', stats.appointmentsToday, '📅', '#FF9800')}
              {renderStatCard('Monthly Revenue', `$${stats.revenue}`, '💰', '#F44336')}
              {renderStatCard('Active Doctors', stats.activeDoctors, '✅', '#00BCD4')}
              {renderStatCard('Completed Appointments', stats.completedAppointments, '✓', '#8BC34A')}
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Recent Appointments</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleViewAllAppointments}
                  >
                    View All
                  </Button>
                </div>
                <div className="appointments-list">
                  {appointments.map(renderAppointmentCard)}
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Doctors</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleViewAllDoctors}
                  >
                    View All
                  </Button>
                </div>
                <div className="doctors-list">
                  {doctors.map(renderDoctorCard)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
