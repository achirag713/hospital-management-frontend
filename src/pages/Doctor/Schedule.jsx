import React, { useState, useEffect } from 'react';
import DoctorLayout from '../../layouts/DoctorLayout';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Table from '../../components/common/Table';
import './Schedule.css'; // Assuming you have a CSS file for styling

// Mock data for doctor's schedule
const mockSchedule = {
  availableSlots: [
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '12:00', status: 'active' },
    { id: 2, day: 'Monday', startTime: '14:00', endTime: '17:00', status: 'active' },
    { id: 3, day: 'Tuesday', startTime: '09:00', endTime: '12:00', status: 'active' },
    { id: 4, day: 'Tuesday', startTime: '14:00', endTime: '17:00', status: 'active' },
    { id: 5, day: 'Wednesday', startTime: '09:00', endTime: '12:00', status: 'active' },
    { id: 6, day: 'Thursday', startTime: '14:00', endTime: '17:00', status: 'active' },
    { id: 7, day: 'Friday', startTime: '09:00', endTime: '12:00', status: 'active' },
  ],
  upcomingAppointments: [
    {
      id: 1,
      patientName: 'James Wilson',
      patientId: 101,
      date: '2025-05-01',
      time: '09:30',
      reason: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 2,
      patientName: 'Emily Davis',
      patientId: 102,
      date: '2025-05-01',
      time: '10:15',
      reason: 'Consultation',
      status: 'confirmed'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      patientId: 103,
      date: '2025-05-01',
      time: '11:00',
      reason: 'Check-up',
      status: 'confirmed'
    },
    {
      id: 4,
      patientName: 'Sarah Miller',
      patientId: 104,
      date: '2025-05-02',
      time: '09:30',
      reason: 'New Patient',
      status: 'pending'
    },
    {
      id: 5,
      patientName: 'Michael Brown',
      patientId: 105,
      date: '2025-05-02',
      time: '14:45',
      reason: 'Test Results',
      status: 'confirmed'
    }
  ]
};

// Helper function to get all dates of the current week
const getWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to get Monday
  
  const monday = new Date(today.setDate(diff));
  const weekDates = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push({
      date,
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
      formattedDate: date.toISOString().split('T')[0]
    });
  }
  
  return weekDates;
};

const Schedule = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(null);
  const [activeTab, setActiveTab] = useState('weekly');
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Form states for adding/editing slots
  const [slotForm, setSlotForm] = useState({
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    status: 'active'
  });
  
  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchSchedule = async () => {
    //   try {
    //     const response = await api.doctor.getSchedule(user.id);
    //     setSchedule(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching schedule:', error);
    //     setLoading(false);
    //   }
    // };
    
    // Simulate API call with mock data
    setTimeout(() => {
      setSchedule(mockSchedule);
      setLoading(false);
    }, 800);
    
    setWeekDates(getWeekDates());
  }, [user]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  const handleAddSlot = () => {
    setSelectedSlot(null);
    setSlotForm({
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      status: 'active'
    });
    setIsSlotModalOpen(true);
  };
  
  const handleEditSlot = (slot) => {
    setSelectedSlot(slot);
    setSlotForm({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: slot.status
    });
    setIsSlotModalOpen(true);
  };
  
  const handleDeleteSlot = (slotId) => {
    // In a real app, this would be an API call
    // await api.doctor.deleteScheduleSlot(slotId);
    
    setSchedule({
      ...schedule,
      availableSlots: schedule.availableSlots.filter(slot => slot.id !== slotId)
    });
  };
  
  const handleSlotFormChange = (e) => {
    const { name, value } = e.target;
    setSlotForm({
      ...slotForm,
      [name]: value
    });
  };
  
  const handleSlotFormSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would be an API call
    // if (selectedSlot) {
    //   await api.doctor.updateScheduleSlot(selectedSlot.id, slotForm);
    // } else {
    //   await api.doctor.addScheduleSlot(user.id, slotForm);
    // }
    
    if (selectedSlot) {
      // Update existing slot
      setSchedule({
        ...schedule,
        availableSlots: schedule.availableSlots.map(slot => 
          slot.id === selectedSlot.id ? { ...slot, ...slotForm } : slot
        )
      });
    } else {
      // Add new slot
      const newSlot = {
        id: Date.now(), // Mock ID
        ...slotForm
      };
      
      setSchedule({
        ...schedule,
        availableSlots: [...schedule.availableSlots, newSlot]
      });
    }
    
    setIsSlotModalOpen(false);
  };
  
  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentModalOpen(true);
  };
  
  const handleAppointmentStatusChange = (appointmentId, newStatus) => {
    // In a real app, this would be an API call
    // await api.doctor.updateAppointmentStatus(appointmentId, newStatus);
    
    setSchedule({
      ...schedule,
      upcomingAppointments: schedule.upcomingAppointments.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
      )
    });
    
    setIsAppointmentModalOpen(false);
  };
  
  // Get appointments for the selected date
  const appointmentsForSelectedDate = schedule?.upcomingAppointments.filter(
    appointment => appointment.date === selectedDate
  ) || [];
  
  // Weekly calendar columns configuration for appointments
  const weeklyAppointmentsColumns = weekDates.map(dateInfo => ({
    key: dateInfo.formattedDate,
    title: `${dateInfo.day.substring(0, 3)} (${dateInfo.formattedDate.split('-')[2]})`,
    render: (_, rowData) => {
      const appointment = schedule?.upcomingAppointments.find(
        app => app.date === dateInfo.formattedDate && app.time.startsWith(rowData.time)
      );
      
      if (appointment) {
        return (
          <div 
            className={`appointment-cell ${appointment.status}`}
            onClick={() => handleViewAppointment(appointment)}
          >
            <div className="patient-name">{appointment.patientName}</div>
            <div className="appointment-reason">{appointment.reason}</div>
          </div>
        );
      }
      
      return <div className="empty-cell"></div>;
    }
  }));
  
  // Generate time slots for weekly view (from 9:00 to 17:00 with 30min intervals)
  const timeSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMin = min.toString().padStart(2, '0');
      timeSlots.push({ time: `${formattedHour}:${formattedMin}` });
    }
  }
  
  // Appointments table columns
  const appointmentsColumns = [
    { key: 'time', title: 'Time' },
    { key: 'patientName', title: 'Patient' },
    { key: 'reason', title: 'Reason' },
    { key: 'status', title: 'Status' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, appointment) => (
        <div className="action-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleViewAppointment(appointment)}
          >
            View
          </Button>
        </div>
      )
    }
  ];
  
  // Available slots table columns
  const availableSlotsColumns = [
    { key: 'day', title: 'Day' },
    { key: 'startTime', title: 'Start Time' },
    { key: 'endTime', title: 'End Time' },
    { key: 'status', title: 'Status' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, slot) => (
        <div className="action-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEditSlot(slot)}
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={() => handleDeleteSlot(slot.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];
  
  return (
    <DoctorLayout>
      <div className="doctor-schedule">
        <div className="page-header">
          <h1>My Schedule</h1>
          <Button 
            variant="primary"
            onClick={handleAddSlot}
          >
            Add Availability
          </Button>
        </div>
        
        <div className="schedule-tabs">
          <button
            className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
            onClick={() => handleTabChange('weekly')}
          >
            Weekly View
          </button>
          <button
            className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
            onClick={() => handleTabChange('daily')}
          >
            Daily View
          </button>
          <button
            className={`tab-button ${activeTab === 'availability' ? 'active' : ''}`}
            onClick={() => handleTabChange('availability')}
          >
            Manage Availability
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'weekly' && (
            <div className="weekly-view">
              <div className="week-navigation">
                <Button variant="outline" size="sm">Previous Week</Button>
                <h3>Week of {weekDates[0]?.formattedDate}</h3>
                <Button variant="outline" size="sm">Next Week</Button>
              </div>
              
              <div className="weekly-calendar">
                <table className="schedule-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      {weekDates.map((dateInfo, index) => (
                        <th key={index}>
                          {dateInfo.day.substring(0, 3)} <br/>
                          {dateInfo.formattedDate.split('-')[2]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot, slotIndex) => (
                      <tr key={slotIndex}>
                        <td className="time-cell">{slot.time}</td>
                        {weekDates.map((dateInfo, dayIndex) => {
                          const appointment = schedule?.upcomingAppointments.find(
                            app => app.date === dateInfo.formattedDate && app.time === slot.time
                          );
                          
                          return (
                            <td 
                              key={dayIndex}
                              className={appointment ? `appointment-cell ${appointment.status}` : 'empty-cell'}
                              onClick={() => appointment && handleViewAppointment(appointment)}
                            >
                              {appointment && (
                                <>
                                  <div className="patient-name">{appointment.patientName}</div>
                                  <div className="appointment-reason">{appointment.reason}</div>
                                </>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'daily' && (
            <div className="daily-view">
              <div className="date-selector">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const date = new Date(selectedDate);
                    date.setDate(date.getDate() - 1);
                    setSelectedDate(date.toISOString().split('T')[0]);
                  }}
                >
                  Previous Day
                </Button>
                
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="date-input"
                />
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const date = new Date(selectedDate);
                    date.setDate(date.getDate() + 1);
                    setSelectedDate(date.toISOString().split('T')[0]);
                  }}
                >
                  Next Day
                </Button>
              </div>
              
              <div className="appointments-table">
                <h3>Appointments for {selectedDate}</h3>
                {appointmentsForSelectedDate.length > 0 ? (
                  <Table
                    columns={appointmentsColumns}
                    data={appointmentsForSelectedDate}
                    loading={loading}
                  />
                ) : (
                  <div className="no-appointments">
                    No appointments scheduled for this date.
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'availability' && (
            <div className="availability-management">
              <div className="available-slots-table">
                <h3>Your Available Time Slots</h3>
                <Table
                  columns={availableSlotsColumns}
                  data={schedule?.availableSlots || []}
                  loading={loading}
                  emptyMessage="No availability slots defined"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal for adding/editing availability slots */}
      <Modal
        isOpen={isSlotModalOpen}
        onClose={() => setIsSlotModalOpen(false)}
        title={selectedSlot ? "Edit Availability" : "Add Availability"}
      >
        <form onSubmit={handleSlotFormSubmit} className="slot-form">
          <div className="form-group">
            <label htmlFor="day">Day</label>
            <select
              id="day"
              name="day"
              value={slotForm.day}
              onChange={handleSlotFormChange}
              required
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={slotForm.startTime}
              onChange={handleSlotFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={slotForm.endTime}
              onChange={handleSlotFormChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={slotForm.status}
              onChange={handleSlotFormChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="form-actions">
            <Button variant="outline" type="button" onClick={() => setIsSlotModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedSlot ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </Modal>
      
      {/* Modal for viewing appointment details */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title="Appointment Details"
      >
        {selectedAppointment && (
          <div className="appointment-details">
            <div className="detail-item">
              <span className="detail-label">Patient:</span>
              <span className="detail-value">{selectedAppointment.patientName}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Date:</span>
              <span className="detail-value">{selectedAppointment.date}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Time:</span>
              <span className="detail-value">{selectedAppointment.time}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Reason:</span>
              <span className="detail-value">{selectedAppointment.reason}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Status:</span>
              <span className={`status-badge ${selectedAppointment.status}`}>
                {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
              </span>
            </div>
            
            <div className="appointment-actions">
              <h4>Update Status</h4>
              <div className="status-buttons">
                <Button
                  variant={selectedAppointment.status === 'confirmed' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleAppointmentStatusChange(selectedAppointment.id, 'confirmed')}
                >
                  Confirm
                </Button>
                
                <Button
                  variant={selectedAppointment.status === 'completed' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleAppointmentStatusChange(selectedAppointment.id, 'completed')}
                >
                  Complete
                </Button>
                
                <Button
                  variant={selectedAppointment.status === 'cancelled' ? 'danger' : 'outline'}
                  size="sm"
                  onClick={() => handleAppointmentStatusChange(selectedAppointment.id, 'cancelled')}
                >
                  Cancel
                </Button>
              </div>
            </div>
            
            <div className="patient-record-link">
              <Button variant="outline" size="sm">View Patient Record</Button>
            </div>
          </div>
        )}
      </Modal>
      
      
    </DoctorLayout>
  );
};

export default Schedule;