import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import './Patients.css'; // Assuming you have a CSS file for styling

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    age: 32,
    gender: 'Female',
    bloodGroup: 'A+',
    address: '123 Main St, Anytown, USA'
  },
  {
    id: 2,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 234-5678',
    age: 45,
    gender: 'Male',
    bloodGroup: 'O+',
    address: '456 Oak St, Anytown, USA'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1 (555) 345-6789',
    age: 28,
    gender: 'Female',
    bloodGroup: 'B-',
    address: '789 Pine St, Anytown, USA'
  },
  {
    id: 4,
    name: 'Robert Brown',
    email: 'robert.brown@example.com',
    phone: '+1 (555) 456-7890',
    age: 52,
    gender: 'Male',
    bloodGroup: 'AB+',
    address: '101 Elm St, Anytown, USA'
  },
  {
    id: 5,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 567-8901',
    age: 19,
    gender: 'Female',
    bloodGroup: 'A-',
    address: '202 Maple St, Anytown, USA'
  }
];

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    bloodGroup: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.admin.getPatients();
        // setPatients(response.data);
        
        // Using mock data for now
        setTimeout(() => {
          setPatients(mockPatients);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleAddNew = () => {
    setCurrentPatient(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: 'Male',
      bloodGroup: '',
      address: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (patient) => {
    setCurrentPatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      age: patient.age.toString(),
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
      address: patient.address
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleViewMedicalRecords = (patientId) => {
    // Navigate to patient medical records or show in modal
    console.log(`View medical records for patient ${patientId}`);
  };

  const handleDelete = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        // In a real app, this would be an API call
        // await api.admin.deletePatient(patientId);
        
        // Update UI
        setPatients(patients.filter(patient => patient.id !== patientId));
        setSelectedPatients(selectedPatients.filter(id => id !== patientId));
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedPatients.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedPatients.length} selected patients?`)) {
      try {
        // In a real app, this would be an API call to delete multiple patients
        // await Promise.all(selectedPatients.map(id => api.admin.deletePatient(id)));
        
        // Update UI
        setPatients(patients.filter(patient => !selectedPatients.includes(patient.id)));
        setSelectedPatients([]);
      } catch (error) {
        console.error('Error deleting selected patients:', error);
      }
    }
  };

  const handleSelectRow = (patient) => {
    setSelectedPatients(prev => {
      const isSelected = prev.includes(patient.id);
      if (isSelected) {
        return prev.filter(id => id !== patient.id);
      } else {
        return [...prev, patient.id];
      }
    });
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedPatients(patients.map(patient => patient.id));
    } else {
      setSelectedPatients([]);
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
    
    if (!formData.age.trim()) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) <= 0) {
      newErrors.age = 'Age must be a positive number';
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
      const patientData = {
        ...formData,
        age: parseInt(formData.age)
      };
      
      if (currentPatient) {
        // Update existing patient
        // In a real app, this would be an API call
        // await api.admin.updatePatient(currentPatient.id, patientData);
        
        // Update UI
        setPatients(patients.map(patient => 
          patient.id === currentPatient.id ? { ...patient, ...patientData } : patient
        ));
      } else {
        // Add new patient
        // In a real app, this would be an API call
        // const response = await api.admin.addPatient(patientData);
        
        // Mock new patient with ID
        const newPatient = {
          id: Date.now(),
          ...patientData
        };
        
        // Update UI
        setPatients([...patients, newPatient]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving patient:', error);
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

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'gender', title: 'Gender' },
    { key: 'bloodGroup', title: 'Blood Group' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, patient) => (
        <div className="action-buttons">
          <Button variant="outline" size="sm" onClick={() => handleViewMedicalRecords(patient.id)}>
            Records
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleEdit(patient)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(patient.id)}>
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
        {currentPatient ? 'Update Patient' : 'Add Patient'}
      </Button>
    </>
  );

  return (
    <AdminLayout>
      <div className="admin-patients">
        <div className="page-header">
          <h1>Patients Management</h1>
          <Button variant="primary" onClick={handleAddNew}>Add New Patient</Button>
        </div>
        
        <div className="toolbar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          {selectedPatients.length > 0 && (
            <Button variant="danger" onClick={handleDeleteSelected}>
              Delete Selected ({selectedPatients.length})
            </Button>
          )}
        </div>
        
        <div className="patients-table">
          <Table
            columns={columns}
            data={filteredPatients}
            loading={loading}
            emptyMessage="No patients found"
            selectable={true}
            selectedRows={selectedPatients.map(id => ({ id }))}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
          />
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentPatient ? 'Edit Patient' : 'Add New Patient'}
          footer={modalFooter}
        >
          <form className="patient-form">
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
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={errors.age ? 'error' : ''}
              />
              {errors.age && <div className="error-message">{errors.age}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="bloodGroup">Blood Group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
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
            
            <div className="form-group full-width">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </form>
        </Modal>
      </div>
      
      
    </AdminLayout>
  );
};

export default AdminPatients;