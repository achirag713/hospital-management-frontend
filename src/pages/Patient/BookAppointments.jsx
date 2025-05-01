import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PatientLayout from '../../layouts/PatientLayout';
import { formatDate } from '../../utils/dateUtils';
import './BookAppointments.css';

// Available departments
const departments = [
  'Cardiology',
  'Neurology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Ophthalmology',
  'Gynecology',
  'Urology',
  'Dentistry',
  'Psychology'
];

// Mock data for doctors by department
const mockDoctorsByDepartment = {
  Cardiology: [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      consultationFee: '$150',
    },
    {
      id: 7,
      name: 'Dr. Patricia Miller',
      specialization: 'Cardiology',
      profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
      consultationFee: '$160',
    }
  ],
  Neurology: [
    {
      id: 2,
      name: 'Dr. Emily Johnson',
      specialization: 'Neurology',
      profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      consultationFee: '$180',
    }
  ],
  Dermatology: [
    {
      id: 3,
      name: 'Dr. Michael Brown',
      specialization: 'Dermatology',
      profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
      consultationFee: '$130',
    }
  ],
  Pediatrics: [
    {
      id: 4,
      name: 'Dr. Sarah Wilson',
      specialization: 'Pediatrics',
      profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
      consultationFee: '$140',
    }
  ],
  Orthopedics: [
    {
      id: 5,
      name: 'Dr. Robert Davis',
      specialization: 'Orthopedics',
      profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
      consultationFee: '$160',
    }
  ],
  Ophthalmology: [
    {
      id: 6,
      name: 'Dr. Jennifer Lee',
      specialization: 'Ophthalmology',
      profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
      consultationFee: '$150',
    }
  ],
  Gynecology: [
    {
      id: 8,
      name: 'Dr. Lisa Adams',
      specialization: 'Gynecology',
      profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
      consultationFee: '$170',
    }
  ],
  Urology: [
    {
      id: 9,
      name: 'Dr. David Clark',
      specialization: 'Urology',
      profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
      consultationFee: '$165',
    }
  ],
  Dentistry: [
    {
      id: 10,
      name: 'Dr. Jessica White',
      specialization: 'Dentistry',
      profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
      consultationFee: '$120',
    }
  ],
  Psychology: [
    {
      id: 11,
      name: 'Dr. Mark Robinson',
      specialization: 'Psychology',
      profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
      consultationFee: '$135',
    }
  ]
};

// Mock existing appointments to prevent double booking
const mockExistingAppointments = [
  { doctorId: 1, date: '2025-05-02', time: '09:00 AM' },
  { doctorId: 2, date: '2025-05-02', time: '10:00 AM' },
  { doctorId: 3, date: '2025-05-03', time: '11:30 AM' },
  { doctorId: 4, date: '2025-05-04', time: '02:00 PM' },
  { doctorId: 5, date: '2025-05-05', time: '03:30 PM' },
  { doctorId: 1, date: '2025-05-05', time: '09:30 AM' },
  { doctorId: 2, date: '2025-05-06', time: '01:00 PM' },
];

// Generate dates for the next 7 days
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

// Generate time slots and filter out booked ones
const generateTimeSlots = (date, doctorId) => {
  // Base time slots
  const morningSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
  const afternoonSlots = ['01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'];
  const eveningSlots = ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'];
  
  // Different time slots for different dates to simulate real availability
  const day = new Date(date).getDay();
  
  let availableSlots = [];
  
  if (day === 0) { // Sunday
    availableSlots = morningSlots.slice(2); // Limited morning hours
  } else if (day === 6) { // Saturday
    availableSlots = [...morningSlots, ...afternoonSlots.slice(0, 2)]; // Morning and early afternoon
  } else if (day % 2 === 0) { // Even weekdays
    availableSlots = [...morningSlots, ...afternoonSlots, ...eveningSlots];
  } else { // Odd weekdays
    availableSlots = [...morningSlots.slice(1), ...afternoonSlots, ...eveningSlots.slice(0, 3)];
  }
  
  // Filter out already booked slots
  return availableSlots.filter(time => {
    // Check if this time slot is already booked for this doctor on this date
    return !mockExistingAppointments.some(
      appointment => 
        appointment.doctorId === doctorId && 
        appointment.date === date && 
        appointment.time === time
    );
  });
};

const BookAppointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [step, setStep] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [appointmentReason, setAppointmentReason] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setAvailableDates(generateAvailableDates());
  }, []);
  
  // When department changes, update available doctors
  useEffect(() => {
    if (selectedDepartment) {
      setAvailableDoctors(mockDoctorsByDepartment[selectedDepartment] || []);
      setSelectedDoctor(null);
    } else {
      setAvailableDoctors([]);
    }
  }, [selectedDepartment]);
  
  // When date or doctor changes, update available time slots
  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      const slots = generateTimeSlots(selectedDate, selectedDoctor.id);
      setAvailableTimeSlots(slots);
      setSelectedTime(''); // Reset selected time when date or doctor changes
      
      // If no slots are available, show error message
      if (slots.length === 0) {
        setErrorMessage('No available time slots for this date. Please select another date.');
      } else {
        setErrorMessage('');
      }
    }
  }, [selectedDate, selectedDoctor]);
  
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
    setStep(2);
  };
  
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(3);
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setErrorMessage(''); // Clear any previous error messages
  };
  
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Check if this slot is already booked (double check to prevent race conditions)
    const isSlotBooked = mockExistingAppointments.some(
      appointment => 
        appointment.doctorId === selectedDoctor.id && 
        appointment.date === selectedDate && 
        appointment.time === selectedTime
    );
    
    if (isSlotBooked) {
      setErrorMessage('Sorry, this slot was just booked by another patient. Please select a different time.');
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call:
      // try {
      //   await api.patient.bookAppointment({
      //     doctorId: selectedDoctor.id,
      //     date: selectedDate,
      //     time: selectedTime,
      //     type: appointmentType,
      //     reason: appointmentReason
      //   });
      //   setSuccessMessage('Your appointment has been successfully booked!');
      // } catch (error) {
      //   console.error('Error booking appointment:', error);
      // }
      
      // Add the new appointment to our mock data to prevent double booking
      mockExistingAppointments.push({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime
      });
      
      setSuccessMessage('Your appointment has been successfully booked!');
      setLoading(false);
      
      // Reset form after submission
      setTimeout(() => {
        navigate('/patient/my-bookings');
      }, 3000);
    }, 1500);
  };

  return (
    <PatientLayout>
      <div className="book-appointments-page">
        <div className="page-header">
          <h1>Book an Appointment</h1>
          <p>Schedule your appointment with our top specialists</p>
        </div>
        
        {successMessage ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Appointment Booked!</h2>
            <p>{successMessage}</p>
            <p>Redirecting to your appointments...</p>
          </div>
        ) : (
          <div className="booking-container">
            <div className="booking-steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-text">Select Department</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-text">Select Doctor</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-text">Choose Date & Time</div>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${step >= 4 ? 'active' : ''}`}>
                <div className="step-number">4</div>
                <div className="step-text">Appointment Details</div>
              </div>
            </div>
            
            <div className="booking-form">
              {/* Step 1: Select Department */}
              {step === 1 && (
                <div className="step-content">
                  <h2>Select a Department</h2>
                  <div className="departments-grid">
                    {departments.map((department) => (
                      <div 
                        key={department} 
                        className={`department-card ${selectedDepartment === department ? 'selected' : ''}`}
                        onClick={() => handleDepartmentSelect(department)}
                      >
                        <div className="department-icon">
                          {/* Simple department icons using emoji */}
                          {department === 'Cardiology' && '❤️'}
                          {department === 'Neurology' && '🧠'}
                          {department === 'Dermatology' && '🧬'}
                          {department === 'Pediatrics' && '👶'}
                          {department === 'Orthopedics' && '🦴'}
                          {department === 'Ophthalmology' && '👁️'}
                          {department === 'Gynecology' && '👩'}
                          {department === 'Urology' && '🧪'}
                          {department === 'Dentistry' && '🦷'}
                          {department === 'Psychology' && '🧠'}
                        </div>
                        <h3>{department}</h3>
                      </div>
                    ))}
                  </div>
                  <div className="step-buttons">
                    <button 
                      className="btn-next"
                      onClick={() => handleNextStep()}
                      disabled={!selectedDepartment}
                    >
                      Next: Select Doctor
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Select Doctor */}
              {step === 2 && (
                <div className="step-content">
                  <h2>Select a Doctor from {selectedDepartment}</h2>
                  <div className="doctors-grid">
                    {availableDoctors.map((doctor) => (
                      <div 
                        key={doctor.id} 
                        className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                        onClick={() => handleDoctorSelect(doctor)}
                      >
                        <div className="doctor-image">
                          <img src={doctor.profileImage} alt={doctor.name} />
                        </div>
                        <div className="doctor-info">
                          <h3>{doctor.name}</h3>
                          <p className="specialization">{doctor.specialization}</p>
                          <p className="fee">{doctor.consultationFee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="step-buttons">
                    <button 
                      className="btn-back"
                      onClick={handlePreviousStep}
                    >
                      Back: Select Department
                    </button>
                    <button 
                      className="btn-next"
                      onClick={handleNextStep}
                      disabled={!selectedDoctor}
                    >
                      Next: Choose Date & Time
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Choose Date & Time */}
              {step === 3 && (
                <div className="step-content">
                  <h2>Choose Date & Time</h2>
                  
                  <div className="doctor-selected">
                    <div className="doctor-avatar">
                      <img src={selectedDoctor.profileImage} alt={selectedDoctor.name} />
                    </div>
                    <div className="doctor-details">
                      <h3>{selectedDoctor.name}</h3>
                      <p>{selectedDoctor.specialization}</p>
                    </div>
                  </div>
                  
                  {errorMessage && (
                    <div className="error-message">
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  
                  <div className="date-selection">
                    <h3>Select Date</h3>
                    <div className="date-grid">
                      {availableDates.map((date) => (
                        <button
                          key={date}
                          className={`date-btn ${selectedDate === date ? 'selected' : ''}`}
                          onClick={() => handleDateSelect(date)}
                        >
                          <span className="day">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                          <span className="date">{new Date(date).getDate()}</span>
                          <span className="month">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedDate && availableTimeSlots.length > 0 && (
                    <div className="time-selection">
                      <h3>Select Time</h3>
                      <div className="time-grid">
                        {availableTimeSlots.map((time) => (
                          <button
                            key={time}
                            className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="step-buttons">
                    <button 
                      className="btn-back"
                      onClick={handlePreviousStep}
                    >
                      Back: Select Doctor
                    </button>
                    <button 
                      className="btn-next"
                      onClick={handleNextStep}
                      disabled={!selectedDate || !selectedTime}
                    >
                      Next: Appointment Details
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Appointment Details */}
              {step === 4 && (
                <div className="step-content">
                  <h2>Appointment Details</h2>
                  
                  <div className="appointment-summary">
                    <div className="summary-item">
                      <span className="label">Department:</span>
                      <span className="value">{selectedDepartment}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Doctor:</span>
                      <span className="value">{selectedDoctor.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Date:</span>
                      <span className="value">{formatDate(selectedDate)}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Time:</span>
                      <span className="value">{selectedTime}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Fee:</span>
                      <span className="value">{selectedDoctor.consultationFee}</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="appointmentType">Appointment Type</label>
                      <select
                        id="appointmentType"
                        value={appointmentType}
                        onChange={(e) => setAppointmentType(e.target.value)}
                        required
                      >
                        <option value="consultation">Consultation</option>
                        <option value="follow-up">Follow-up</option>
                        <option value="procedure">Procedure</option>
                        <option value="checkup">Regular Check-up</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="appointmentReason">Reason for Appointment</label>
                      <textarea
                        id="appointmentReason"
                        value={appointmentReason}
                        onChange={(e) => setAppointmentReason(e.target.value)}
                        placeholder="Please describe your symptoms or reason for visit"
                        rows="4"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="payment-info">
                      <p>Payment will be collected at the hospital during your visit.</p>
                    </div>
                    
                    <div className="step-buttons">
                      <button 
                        className="btn-back"
                        type="button"
                        onClick={handlePreviousStep}
                      >
                        Back: Choose Date & Time
                      </button>
                      <button 
                        className="btn-confirm"
                        type="submit"
                        disabled={loading || !appointmentReason}
                      >
                        {loading ? 'Confirming...' : 'Confirm Appointment'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default BookAppointments;