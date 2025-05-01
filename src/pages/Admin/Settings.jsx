import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import './Settings.css'; // Assuming you have a CSS file for styling

const Settings = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timezone: '',
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    appointmentDuration: 30,
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    emailNotifications: true,
    smsNotifications: true,
    maintenanceMode: false,
    automaticLogout: 30,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // In a real app, these would be API calls
        // const userProfile = await api.admin.getProfile();
        // const settings = await api.admin.getSystemSettings();
        
        // Using mock data for now
        setTimeout(() => {
          if (user) {
            setProfileForm({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              email: user.email || '',
              phone: user.phone || '',
              timezone: user.timezone || 'UTC',
            });
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setErrorMessage('Failed to load settings');
        setLoading(false);
      }
    };

    fetchSettings();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSystemSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWorkingHoursChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [name]: value
      }
    }));
  };

  const validatePasswordForm = () => {
    if (passwordForm.newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // In a real app, this would be an API call
      // await api.admin.updateProfile(profileForm);
      
      // Mock update - using the login function from useAuth to update user data
      login({
        ...user,
        ...profileForm
      });
      
      setSuccessMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validatePasswordForm()) {
      return;
    }

    try {
      // In a real app, this would be an API call
      // await api.admin.changePassword(passwordForm);
      
      setSuccessMessage('Password changed successfully');
      setIsChangePasswordModalOpen(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('Failed to change password');
    }
  };

  const handleSystemSettingsSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // In a real app, this would be an API call
      // await api.admin.updateSystemSettings(systemSettings);
      
      setSuccessMessage('System settings updated successfully');
    } catch (error) {
      console.error('Error updating system settings:', error);
      setErrorMessage('Failed to update system settings');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="settings-loading">Loading settings...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-settings">
        <h1>Settings</h1>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <div className="settings-section">
          <h2>Profile Settings</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profileForm.firstName}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profileForm.lastName}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={profileForm.timezone}
                onChange={handleProfileChange}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>

            <div className="button-group">
              <Button type="submit" variant="primary">
                Save Profile
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsChangePasswordModalOpen(true)}
              >
                Change Password
              </Button>
            </div>
          </form>
        </div>

        <div className="settings-section">
          <h2>System Settings</h2>
          <form onSubmit={handleSystemSettingsSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="appointmentDuration">
                  Default Appointment Duration (minutes)
                </label>
                <input
                  type="number"
                  id="appointmentDuration"
                  name="appointmentDuration"
                  min="15"
                  max="120"
                  step="15"
                  value={systemSettings.appointmentDuration}
                  onChange={handleSystemSettingChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="automaticLogout">
                  Automatic Logout (minutes)
                </label>
                <input
                  type="number"
                  id="automaticLogout"
                  name="automaticLogout"
                  min="5"
                  max="120"
                  value={systemSettings.automaticLogout}
                  onChange={handleSystemSettingChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workingHoursStart">Working Hours Start</label>
                <input
                  type="time"
                  id="workingHoursStart"
                  name="start"
                  value={systemSettings.workingHours.start}
                  onChange={handleWorkingHoursChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="workingHoursEnd">Working Hours End</label>
                <input
                  type="time"
                  id="workingHoursEnd"
                  name="end"
                  value={systemSettings.workingHours.end}
                  onChange={handleWorkingHoursChange}
                />
              </div>
            </div>

            <div className="form-row checkbox-group">
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={systemSettings.emailNotifications}
                    onChange={handleSystemSettingChange}
                  />
                  Enable Email Notifications
                </label>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={systemSettings.smsNotifications}
                    onChange={handleSystemSettingChange}
                  />
                  Enable SMS Notifications
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={systemSettings.maintenanceMode}
                  onChange={handleSystemSettingChange}
                />
                Enable Maintenance Mode
              </label>
              {systemSettings.maintenanceMode && (
                <p className="warning-text">
                  Warning: Enabling maintenance mode will prevent users from accessing the system
                </p>
              )}
            </div>

            <Button type="submit" variant="primary">
              Save System Settings
            </Button>
          </form>
        </div>

        <Modal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
          title="Change Password"
        >
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="button-group">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsChangePasswordModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Change Password
              </Button>
            </div>
          </form>
        </Modal>
      </div>

      
    </AdminLayout>
  );
};

export default Settings;