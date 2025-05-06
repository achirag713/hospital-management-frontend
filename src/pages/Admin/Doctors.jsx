import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import './Doctors.css';

// Mock data for doctors
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    status: 'Active',
    patients: 45,
    email: 'john.smith@hospital.com',
    phone: '+1 234-567-8901'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    status: 'Active',
    patients: 38,
    email: 'sarah.johnson@hospital.com',
    phone: '+1 234-567-8902'
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    specialization: 'Orthopedics',
    status: 'Inactive',
    patients: 52,
    email: 'michael.brown@hospital.com',
    phone: '+1 234-567-8903'
  }
];

const specializations = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'Ophthalmology',
  'ENT',
  'Gynecology',
  'Urology',
  'Psychiatry',
  'Dentistry',
  'General Medicine'
];

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    status: 'Active',
    password: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await api.admin.getDoctors();
        // setDoctors(response.data);
        
        // Using mock data for now
        setDoctors(mockDoctors);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      status: 'Active',
      password: ''
    });
    setErrors({});
  };

  const handleAddDoctor = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      status: doctor.status,
      password: ''
    });
    setErrors({});
    setIsEditModalOpen(true);
  };

  const handleRemoveDoctor = async (doctorId) => {
    if (window.confirm('Are you sure you want to remove this doctor?')) {
      try {
        // TODO: Replace with actual API call
        // await api.admin.deleteDoctor(doctorId);
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      } catch (error) {
        console.error('Error removing doctor:', error);
      }
    }
  };

  const handleStatusToggle = async (doctorId) => {
    try {
      // TODO: Replace with actual API call
      // await api.admin.updateDoctorStatus(doctorId, newStatus);
      setDoctors(doctors.map(doctor => {
        if (doctor.id === doctorId) {
          return {
            ...doctor,
            status: doctor.status === 'Active' ? 'Inactive' : 'Active'
          };
        }
        return doctor;
      }));
    } catch (error) {
      console.error('Error updating doctor status:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.specialization) {
      newErrors.specialization = 'Specialization is required';
    }
    
    if (!selectedDoctor && !formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (!selectedDoctor && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (selectedDoctor) {
        // Update existing doctor
        // TODO: Replace with actual API call
        // await api.admin.updateDoctor(selectedDoctor.id, formData);
        
        setDoctors(doctors.map(doctor => 
          doctor.id === selectedDoctor.id ? { ...doctor, ...formData } : doctor
        ));
        setIsEditModalOpen(false);
        setSelectedDoctor(null);
      } else {
        // Add new doctor
        // TODO: Replace with actual API call
        // const response = await api.admin.addDoctor(formData);
        
        const newDoctor = {
          id: Date.now(),
          ...formData,
          patients: 0
        };
        
        setDoctors([...doctors, newDoctor]);
        setIsAddModalOpen(false);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCloseModal = () => {
    if (isAddModalOpen) {
      setIsAddModalOpen(false);
    }
    if (isEditModalOpen) {
      setIsEditModalOpen(false);
      setSelectedDoctor(null);
    }
    resetForm();
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderDoctorCard = (doctor) => (
    <div key={doctor.id} className="doctor-card">
      <div className="doctor-header">
        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <span className={`status-badge ${doctor.status.toLowerCase()}`}>
            {doctor.status}
          </span>
        </div>
        <div className="doctor-actions">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditDoctor(doctor)}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => handleRemoveDoctor(doctor.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="doctor-details">
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
        <p><strong>Patients:</strong> {doctor.patients}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
      </div>
      <div className="doctor-footer">
        <Button 
          variant={doctor.status === 'Active' ? 'danger' : 'success'}
          size="sm"
          onClick={() => handleStatusToggle(doctor.id)}
        >
          {doctor.status === 'Active' ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
    </div>
  );

  const renderDoctorForm = () => (
    <form onSubmit={handleSubmit} className="doctor-form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter doctor's full name"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter doctor's email"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'error' : ''}
          placeholder="Enter doctor's phone number"
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="specialization">Specialization</label>
        <select
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          className={errors.specialization ? 'error' : ''}
        >
          <option value="">Select Specialization</option>
          {specializations.map(spec => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors.specialization && <div className="error-message">{errors.specialization}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {!selectedDoctor && (
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            placeholder="Enter initial password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
      )}
    </form>
  );

  return (
    <AdminLayout>
      <div className="admin-doctors">
        <div className="page-header">
          <h1>Doctors</h1>
          <Button variant="primary" onClick={handleAddDoctor}>
            Add Doctor
          </Button>
        </div>

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="status-filter">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading doctors...</p>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map(renderDoctorCard)}
          </div>
        )}

        {/* Add Doctor Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={handleCloseModal}
          title="Add New Doctor"
          footer={
            <div className="modal-footer">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Add Doctor
              </Button>
            </div>
          }
        >
          <div className="modal-content">
            {renderDoctorForm()}
          </div>
        </Modal>

        {/* Edit Doctor Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={handleCloseModal}
          title="Edit Doctor"
          footer={
            <div className="modal-footer">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Update Doctor
              </Button>
            </div>
          }
        >
          <div className="modal-content">
            {renderDoctorForm()}
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;