import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import './Appointments.css';

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-03-15',
    time: '10:00 AM',
    type: 'General Checkup',
    status: 'Scheduled',
    notes: 'Regular health checkup',
    patientId: 1,
    doctorId: 2
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    doctorName: 'Dr. Michael Brown',
    date: '2024-03-14',
    time: '2:30 PM',
    type: 'Follow-up',
    status: 'Completed',
    notes: 'Post-surgery follow-up',
    patientId: 2,
    doctorId: 3
  },
  {
    id: 3,
    patientName: 'Robert Wilson',
    doctorName: 'Dr. Emily Davis',
    date: '2024-03-13',
    time: '11:15 AM',
    type: 'Consultation',
    status: 'Cancelled',
    notes: 'Patient requested cancellation',
    patientId: 3,
    doctorId: 4
  }
];

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await api.admin.getAppointments();
        // setAppointments(response.data);
        
        // Using mock data for now
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsViewModalOpen(true);
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        // TODO: Replace with actual API call
        // await api.admin.cancelAppointment(appointmentId);
        setAppointments(appointments.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: 'Cancelled' }
            : appointment
        ));
      } catch (error) {
        console.error('Error cancelling appointment:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'scheduled';
      case 'completed':
        return 'completed';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} className="appointment-card">
      <div className="appointment-header">
        <div className="appointment-info">
          <h3>{appointment.type}</h3>
          <span className={`status-badge ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
        </div>
        <div className="appointment-actions">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleViewAppointment(appointment)}
          >
            View Details
          </Button>
          {appointment.status !== 'Cancelled' && appointment.status !== 'Completed' && (
            <Button 
              variant="warning" 
              size="sm"
              onClick={() => handleCancelAppointment(appointment.id)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
      
      <div className="appointment-details">
        <div className="detail-row">
          <div className="detail-item">
            <strong>Patient:</strong>
            <span>{appointment.patientName}</span>
          </div>
          <div className="detail-item">
            <strong>Doctor:</strong>
            <span>{appointment.doctorName}</span>
          </div>
        </div>
        
        <div className="detail-row">
          <div className="detail-item">
            <strong>Date:</strong>
            <span>{appointment.date}</span>
          </div>
          <div className="detail-item">
            <strong>Time:</strong>
            <span>{appointment.time}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointmentDetails = () => {
    if (!selectedAppointment) return null;

    return (
      <div className="appointment-details-modal">
        <div className="detail-section">
          <h4>Appointment Information</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Type:</strong>
              <span>{selectedAppointment.type}</span>
            </div>
            <div className="detail-item">
              <strong>Status:</strong>
              <span className={`status-badge ${getStatusColor(selectedAppointment.status)}`}>
                {selectedAppointment.status}
              </span>
            </div>
            <div className="detail-item">
              <strong>Date:</strong>
              <span>{selectedAppointment.date}</span>
            </div>
            <div className="detail-item">
              <strong>Time:</strong>
              <span>{selectedAppointment.time}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h4>Patient Information</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Name:</strong>
              <span>{selectedAppointment.patientName}</span>
            </div>
            <div className="detail-item">
              <strong>ID:</strong>
              <span>{selectedAppointment.patientId}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h4>Doctor Information</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>Name:</strong>
              <span>{selectedAppointment.doctorName}</span>
            </div>
            <div className="detail-item">
              <strong>ID:</strong>
              <span>{selectedAppointment.doctorId}</span>
            </div>
          </div>
        </div>

        {selectedAppointment.notes && (
          <div className="detail-section">
            <h4>Notes</h4>
            <p className="notes">{selectedAppointment.notes}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="admin-appointments">
        <div className="page-header">
          <h1>Appointments</h1>
        </div>

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search appointments..."
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
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading appointments...</p>
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map(renderAppointmentCard)}
          </div>
        )}

        {/* View Appointment Modal */}
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedAppointment(null);
          }}
          title="Appointment Details"
          footer={
            <div className="modal-footer">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedAppointment(null);
                }}
              >
                Close
              </Button>
            </div>
          }
        >
          <div className="modal-content">
            {renderAppointmentDetails()}
          </div>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;