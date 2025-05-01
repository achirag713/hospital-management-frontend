import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import { formatDate } from '../../utils/dateUtils';
import './Appointments.css'; // Assuming you have a CSS file for styling

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    patient: 'Jane Doe',
    doctor: 'Dr. John Smith',
    specialization: 'Cardiology',
    date: '2025-05-05',
    time: '09:00 AM',
    status: 'Scheduled',
    notes: 'Regular checkup'
  },
  {
    id: 2,
    patient: 'John Anderson',
    doctor: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    date: '2025-05-05',
    time: '10:30 AM',
    status: 'Confirmed',
    notes: 'Follow-up appointment'
  },
  {
    id: 3,
    patient: 'Robert Wilson',
    doctor: 'Dr. Michael Brown',
    specialization: 'Orthopedics',
    date: '2025-05-05',
    time: '11:45 AM',
    status: 'Completed',
    notes: 'Post-surgery checkup'
  },
  {
    id: 4,
    patient: 'Emily Davis',
    doctor: 'Dr. Emily Davis',
    specialization: 'Pediatrics',
    date: '2025-05-06',
    time: '09:30 AM',
    status: 'Scheduled',
    notes: 'Vaccination'
  },
  {
    id: 5,
    patient: 'Sarah Brown',
    doctor: 'Dr. John Smith',
    specialization: 'Cardiology',
    date: '2025-05-06',
    time: '11:00 AM',
    status: 'Cancelled',
    notes: 'Patient requested cancellation'
  }
];

// Mock data for doctors and patients dropdowns
const mockDoctors = [
  { id: 1, name: 'Dr. John Smith', specialization: 'Cardiology' },
  { id: 2, name: 'Dr. Sarah Johnson', specialization: 'Neurology' },
  { id: 3, name: 'Dr. Michael Brown', specialization: 'Orthopedics' },
  { id: 4, name: 'Dr. Emily Davis', specialization: 'Pediatrics' },
  { id: 5, name: 'Dr. Robert Wilson', specialization: 'Dermatology' }
];

