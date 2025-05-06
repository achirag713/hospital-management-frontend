import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
          { icon: '👨‍⚕️', label: 'Doctors', path: '/admin/doctors' },
          { icon: '🏥', label: 'Patients', path: '/admin/patients' },
          { icon: '📅', label: 'Appointments', path: '/admin/appointments' },
      
          { icon: '⚙️', label: 'Settings', path: '/admin/settings' },
        ];
      case 'doctor':
        return [
          { icon: '📊', label: 'Dashboard', path: '/doctor/dashboard' },
          { icon: '👥', label: 'My Patients', path: '/doctor/my-patients' },
          { icon: '📅', label: 'Appointments', path: '/doctor/appointments' },
          { icon: '⚙️', label: 'Settings', path: '/doctor/settings' },
        ];
      case 'patient':
        return [
          { icon: '📊', label: 'Dashboard', path: '/patient/dashboard' },
          { icon: '👨‍⚕️', label: 'Find Doctors', path: '/patient/find-doctors' },
          { icon: '📅', label: 'Book Appointment', path: '/patient/book-appointments' },
          { icon: '📋', label: 'My Bookings', path: '/patient/my-bookings' },
          { icon: '📁', label: 'Medical Records', path: '/patient/medical-records' },
          { icon: '💳', label: 'Billings', path: '/patient/billings' },
          { icon: '⚙️', label: 'Settings', path: '/patient/settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className={`sidebar ${user?.role === 'patient' ? 'patient-sidebar' : 'doctor-sidebar'}`}>
      <div className="user-profile">
        <div className="avatar">
          {user?.name?.charAt(0) || 'D'}
        </div>
        <div className="user-info">
          <h3>{user?.name || 'Doctor'}</h3>
          <p>{user?.email || 'doctor@example.com'}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <span className="label">Logout</span>
        </button>
      </div>

      <div className="menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;