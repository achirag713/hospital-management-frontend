import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import './Schedule.css'; // Assuming you have a CSS file for styling

// Mock data for doctors
const mockDoctors = [
  { id: 1, name: 'Dr. John Smith', specialization: 'Cardiology' },
  { id: 2, name: 'Dr. Emily Johnson', specialization: 'Neurology' },
  { id: 3, name: 'Dr. David Wilson', specialization: 'Orthopedics' },
  { id: 4, name: 'Dr. Sarah Brown', specialization: 'Pediatrics' },
  { id: 5, name: 'Dr. Michael Lee', specialization: 'Dermatology' },
];

// Mock data for schedules
const mockSchedules = [
  { 
    id: 1, 
    doctorId: 1, 
    dayOfWeek: 'Monday', 
    startTime: '09:00', 
    endTime: '17:00', 
    breakStartTime: '13:00', 
    breakEndTime: '14:00',
    status: 'active'
  },
  { 
    id: 2, 
    doctorId: 1, 
    dayOfWeek: 'Wednesday', 
    startTime: '10:00', 
    endTime: '18:00', 
    breakStartTime: '13:30', 
    breakEndTime: '14:30',
    status: 'active'
  },
  { 
    id: 3, 
    doctorId: 1, 
    dayOfWeek: 'Friday', 
    startTime: '09:00', 
    endTime: '17:00', 
    breakStartTime: '12:30', 
    breakEndTime: '13:30',
    status: 'active'
  },
  { 
    id: 4, 
    doctorId: 2, 
    dayOfWeek: 'Tuesday', 
    startTime: '08:00', 
    endTime: '16:00', 
    breakStartTime: '12:00', 
    breakEndTime: '13:00',
    status: 'active'
  },
  { 
    id: 5, 
    doctorId: 2, 
    dayOfWeek: 'Thursday', 
    startTime: '08:00', 
    endTime: '16:00', 
    breakStartTime: '12:00', 
    breakEndTime: '13:00',
    status: 'active'
  },
  { 
    id: 6, 
    doctorId: 3, 
    dayOfWeek: 'Monday', 
    startTime: '10:00', 
    endTime: '18:00', 
    breakStartTime: '14:00', 
    breakEndTime: '15:00',
    status: 'active'
  },
  { 
    id: 7, 
    doctorId: 3, 
    dayOfWeek: 'Wednesday', 
    startTime: '10:00', 
    endTime: '18:00', 
    breakStartTime: '14:00', 
    breakEndTime: '15:00',
    status: 'active'
  },
  { 
    id: 8, 
    doctorId: 3, 
    dayOfWeek: 'Friday', 
    startTime: '09:00', 
    endTime: '15:00', 
    breakStartTime: '12:00', 
    breakEndTime: '13:00',
    status: 'active'
  },
];

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);
  const [formData, setFormData] = useState({
    doctorId: '',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
    breakStartTime: '13:00',
    breakEndTime: '14:00',
    status: 'active',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const doctorsResponse = await api.admin.getDoctors();
        // const schedulesResponse = await api.admin.getSchedules();
        
        // Using mock data for now
        setTimeout(() => {
          setDoctors(mockDoctors);
          setSchedules(mockSchedules);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId === 'all' ? null : parseInt(doctorId));
  };

  const filteredSchedules = selectedDoctor 
    ? schedules.filter(schedule => schedule.doctorId === selectedDoctor)
    : schedules;

  const handleAddNew = () => {
    setCurrentSchedule(null);
    setFormData({
      doctorId: selectedDoctor || '',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      breakStartTime: '13:00',
      breakEndTime: '14:00',
      status: 'active',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (scheduleId) => {
    const schedule = schedules.find(s => s.id === scheduleId);
    if (schedule) {
      setCurrentSchedule(schedule);
      setFormData({
        doctorId: schedule.doctorId,
        dayOfWeek: schedule.dayOfWeek,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        breakStartTime: schedule.breakStartTime,
        breakEndTime: schedule.breakEndTime,
        status: schedule.status,
      });
      setErrors({});
      setIsModalOpen(true);
    }
  };

  const handleDelete = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      // In a real app, this would be an API call
      // api.admin.deleteSchedule(scheduleId)
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.doctorId) {
      newErrors.doctorId = 'Doctor is required';
    }
    
    if (!formData.startTime || !formData.endTime) {
      newErrors.time = 'Start and end times are required';
    } else if (formData.startTime >= formData.endTime) {
      newErrors.time = 'End time must be after start time';
    }
    
    if (formData.breakStartTime && formData.breakEndTime) {
      if (formData.breakStartTime >= formData.breakEndTime) {
        newErrors.break = 'Break end time must be after break start time';
      }
      
      if (formData.breakStartTime < formData.startTime || formData.breakEndTime > formData.endTime) {
        newErrors.break = 'Break time must be within working hours';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (currentSchedule) {
      // Update existing schedule
      // In a real app, this would be an API call
      // api.admin.updateSchedule(currentSchedule.id, formData)
      
      setSchedules(schedules.map(schedule => 
        schedule.id === currentSchedule.id ? { ...schedule, ...formData } : schedule
      ));
    } else {
      // Add new schedule
      // In a real app, this would be an API call
      // api.admin.addSchedule(formData)
      
      const newSchedule = {
        id: Date.now(),
        ...formData,
        doctorId: parseInt(formData.doctorId),
      };
      
      setSchedules([...schedules, newSchedule]);
    }
    
    setIsModalOpen(false);
  };

  const renderDoctorName = (doctorId) => {
    const doctor = doctors.find(doctor => doctor.id === doctorId);
    return doctor ? doctor.name : '';
  };

  const columns = [
    { 
      key: 'doctorName', 
      title: 'Doctor', 
      render: (_, schedule) => renderDoctorName(schedule.doctorId)
    },
    { key: 'dayOfWeek', title: 'Day' },
    { 
      key: 'time', 
      title: 'Working Hours', 
      render: (_, schedule) => `${schedule.startTime} - ${schedule.endTime}`
    },
    { 
      key: 'break', 
      title: 'Break Time', 
      render: (_, schedule) => `${schedule.breakStartTime} - ${schedule.breakEndTime}`
    },
    { key: 'status', title: 'Status' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, schedule) => (
        <div className="action-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEdit(schedule.id)}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => handleDelete(schedule.id)}
          >
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
        {currentSchedule ? 'Update Schedule' : 'Add Schedule'}
      </Button>
    </>
  );

  return (
    <AdminLayout>
      <div className="admin-schedule">
        <div className="page-header">
          <h1>Doctor Schedules</h1>
          <Button variant="primary" onClick={handleAddNew}>
            Add New Schedule
          </Button>
        </div>
        
        <div className="doctor-filter">
          <label htmlFor="doctor-select">Filter by Doctor:</label>
          <select 
            id="doctor-select"
            value={selectedDoctor || 'all'}
            onChange={(e) => handleDoctorSelect(e.target.value)}
          >
            <option value="all">All Doctors</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>
        
        <div className="schedule-table">
          <Table
            columns={columns}
            data={filteredSchedules}
            loading={loading}
            emptyMessage="No schedules found"
          />
        </div>
        
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={currentSchedule ? 'Edit Schedule' : 'Add New Schedule'}
          footer={modalFooter}
        >
          <form className="schedule-form">
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
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
              {errors.doctorId && <div className="error-message">{errors.doctorId}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dayOfWeek">Day of Week</label>
              <select
                id="dayOfWeek"
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleChange}
              >
                {daysOfWeek.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startTime">Start Time</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className={errors.time ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endTime">End Time</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className={errors.time ? 'error' : ''}
                />
              </div>
            </div>
            {errors.time && <div className="error-message">{errors.time}</div>}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="breakStartTime">Break Start Time</label>
                <input
                  type="time"
                  id="breakStartTime"
                  name="breakStartTime"
                  value={formData.breakStartTime}
                  onChange={handleChange}
                  className={errors.break ? 'error' : ''}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="breakEndTime">Break End Time</label>
                <input
                  type="time"
                  id="breakEndTime"
                  name="breakEndTime"
                  value={formData.breakEndTime}
                  onChange={handleChange}
                  className={errors.break ? 'error' : ''}
                />
              </div>
            </div>
            {errors.break && <div className="error-message">{errors.break}</div>}
            
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="vacation">Vacation</option>
              </select>
            </div>
          </form>
        </Modal>
      </div>
      
      
    </AdminLayout>
  );
};

export default Schedule;