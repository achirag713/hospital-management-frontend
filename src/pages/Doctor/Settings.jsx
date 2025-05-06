import React, { useState, useEffect } from 'react';
import DoctorLayout from '../../layouts/DoctorLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import './Settings.css';

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
  
  // States for UI
  const [activeTab, setActiveTab] = useState('profile');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Load user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        specialization: user.specialization || '',
        qualifications: user.qualifications || '',
        experience: user.experience || '',
        bio: user.bio || ''
      });
    }
  }, [user]);
  
  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errorMessage) {
      setErrorMessage('');
    }
  };
  
  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errorMessage) {
      setErrorMessage('');
    }
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
  
  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setErrorMessage('Please type DELETE to confirm');
      return;
    }
    
    try {
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
      <div className="settings-page">
        <h1>Account Settings</h1>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        
        <div className="settings-container">
          <div className="settings-tabs">
            <button 
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              Profile Information
            </button>
            <button 
              className={`tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => handleTabChange('password')}
            >
              Change Password
            </button>
            <button 
              className={`tab ${activeTab === 'danger' ? 'active' : ''}`}
              onClick={() => handleTabChange('danger')}
            >
              Danger Zone
            </button>
          </div>
          
          <div className="settings-content">
            {/* Profile Information Tab */}
            {activeTab === 'profile' && (
              <div className="settings-panel">
                <h2>Profile Information</h2>
                <p className="panel-description">Update your personal information and professional details</p>
                
                <form onSubmit={handleProfileSubmit}>
                  <div className="form-grid">
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
                <h2>Change Password</h2>
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