const mockPatients = [
  { id: 1, name: 'Jane Doe' },
  { id: 2, name: 'John Anderson' },
  { id: 3, name: 'Robert Wilson' },
  { id: 4, name: 'Emily Davis' },
  { id: 5, name: 'Sarah Brown' }
];

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    status: 'Scheduled',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const appointmentsResponse = await api.admin.getAppointments();
        // const doctorsResponse = await api.admin.getDoctors();
        // const patientsResponse = await api.admin.getPatients();
        
        // setAppointments(appointmentsResponse.data);
        // setDoctors(doctorsResponse.data);
        // setPatients(patientsResponse.data);
        
        // Using mock data for now
        setTimeout(() => {
          setAppointments(mockAppointments);
          setDoctors(mockDoctors);
          setPatients(mockPatients);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddNew = () => {
    setCurrentAppointment(null);
    setFormData({
      patientId: '',
      doctorId: '',
      date: '',
      time: '',
      status: 'Scheduled',
      notes: ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (appointment) => {
    // Find the doctor and patient IDs based on names
    const doctor = doctors.find(d => d.name === appointment.doctor);
    const patient = patients.find(p => p.name === appointment.patient);
    
    setCurrentAppointment(appointment);
    setFormData({
      patientId: patient ? patient.id.toString() : '',
      doctorId: doctor ? doctor.id.toString() : '',
      date: appointment.date,
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes || ''
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        // In a real app, this would be an API call
        // await api.admin.deleteAppointment(appointmentId);
        
        // Update UI
        setAppointments(appointments.filter(appt => appt.id !== appointmentId));
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientId) {
      newErrors.patientId = 'Patient is required';
    }
    
    if (!formData.doctorId) {
      newErrors.doctorId = 'Doctor is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
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
      // Find the doctor and patient objects based on selected IDs
      const doctor = doctors.find(d => d.id.toString() === formData.doctorId);
      const patient = patients.find(p => p.id.toString() === formData.patientId);
      
      if (!doctor || !patient) {
        console.error('Doctor or patient not found');
        return;
      }
      
      const appointmentData = {
        patient: patient.name,
        doctor: doctor.name,
        specialization: doctor.specialization,
        date: formData.date,
        time: formData.time,
        status: formData.status,
        notes: formData.notes
      };
      
      if (currentAppointment) {
        // Update existing appointment
        // In a real app, this would be an API call
        // await api.admin.updateAppointment(currentAppointment.id, appointmentData);
        
        // Update UI
        setAppointments(appointments.map(appt => 
          appt.id === currentAppointment.id ? { ...appt, ...appointmentData } : appt
        ));
      } else {
        // Add new appointment
        // In a real app, this would be an API call
        // const response = await api.admin.addAppointment(appointmentData);
        
        // Mock new appointment with ID
        const newAppointment = {
          id: Date.now(),
          ...appointmentData
        };
        
        // Update UI
        setAppointments([...appointments, newAppointment]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving appointment:', error);
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
  const filteredAppointments = appointments.filter(appointment => {
    let match = true;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      match = match && (
        appointment.patient.toLowerCase().includes(query) ||
        appointment.doctor.toLowerCase().includes(query) ||
        appointment.specialization.toLowerCase().includes(query)
      );
    }
    
    // Apply date filter
    if (filterDate) {
      match = match && appointment.date === filterDate;
    }
    
    // Apply status filter
    if (filterStatus) {
      match = match && appointment.status === filterStatus;
    }
    
    return match;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'scheduled';
      case 'Confirmed':
        return 'confirmed';
      case 'Completed':
        return 'completed';
      case 'Cancelled':
        return 'cancelled';
      default:
        return '';
    }
  };

  const columns = [
    { key: 'patient', title: 'Patient' },
    { key: 'doctor', title: 'Doctor' },
    { key: 'specialization', title: 'Specialization' },
    { 
      key: 'date', 
      title: 'Date',
      render: (value) => formatDate(value)
    },
    { key: 'time', title: 'Time' },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span className={`status-badge ${getStatusBadgeClass(value)}`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, appointment) => (
        <div className="action-buttons">
          <Button variant="outline" size="sm" onClick={() => handleEdit(appointment)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(appointment.id)}>
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
        {currentAppointment ? 'Update Appointment' : 'Schedule Appointment'}
      </Button>
    </>
  );

  // Get unique appointment dates for the filter
  const uniqueDates = [...new Set(appointments.map(appt => appt.date))];
  // Status options for filter
  const statusOptions = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled'];

  return (
    <AdminLayout>
      <div className="admin-appointments">
        <div className="page-header">
          <h1>Appointments Management</h1>
          <Button variant="primary" onClick={handleAddNew}>Schedule Appointment</Button>
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="filter-select"
            >
              <option value="">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {formatDate(date)}
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
              setFilterDate('');
              setFilterStatus('');
            }}>
              Clear Filters
            </Button>
          </div>
        </div>
        
        <div className="appointments-table">
          <Table
            columns={columns}
            data={filteredAppointments}
            loading={loading}
            emptyMessage="No appointments found"
          />
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
          footer={modalFooter}
        >
          <form className="appointment-form">
            <div className="form-group">
              <label htmlFor="patientId">Patient</label>
              <select
                id="patientId"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className={errors.patientId ? 'error' : ''}
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              {errors.patientId && <div className="error-message">{errors.patientId}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="doctorId">Doctor</label>
              <select
                id="doctorId"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className={errors.doctorId ? 'error' : ''}
              >
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} ({doctor.specialization})
                  </option>
                ))}
              </select>
              {errors.doctorId && <div className="error-message">{errors.doctorId}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Appointment Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="time">Appointment Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={errors.time ? 'error' : ''}
              />
              {errors.time && <div className="error-message">{errors.time}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
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

export default AdminAppointments;