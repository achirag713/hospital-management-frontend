import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import './Patients.css';

// Mock data for patients
const mockPatients = [
  {
    id: 1,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8901',
    address: '123 Main St, City',
    medicalHistory: 'Hypertension, Diabetes',
    lastVisit: '2024-02-15',
    bills: [
      { id: 1, date: '2024-02-15', amount: 150, status: 'Paid' },
      { id: 2, date: '2024-02-20', amount: 200, status: 'Pending' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    email: 'jane.smith@example.com',
    phone: '+1 234-567-8902',
    address: '456 Oak St, City',
    medicalHistory: 'Asthma',
    lastVisit: '2024-02-10',
    bills: [
      { id: 3, date: '2024-02-10', amount: 180, status: 'Paid' }
    ]
  }
];

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    medicalHistory: ''
  });
  const [billData, setBillData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Pending'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await api.admin.getPatients();
        // setPatients(response.data);
        
        // Using mock data for now
        setPatients(mockPatients);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      medicalHistory: patient.medicalHistory
    });
    setErrors({});
    setIsEditModalOpen(true);
  };

  const handleRemovePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to remove this patient?')) {
      try {
        // TODO: Replace with actual API call
        // await api.admin.deletePatient(patientId);
        setPatients(patients.filter(patient => patient.id !== patientId));
      } catch (error) {
        console.error('Error removing patient:', error);
      }
    }
  };

  const handleUploadBill = (patient) => {
    setSelectedPatient(patient);
    setBillData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });
    setErrors({});
    setIsBillModalOpen(true);
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
    
    if (!formData.age || formData.age < 0) {
      newErrors.age = 'Valid age is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBillForm = () => {
    const newErrors = {};
    
    if (!billData.amount || billData.amount <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    
    if (!billData.date) {
      newErrors.date = 'Date is required';
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
      // TODO: Replace with actual API call
      // await api.admin.updatePatient(selectedPatient.id, formData);
      
      setPatients(patients.map(patient => 
        patient.id === selectedPatient.id ? { ...patient, ...formData } : patient
      ));
      setIsEditModalOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const handleBillSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateBillForm()) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      // await api.admin.addBill(selectedPatient.id, billData);
      
      const newBill = {
        id: Date.now(),
        ...billData
      };
      
      setPatients(patients.map(patient => {
        if (patient.id === selectedPatient.id) {
          return {
            ...patient,
            bills: [...patient.bills, newBill]
          };
        }
        return patient;
      }));
      
      setIsBillModalOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error adding bill:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBillData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPatientCard = (patient) => (
    <div key={patient.id} className="patient-card">
      <div className="patient-header">
        <div className="patient-info">
          <h3>{patient.name}</h3>
          <span className="patient-age-gender">{patient.age} years, {patient.gender}</span>
        </div>
        <div className="patient-actions">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditPatient(patient)}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => handleRemovePatient(patient.id)}
          >
            Remove
          </Button>
        </div>
      </div>
      
      <div className="patient-details">
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
        <p><strong>Last Visit:</strong> {patient.lastVisit}</p>
      </div>
      
      <div className="patient-bills">
        <h4>Recent Bills</h4>
        {patient.bills.length > 0 ? (
          <div className="bills-list">
            {patient.bills.map(bill => (
              <div key={bill.id} className="bill-item">
                <span className="bill-date">{bill.date}</span>
                <span className="bill-amount">${bill.amount}</span>
                <span className={`bill-status ${bill.status.toLowerCase()}`}>
                  {bill.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-bills">No bills found</p>
        )}
      </div>
      
      <div className="patient-footer">
        <Button 
          variant="primary" 
          size="sm"
          onClick={() => handleUploadBill(patient)}
        >
          Upload Bill
        </Button>
      </div>
    </div>
  );

  const renderPatientForm = () => (
    <form onSubmit={handleSubmit} className="patient-form">
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Enter patient's full name"
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
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
          placeholder="Enter patient's age"
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Enter patient's email"
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
          placeholder="Enter patient's phone number"
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter patient's address"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="medicalHistory">Medical History</label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Enter patient's medical history"
          rows="3"
        />
      </div>
    </form>
  );

  const renderBillForm = () => (
    <form onSubmit={handleBillSubmit} className="bill-form">
      <div className="form-group">
        <label htmlFor="amount">Amount ($)</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={billData.amount}
          onChange={handleBillChange}
          className={errors.amount ? 'error' : ''}
          placeholder="Enter bill amount"
          min="0"
          step="0.01"
        />
        {errors.amount && <div className="error-message">{errors.amount}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={billData.date}
          onChange={handleBillChange}
          className={errors.date ? 'error' : ''}
        />
        {errors.date && <div className="error-message">{errors.date}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={billData.status}
          onChange={handleBillChange}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>
      </div>
    </form>
  );

  return (
    <AdminLayout>
      <div className="admin-patients">
        <div className="page-header">
          <h1>Patients</h1>
        </div>

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading patients...</p>
          </div>
        ) : (
          <div className="patients-grid">
            {filteredPatients.map(renderPatientCard)}
          </div>
        )}

        {/* Edit Patient Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPatient(null);
          }}
          title="Edit Patient"
          footer={
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedPatient(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Update Patient
              </Button>
            </div>
          }
        >
          <div className="modal-content">
            {renderPatientForm()}
          </div>
        </Modal>

        {/* Upload Bill Modal */}
        <Modal
          isOpen={isBillModalOpen}
          onClose={() => {
            setIsBillModalOpen(false);
            setSelectedPatient(null);
          }}
          title="Upload Bill"
          footer={
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsBillModalOpen(false);
                  setSelectedPatient(null);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleBillSubmit}>
                Upload Bill
              </Button>
            </div>
          }
        >
          <div className="modal-content">
            {renderBillForm()}
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminPatients;