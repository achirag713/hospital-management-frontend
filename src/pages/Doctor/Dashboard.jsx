import React, { useState, useEffect } from 'react';
import DoctorLayout from '../../layouts/DoctorLayout';

const mockStats = {
  patientsToday: 8,
  totalAppointments: 15,
  pendingTasks: 3
};

const mockSchedule = [
  { id: 1, patient: 'Jane Doe', time: '09:00 AM', status: 'Confirmed' },
  { id: 2, patient: 'John Smith', time: '10:30 AM', status: 'Pending' },
  { id: 3, patient: 'Alice Johnson', time: '11:45 AM', status: 'Confirmed' }
];

const DoctorDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setSchedule(mockSchedule);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DoctorLayout>
      <div className="doctor-dashboard">
        <h1 className="page-title">Dashboard</h1>

        <div className="stats-cards">
          <div className="stat-card">
            <h3>Patients Today</h3>
            <p>{stats.patientsToday}</p>
          </div>
          <div className="stat-card">
            <h3>Total Appointments</h3>
            <p>{stats.totalAppointments}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Tasks</h3>
            <p>{stats.pendingTasks}</p>
          </div>
        </div>

        <div className="schedule">
          <h2>Today's Schedule</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {schedule.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.time} - {appointment.patient} ({appointment.status})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
