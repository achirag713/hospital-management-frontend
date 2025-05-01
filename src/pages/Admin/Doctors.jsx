import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import './Doctors.css'; // Assuming you have a CSS file for styling

// Mock doctor data
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    email: 'john.smith@hospital.com',
    phone: '+1 (555) 123-4567',
    specialization: 'Cardiology',
    experience: 15,
    status: 'Active',
    availability: 'Mon, Wed, Fri (9 AM - 5 PM)'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    phone: '+1 (555) 234-5678',
    specialization: 'Neurology',
    experience: 10,
    status: 'Active',
    availability: 'Tue, Thu (8 AM - 4 PM)'
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    email: 'michael.brown@hospital.com',
    phone: '+1 (555) 345-6789',
    specialization: 'Orthopedics',
    experience: 12,
    status: 'Active',
    availability: 'Mon, Tue, Thu (10 AM - 6 PM)'
  },
  {
    id: 4,
    name: 'Dr. Emily Davis',
    email: 'emily.davis@hospital.com',
    phone: '+1 (555) 456-7890',
    specialization: 'Pediatrics',
    experience: 8,
    status: 'On Leave',
    availability: 'Wed, Fri (9 AM - 3 PM)'
  },
  {
    id: 5,
    name: 'Dr. Robert Wilson',
    email: 'robert.wilson@hospital.com',
    phone: '+1 (555) 567-8901',
    specialization: 'Dermatology',
    experience: 7,
    status: 'Active',
    availability: 'Mon, Wed, Fri (1 PM - 7 PM)'
  }
];

// Specialization options
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
    status: 'Active',
    availability: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.admin.getDoctors();
        // setDoctors(response.data);
        
        // Using mock data for now
        setTimeout(() => {
          setDoctors(mockDoctors);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAddNew = () => {
    setCurrentDoctor(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      specialization: '',
      experience: '',
      status: 'Active',
      availability: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (doctor) => {
    setCurrentDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      experience: doctor.experience.toString(),
      status: doctor.status,
      availability: doctor.availability,
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleViewSchedule = (doctorId) => {
    // Navigate to doctor schedule or show in modal
    console.log(`View schedule for doctor ${doctorId}`);
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        // In a real app, this would be an API call
        // await api.admin.deleteDoctor(doctorId);
        
        // Update UI
        setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
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
    
    if (!formData.experience.trim()) {
      newErrors.experience = 'Years of experience is required';
    } else if (isNaN(formData.experience) || parseInt(formData.experience) < 0) {
      newErrors.experience = 'Experience must be a valid number';
    }
    
    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability schedule is required';
    }
    
    // Only validate password fields for new doctors
    if (!currentDoctor) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (formData.password) {
      // If editing and password is provided, validate it
      if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
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
      const doctorData = {
        ...formData,
        experience: parseInt(formData.experience),
        role: 'doctor' // Explicitly setting the role to doctor
      };
      
      // Remove password fields if they are empty (for edits)
      if (!doctorData.password) {
        delete doctorData.password;
        delete doctorData.confirmPassword;
      }
      
      // Always remove confirmPassword as it's not needed in the backend
      delete doctorData.confirmPassword;
      
      if (currentDoctor) {
        // Update existing doctor
        // In a real app, this would be an API call
        // await api.admin.updateDoctor(currentDoctor.id, doctorData);
        
        // Update UI
        setDoctors(doctors.map(doctor => 
          doctor.id === currentDoctor.id ? { ...doctor, ...doctorData } : doctor
        ));
      } else {
        // Add new doctor
        // In a real app, this would be an API call
        // const response = await api.admin.addDoctor(doctorData);
        
        // Mock new doctor with ID
        const newDoctor = {
          id: Date.now(),
          ...doctorData
        };
        
        // Update UI
        setDoctors([...doctors, newDoctor]);
      }
      
      setIsModalOpen(false);
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

  // Apply filters and search
  const filteredDoctors = doctors.filter(doctor => {
    let match = true;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      match = match && (
        doctor.name.toLowerCase().includes(query) ||
        doctor.email.toLowerCase().includes(query) ||
        doctor.phone.toLowerCase().includes(query)
      );
    }
    
    // Apply specialization filter
    if (filterSpecialization) {
      match = match && doctor.specialization === filterSpecialization;
    }
    
    // Apply status filter
    if (filterStatus) {
      match = match && doctor.status === filterStatus;
    }
    
    return match;
  });

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'specialization', title: 'Specialization' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    { key: 'experience', title: 'Experience (Years)' },
    { 
      key: 'status', 
      title: 'Status',
      render: (status) => (
        <span className={`status-badge ${status === 'Active' ? 'active' : 'inactive'}`}>
          {status}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, doctor) => (
        <div className="action-buttons">
          <Button variant="outline" size="sm" onClick={() => handleViewSchedule(doctor.id)}>
            Schedule
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleEdit(doctor)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(doctor.id)}>
            Delete
          </Button>
        </div>
      )
    }
  ];

  const modalFooter = (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        {currentDoctor ? 'Update Doctor' : 'Add Doctor'}
      </Button>
    </>
  );

  // Status options for filter
  const statusOptions = ['Active', 'On Leave', 'Inactive'];

  return (
    <AdminLayout>
      <div className="admin-doctors">
        <div className="page-header">
          <h1>Doctors Management</h1>
          <Button variant="primary" onClick={handleAddNew}>Add New Doctor</Button>
        </div>
        
        <div className="info-banner">
          <p>
            <strong>Note:</strong> Doctors can only be added by administrators. Doctor accounts cannot register themselves.
          </p>
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="filter-select"
            >
              <option value="">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">All Statuses</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <Button variant="outline" size="sm" onClick={() => {
              setSearchQuery('');
              setFilterSpecialization('');
              setFilterStatus('');
            }}>
              Clear Filters
            </Button>
          </div>
        </div>
        
        <div className="doctors-table">
          <Table
            columns={columns}
            data={filteredDoctors}
            loading={loading}
            emptyMessage="No doctors found"
          />
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentDoctor ? 'Edit Doctor' : 'Add New Doctor Account'}
          footer={modalFooter}
        >
          <form className="doctor-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
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
              <label htmlFor="experience">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={errors.experience ? 'error' : ''}
                min="0"
              />
              {errors.experience && <div className="error-message">{errors.experience}</div>}
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
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="availability">Availability Schedule</label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className={errors.availability ? 'error' : ''}
                placeholder="e.g. Mon, Wed, Fri (9 AM - 5 PM)"
              />
              {errors.availability && <div className="error-message">{errors.availability}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">{currentDoctor ? 'New Password (leave blank to keep current)' : 'Password'}</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;