import React, { useState } from 'react';
import PatientLayout from '../../layouts/PatientLayout';
import Button from '../../components/common/Button';
import './Settings.css'; // Import the CSS file for styling

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1990-01-15',
    bloodGroup: 'O+',
    address: '123 Main St, Anytown, USA',
    emergencyContact: '+1 (555) 987-6543',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    appointments: true,
    reminders: true,
    newsletters: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(profileData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!profileData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      // In a real application, you would make an API call here
      // api.profile.updateProfile(profileData);
      
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (validatePasswordForm()) {
      // In a real application, you would make an API call here
      // api.profile.changePassword(passwordData);
      
      setSuccessMessage('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would make an API call here
    // api.profile.updateNotificationSettings(notificationSettings);
    
    setSuccessMessage('Notification settings updated successfully');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <PatientLayout>
      <div className="settings-page">
        <h1>Account Settings</h1>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <div className="settings-container">
          <div className="settings-tabs">
            <div 
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Information
            </div>
            <div 
              className={`tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              Change Password
            </div>
            <div 
              className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notification Settings
            </div>
          </div>
          
          <div className="settings-content">
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Profile Information</h2>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : null}
                </div>
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={errors.name ? 'error' : ''}
                      />
                      {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className={errors.phone ? 'error' : ''}
                      />
                      {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={profileData.dob}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="bloodGroup">Blood Group</label>
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="emergencyContact">Emergency Contact</label>
                      <input
                        type="text"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group full-width">
                      <label htmlFor="address">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="form-actions">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setErrors({});
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            )}
            
            {activeTab === 'password' && (
              <div className="tab-content">
                <h2>Change Password</h2>
                
                <form onSubmit={handlePasswordSubmit}>
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={errors.currentPassword ? 'error' : ''}
                    />
                    {errors.currentPassword && <div className="error-message">{errors.currentPassword}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={errors.newPassword ? 'error' : ''}
                    />
                    {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                  </div>
                  
                  <div className="form-actions">
                    <Button 
                      variant="primary" 
                      type="submit"
                    >
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="tab-content">
                <h2>Notification Settings</h2>
                
                <form onSubmit={handleNotificationSubmit}>
                  <div className="notifications-section">
                    <h3>Communication Channels</h3>
                    
                    <div className="checkbox-group">
                      <label htmlFor="email">
                        <input
                          type="checkbox"
                          id="email"
                          name="email"
                          checked={notificationSettings.email}
                          onChange={handleNotificationChange}
                        />
                        Email Notifications
                      </label>
                    </div>
                    
                    <div className="checkbox-group">
                      <label htmlFor="sms">
                        <input
                          type="checkbox"
                          id="sms"
                          name="sms"
                          checked={notificationSettings.sms}
                          onChange={handleNotificationChange}
                        />
                        SMS Notifications
                      </label>
                    </div>
                  </div>
                  
                  <div className="notifications-section">
                    <h3>Notification Types</h3>
                    
                    <div className="checkbox-group">
                      <label htmlFor="appointments">
                        <input
                          type="checkbox"
                          id="appointments"
                          name="appointments"
                          checked={notificationSettings.appointments}
                          onChange={handleNotificationChange}
                        />
                        Appointment Confirmations and Changes
                      </label>
                    </div>
                    
                    <div className="checkbox-group">
                      <label htmlFor="reminders">
                        <input
                          type="checkbox"
                          id="reminders"
                          name="reminders"
                          checked={notificationSettings.reminders}
                          onChange={handleNotificationChange}
                        />
                        Medication and Appointment Reminders
                      </label>
                    </div>
                    
                    <div className="checkbox-group">
                      <label htmlFor="newsletters">
                        <input
                          type="checkbox"
                          id="newsletters"
                          name="newsletters"
                          checked={notificationSettings.newsletters}
                          onChange={handleNotificationChange}
                        />
                        Hospital Newsletters and Updates
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <Button 
                      variant="primary" 
                      type="submit"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      
      
    </PatientLayout>
  );
};

export default Settings;