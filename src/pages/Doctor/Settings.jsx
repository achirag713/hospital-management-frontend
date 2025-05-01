import React, { useState, useEffect } from 'react';
import DoctorLayout from '../../layouts/DoctorLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import './Settings.css'; // Assuming you have a CSS file for styling

const Settings = () => {
  const { user, login } = useAuth();
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    qualifications: '',
    experience: '',
    bio: ''
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    appointmentReminders: true,
    marketingEmails: false
  });
  
  // Working hours settings
  const [workingHours, setWorkingHours] = useState({
    monday: { start: '09:00', end: '17:00', isActive: true },
    tuesday: { start: '09:00', end: '17:00', isActive: true },
    wednesday: { start: '09:00', end: '17:00', isActive: true },
    thursday: { start: '09:00', end: '17:00', isActive: true },
    friday: { start: '09:00', end: '17:00', isActive: true },
    saturday: { start: '10:00', end: '14:00', isActive: false },
    sunday: { start: '10:00', end: '14:00', isActive: false }
  });
  
  // States for UI
  const [activeTab, setActiveTab] = useState('profile');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Load user data
  useEffect(() => {
    if (user) {
      // Set profile form data from user object
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialization: user.specialization || '',
        qualifications: user.qualifications || '',
        experience: user.experience || '',
        bio: user.bio || ''
      });
      
      // Load notification settings if available
      if (user.notificationSettings) {
        setNotificationSettings(user.notificationSettings);
      }
      
      // Load working hours if available
      if (user.workingHours) {
        setWorkingHours(user.workingHours);
      }
    }
  }, [user]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification setting changes
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle working hours changes
  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };
  
  // Handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
  };
  
  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // In a real app, this would be an API call
      // await api.doctor.updateProfile(profileForm);
      
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
  
  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return;
    }
    
    try {
      // In a real app, this would be an API call
      // await api.doctor.updatePassword(passwordForm);
      
      // Mock success
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setSuccessMessage('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage('Failed to update password');
    }
  };
  
  // Handle notification settings submission
  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // In a real app, this would be an API call
      // await api.doctor.updateNotifications(notificationSettings);
      
      // Mock update
      login({
        ...user,
        notificationSettings
      });
      
      setSuccessMessage('Notification settings updated successfully');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      setErrorMessage('Failed to update notification settings');
    }
  };
  
  // Handle working hours submission
  const handleWorkingHoursSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // In a real app, this would be an API call
      // await api.doctor.updateWorkingHours(workingHours);
      
      // Mock update
      login({
        ...user,
        workingHours
      });
      
      setSuccessMessage('Working hours updated successfully');
    } catch (error) {
      console.error('Error updating working hours:', error);
      setErrorMessage('Failed to update working hours');
    }
  };
  
  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setErrorMessage('Please type DELETE to confirm');
      return;
    }
    
    try {
      // In a real app, this would be an API call
      // await api.doctor.deleteAccount();
      
      // Mock logout
      // logout();
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage('Failed to delete account');
    }
  };
  
  return (
    <DoctorLayout>
      <div className="settings-container">
        <h1 className="page-title">Account Settings</h1>
        
        <div className="settings-layout">
          <div className="settings-sidebar">
            <button 
              className={`sidebar-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              Profile Information
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => handleTabChange('password')}
            >
              Change Password
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => handleTabChange('notifications')}
            >
              Notification Settings
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'working-hours' ? 'active' : ''}`}
              onClick={() => handleTabChange('working-hours')}
            >
              Working Hours
            </button>
            <button 
              className={`sidebar-tab ${activeTab === 'danger' ? 'active' : ''}`}
              onClick={() => handleTabChange('danger')}
            >
              Danger Zone
            </button>
          </div>
          
          <div className="settings-content">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="settings-panel">
                <h2 className="panel-title">Profile Information</h2>
                <p className="panel-description">Update your personal information and professional details</p>
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
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
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="specialization">Specialization</label>
                    <input
                      type="text"
                      id="specialization"
                      name="specialization"
                      value={profileForm.specialization}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="qualifications">Qualifications</label>
                    <input
                      type="text"
                      id="qualifications"
                      name="qualifications"
                      value={profileForm.qualifications}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="experience">Years of Experience</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={profileForm.experience}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bio">Professional Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="5"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <Button type="submit" variant="primary">Save Changes</Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Password Tab */}
            {activeTab === 'password' && (
              <div className="settings-panel">
                <h2 className="panel-title">Change Password</h2>
                <p className="panel-description">Update your account password</p>
                
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
                  
                  <div className="form-actions">
                    <Button type="submit" variant="primary">Update Password</Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="settings-panel">
                <h2 className="panel-title">Notification Settings</h2>
                <p className="panel-description">Control how you receive notifications</p>
                
                <form onSubmit={handleNotificationSubmit}>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="emailNotifications">Email Notifications</label>
                    <p>Receive notifications via email</p>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={notificationSettings.smsNotifications}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="smsNotifications">SMS Notifications</label>
                    <p>Receive notifications via SMS</p>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="appointmentReminders"
                      name="appointmentReminders"
                      checked={notificationSettings.appointmentReminders}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="appointmentReminders">Appointment Reminders</label>
                    <p>Receive reminders about upcoming appointments</p>
                  </div>
                  
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      name="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="marketingEmails">Marketing Emails</label>
                    <p>Receive promotional emails and updates</p>
                  </div>
                  
                  <div className="form-actions">
                    <Button type="submit" variant="primary">Save Preferences</Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Working Hours Tab */}
            {activeTab === 'working-hours' && (
              <div className="settings-panel">
                <h2 className="panel-title">Working Hours</h2>
                <p className="panel-description">Set your availability for appointments</p>
                
                <form onSubmit={handleWorkingHoursSubmit}>
                  {Object.entries(workingHours).map(([day, hours]) => (
                    <div key={day} className="working-day">
                      <div className="day-toggle">
                        <input
                          type="checkbox"
                          id={`${day}-active`}
                          checked={hours.isActive}
                          onChange={(e) => handleWorkingHoursChange(day, 'isActive', e.target.checked)}
                        />
                        <label htmlFor={`${day}-active`}>
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </label>
                      </div>
                      
                      <div className="hours-inputs">
                        <div className="time-input">
                          <label htmlFor={`${day}-start`}>Start</label>
                          <input
                            type="time"
                            id={`${day}-start`}
                            value={hours.start}
                            onChange={(e) => handleWorkingHoursChange(day, 'start', e.target.value)}
                            disabled={!hours.isActive}
                          />
                        </div>
                        
                        <div className="time-input">
                          <label htmlFor={`${day}-end`}>End</label>
                          <input
                            type="time"
                            id={`${day}-end`}
                            value={hours.end}
                            onChange={(e) => handleWorkingHoursChange(day, 'end', e.target.value)}
                            disabled={!hours.isActive}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="form-actions">
                    <Button type="submit" variant="primary">Save Working Hours</Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="settings-panel danger-zone">
                <h2 className="panel-title">Danger Zone</h2>
                <p className="panel-description">Actions here can permanently affect your account</p>
                
                <div className="danger-item">
                  <div className="danger-info">
                    <h3>Delete Account</h3>
                    <p>Permanently delete your account and all associated data</p>
                  </div>
                  <Button 
                    variant="danger" 
                    onClick={() => setIsDeleteModalOpen(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Account"
      >
        <div className="delete-account-modal">
          <p>
            This action cannot be undone. This will permanently delete your account and remove all
            associated data.
          </p>
          <p className="warning-text">
            Please type <strong>DELETE</strong> to confirm:
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="delete-confirm-input"
          />
          <div className="modal-actions">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== 'DELETE'}
            >
              Permanently Delete Account
            </Button>
          </div>
        </div>
      </Modal>
      
      
    </DoctorLayout>
  );
};

export default Settings;