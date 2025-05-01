import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DoctorLayout from '../../layouts/DoctorLayout';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import './Appointments.css'; // Assuming you have a CSS file for styling

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: 'Jane Cooper',
    patientId: 'PT-10025',
    patientAge: 32,
    patientGender: 'Female',
    appointmentDate: '2025-04-30',
    appointmentTime: '09:30 AM',
    appointmentType: 'Consultation',
    status: 'Confirmed',
  },
  {
    id: 2,
    patientName: 'Robert Fox',
    patientId: 'PT-10026',
    patientAge: 45,
    patientGender: 'Male',
    appointmentDate: '2025-04-30',
    appointmentTime: '10:00 AM',
    appointmentType: 'Follow-up',
    status: 'Checked-in',
  },
  {
    id: 3,
    patientName: 'Emily Wilson',
    patientId: 'PT-10027',
    patientAge: 28,
    patientGender: 'Female',
    appointmentDate: '2025-04-30',
    appointmentTime: '11:30 AM',
    appointmentType: 'Consultation',
    status: 'Confirmed',
  },
  {
    id: 4,
    patientName: 'Thomas Hansen',
    patientId: 'PT-10028',
    patientAge: 52,
    patientGender: 'Male',
    appointmentDate: '2025-04-30',
    appointmentTime: '02:00 PM',
    appointmentType: 'Procedure',
    status: 'Confirmed',
  },
  {
    id: 5,
    patientName: 'Diana Mitchell',
    patientId: 'PT-10029',
    patientAge: 37,
    patientGender: 'Female',
    appointmentDate: '2025-05-01',
    appointmentTime: '09:00 AM',
    appointmentType: 'Consultation',
    status: 'Scheduled',
  },
  {
    id: 6,
    patientName: 'Michael Brown',
    patientId: 'PT-10030',
    patientAge: 62,
    patientGender: 'Male',
    appointmentDate: '2025-05-01',
    appointmentTime: '11:00 AM',
    appointmentType: 'Follow-up',
    status: 'Scheduled',
  },
  {
    id: 7,
    patientName: 'Sophia Garcia',
    patientId: 'PT-10031',
    patientAge: 41,
    patientGender: 'Female',
    appointmentDate: '2025-05-02',
    appointmentTime: '10:30 AM',
    appointmentType: 'Consultation',
    status: 'Scheduled',
  },
  {
    id: 8,
    patientName: 'William Johnson',
    patientId: 'PT-10032',
    patientAge: 55,
    patientGender: 'Male',
    appointmentDate: '2025-05-02',
    appointmentTime: '02:30 PM',
    appointmentType: 'Procedure',
    status: 'Scheduled',
  },
];

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    const fetchAppointments = async () => {
      try {
        // In a real application, this would be an API call
        // const response = await api.doctor.getAppointments();
        // setAppointments(response.data);
        
        // Using mock data
        setTimeout(() => {
          setAppointments(mockAppointments);
          setFilteredAppointments(mockAppointments);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    let result = [...appointments];
    
    // Apply status filter
    if (filter !== 'all') {
      result = result.filter(appointment => appointment.status.toLowerCase() === filter.toLowerCase());
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        appointment => appointment.patientName.toLowerCase().includes(query) || 
                      appointment.patientId.toLowerCase().includes(query)
      );
    }
    
    // Apply date filter
    if (dateFilter) {
      result = result.filter(appointment => appointment.appointmentDate === dateFilter);
    }
    
    setFilteredAppointments(result);
  }, [filter, searchQuery, dateFilter, appointments]);
  
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };
  
  const handleStatusChange = (appointmentId, newStatus) => {
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    
    // In a real application, you'd make an API call here
    // api.doctor.updateAppointmentStatus(appointmentId, newStatus);
    
    // Close modal if open
    if (isModalOpen && selectedAppointment?.id === appointmentId) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };
  
  const columns = [
    { Header: 'Patient Name', accessor: 'patientName' },
    { Header: 'Patient ID', accessor: 'patientId' },
    { Header: 'Date', accessor: 'appointmentDate' },
    { Header: 'Time', accessor: 'appointmentTime' },
    { Header: 'Type', accessor: 'appointmentType' },
    { 
      Header: 'Status', 
      accessor: 'status',
      Cell: ({ value }) => {
        const statusClasses = {
          'Confirmed': 'status-confirmed',
          'Checked-in': 'status-checked-in',
          'In-progress': 'status-in-progress',
          'Completed': 'status-completed',
          'Cancelled': 'status-cancelled',
          'Scheduled': 'status-scheduled',
          'No-show': 'status-no-show',
        };
        
        return (
          <span className={`status-badge ${statusClasses[value]}`}>
            {value}
          </span>
        );
      }
    },
    {
      Header: 'Actions',
      Cell: ({ row }) => {
        const appointment = row.original;
        return (
          <div className="table-actions">
            <Button 
              label="View"
              variant="secondary"
              onClick={() => handleViewDetails(appointment)}
            />
          </div>
        );
      }
    }
  ];

  return (
    <DoctorLayout>
      <div className="appointments-page">
        <div className="page-header">
          <h1>Appointments</h1>
          <div className="header-actions">
            <Link to="/doctor/schedule" className="btn-secondary">
              View Schedule
            </Link>
          </div>
        </div>
        
        {/* Filter controls */}
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked-in">Checked-in</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No-show</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="date-filter">Date:</label>
            <input
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="filter-date"
            />
          </div>
          
          <div className="filter-group search-group">
            <input
              type="text"
              placeholder="Search by patient name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        {/* Appointments Table */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="empty-state">
            <p>No appointments match your search criteria.</p>
          </div>
        ) : (
          <div className="table-container">
            <Table 
              columns={columns} 
              data={filteredAppointments}
            />
          </div>
        )}
        
        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            title="Appointment Details"
          >
            <div className="appointment-details">
              <div className="detail-row">
                <strong>Patient Name:</strong>
                <span>{selectedAppointment.patientName}</span>
              </div>
              <div className="detail-row">
                <strong>Patient ID:</strong>
                <span>{selectedAppointment.patientId}</span>
              </div>
              <div className="detail-row">
                <strong>Age:</strong>
                <span>{selectedAppointment.patientAge} years</span>
              </div>
              <div className="detail-row">
                <strong>Gender:</strong>
                <span>{selectedAppointment.patientGender}</span>
              </div>
              <div className="detail-row">
                <strong>Date:</strong>
                <span>{selectedAppointment.appointmentDate}</span>
              </div>
              <div className="detail-row">
                <strong>Time:</strong>
                <span>{selectedAppointment.appointmentTime}</span>
              </div>
              <div className="detail-row">
                <strong>Type:</strong>
                <span>{selectedAppointment.appointmentType}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span className={`status-badge ${selectedAppointment.status.toLowerCase()}`}>
                  {selectedAppointment.status}
                </span>
              </div>
              
              <div className="modal-actions">
                <Button
                  label="View Patient Records"
                  variant="secondary"
                  onClick={() => {
                    // Navigate to patient records in a real application
                    // history.push(`/doctor/patients/${selectedAppointment.patientId}`);
                    setIsModalOpen(false);
                  }}
                />
                
                <div className="status-actions">
                  {selectedAppointment.status === 'Scheduled' || selectedAppointment.status === 'Confirmed' ? (
                    <Button
                      label="Check In"
                      variant="primary"
                      onClick={() => handleStatusChange(selectedAppointment.id, 'Checked-in')}
                    />
                  ) : null}
                  
                  {selectedAppointment.status === 'Checked-in' ? (
                    <Button
                      label="Start Session"
                      variant="primary"
                      onClick={() => handleStatusChange(selectedAppointment.id, 'In-progress')}
                    />
                  ) : null}
                  
                  {selectedAppointment.status === 'In-progress' ? (
                    <Button
                      label="Complete"
                      variant="primary"
                      onClick={() => handleStatusChange(selectedAppointment.id, 'Completed')}
                    />
                  ) : null}
                  
                  {selectedAppointment.status !== 'Completed' && 
                   selectedAppointment.status !== 'Cancelled' && 
                   selectedAppointment.status !== 'No-show' ? (
                    <Button
                      label="Cancel"
                      variant="danger"
                      onClick={() => handleStatusChange(selectedAppointment.id, 'Cancelled')}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
      
      
    </DoctorLayout>
  );
};

export default DoctorAppointments;