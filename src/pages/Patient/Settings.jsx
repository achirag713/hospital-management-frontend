import React, { useState } from 'react';
import PatientLayout from '../../layouts/PatientLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
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
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

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

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would make an API call here
    // api.profile.update(profileData);
    
    setSuccessMessage('Profile updated successfully');
    setIsEditing(false);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
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

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setErrors({ deleteAccount: 'Please type DELETE to confirm' });
      return;
    }
    
    try {
      // Mock logout
      // logout();
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrors({ deleteAccount: 'Failed to delete account' });
    }
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
              className={`tab ${activeTab === 'danger' ? 'active' : ''}`}
              onClick={() => setActiveTab('danger')}
            >
              Danger Zone
            </div>
          </div>
          
          <div className="settings-content">
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="tab-header">
                  <h2>Profile Information</h2>
                  <Button
                    variant={isEditing ? "outline" : "primary"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
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
                        required
                      />
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
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        required
                      />
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
                        required
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
                        required
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
                        type="tel"
                        id="emergencyContact"
                        name="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        required
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
                        required
                        rows="3"
                      />
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="form-actions">
                      <Button type="submit" variant="primary">
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
                      required
                    />
                    {errors.currentPassword && (
                      <div className="error-message">{errors.currentPassword}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    {errors.newPassword && (
                      <div className="error-message">{errors.newPassword}</div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="error-message">{errors.confirmPassword}</div>
                    )}
                  </div>
                  
                  <div className="form-actions">
                    <Button type="submit" variant="primary">
                      Change Password
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div className="settings-panel danger-zone">
                <h2>Danger Zone</h2>
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
          {errors.deleteAccount && (
            <div className="error-message">{errors.deleteAccount}</div>
          )}
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
    </PatientLayout>
  );
};

export default Settings;