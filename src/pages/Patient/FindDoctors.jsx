import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../../layouts/PatientLayout';
import './FindDoctors.css'; 

// Mock data for doctors with expanded information for doctor profiles
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    experience: '15 years',
    rating: 4.8,
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    availability: ['Mon', 'Wed', 'Fri'],
    consultationFee: '$150',
    bio: 'Dr. John Smith is a board-certified cardiologist with over 15 years of clinical experience. He specializes in interventional cardiology and has performed over 1,000 cardiac procedures. Dr. Smith completed his medical training at Johns Hopkins University and his cardiology fellowship at Mayo Clinic.',
    education: [
      'MD - Johns Hopkins University School of Medicine',
      'Cardiology Fellowship - Mayo Clinic',
      'Board Certification - American Board of Internal Medicine'
    ],
    languages: ['English', 'Spanish'],
    patientsServed: 5000,
    expertise: ['Heart Disease', 'Coronary Artery Disease', 'Heart Failure', 'Arrhythmias']
  },
  {
    id: 2,
    name: 'Dr. Emily Johnson',
    specialization: 'Neurology',
    experience: '10 years',
    rating: 4.7,
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    availability: ['Tue', 'Thu', 'Sat'],
    consultationFee: '$180',
    bio: 'Dr. Emily Johnson is a highly skilled neurologist with a decade of experience in treating neurological disorders. She has a special interest in epilepsy and multiple sclerosis. Dr. Johnson graduated from Harvard Medical School and completed her residency at Massachusetts General Hospital.',
    education: [
      'MD - Harvard Medical School',
      'Neurology Residency - Massachusetts General Hospital',
      'Board Certification - American Board of Psychiatry and Neurology'
    ],
    languages: ['English', 'French'],
    patientsServed: 3000,
    expertise: ['Epilepsy', 'Multiple Sclerosis', 'Parkinson\'s Disease', 'Stroke']
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    specialization: 'Dermatology',
    experience: '12 years',
    rating: 4.5,
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    availability: ['Mon', 'Tue', 'Thu'],
    consultationFee: '$130',
    bio: 'Dr. Michael Brown is a dermatologist with over 12 years of experience in treating skin conditions. He is an expert in cosmetic dermatology and skin cancer treatment. Dr. Brown received his medical degree from Stanford University and completed his dermatology residency at UCLA.',
    education: [
      'MD - Stanford University School of Medicine',
      'Dermatology Residency - UCLA',
      'Board Certification - American Board of Dermatology'
    ],
    languages: ['English'],
    patientsServed: 4000,
    expertise: ['Acne', 'Eczema', 'Psoriasis', 'Skin Cancer']
  },
  {
    id: 4,
    name: 'Dr. Sarah Wilson',
    specialization: 'Pediatrics',
    experience: '8 years',
    rating: 4.9,
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    availability: ['Wed', 'Fri', 'Sat'],
    consultationFee: '$140',
    bio: 'Dr. Sarah Wilson is a compassionate pediatrician with 8 years of experience in child healthcare. She is dedicated to providing comprehensive care for children of all ages. Dr. Wilson graduated from the University of California, San Francisco, and completed her pediatric residency at Seattle Children\'s Hospital.',
    education: [
      'MD - University of California, San Francisco',
      'Pediatric Residency - Seattle Children\'s Hospital',
      'Board Certification - American Board of Pediatrics'
    ],
    languages: ['English', 'Spanish'],
    patientsServed: 2000,
    expertise: ['Childhood Vaccinations', 'Growth and Development', 'Asthma', 'Allergies']
  },
  {
    id: 5,
    name: 'Dr. Robert Davis',
    specialization: 'Orthopedics',
    experience: '14 years',
    rating: 4.6,
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    availability: ['Mon', 'Wed', 'Fri'],
    consultationFee: '$160',
    bio: 'Dr. Robert Davis is an orthopedic surgeon with 14 years of experience in treating musculoskeletal conditions. He specializes in joint replacement and sports injuries. Dr. Davis completed his medical training at Duke University and his orthopedic residency at the Hospital for Special Surgery.',
    education: [
      'MD - Duke University School of Medicine',
      'Orthopedic Residency - Hospital for Special Surgery',
      'Board Certification - American Board of Orthopedic Surgery'
    ],
    languages: ['English'],
    patientsServed: 3500,
    expertise: ['Joint Replacement', 'Sports Injuries', 'Arthritis', 'Fracture Care']
  },
  {
    id: 6,
    name: 'Dr. Jennifer Lee',
    specialization: 'Ophthalmology',
    experience: '11 years',
    rating: 4.7,
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    availability: ['Tue', 'Thu', 'Sat'],
    consultationFee: '$150',
    bio: 'Dr. Jennifer Lee is an ophthalmologist with 11 years of experience in eye care. She specializes in cataract surgery and glaucoma management. Dr. Lee graduated from Yale School of Medicine and completed her ophthalmology residency at the University of Miami.',
    education: [
      'MD - Yale School of Medicine',
      'Ophthalmology Residency - University of Miami',
      'Board Certification - American Board of Ophthalmology'
    ],
    languages: ['English', 'Chinese'],
    patientsServed: 2500,
    expertise: ['Cataract Surgery', 'Glaucoma', 'Diabetic Retinopathy', 'Macular Degeneration']
  }
];

// Available specializations
const specializations = [
  'All Specializations',
  'Cardiology',
  'Neurology',
  'Dermatology',
  'Pediatrics',
  'Orthopedics',
  'Ophthalmology',
  'Gynecology',
  'Urology'
];

const FindDoctors = () => {
  const navigate = useNavigate();
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    const fetchDoctors = async () => {
      try {
        // In a real app, this would be an API call:
        // const response = await api.patient.getDoctors({ 
        //   search: searchTerm,
        //   specialization: selectedSpecialization !== 'All Specializations' ? selectedSpecialization : null,
        //   sortBy
        // });
        // setDoctors(response.data);
        
        // Using mock data for now
        setTimeout(() => {
          let filteredDoctors = [...mockDoctors];
          
          // Filter by search term
          if (searchTerm) {
            filteredDoctors = filteredDoctors.filter(doctor => 
              doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
          
          // Filter by specialization
          if (selectedSpecialization !== 'All Specializations') {
            filteredDoctors = filteredDoctors.filter(doctor => 
              doctor.specialization === selectedSpecialization
            );
          }
          
          // Sort doctors
          if (sortBy === 'rating') {
            filteredDoctors.sort((a, b) => b.rating - a.rating);
          } else if (sortBy === 'experience') {
            filteredDoctors.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
          }
          
          setDoctors(filteredDoctors);
          setLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, [searchTerm, selectedSpecialization, sortBy]);
  
  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorProfile(true);
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseProfile = () => {
    setShowDoctorProfile(false);
    setSelectedDoctor(null);
    // Restore scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <PatientLayout>
      <div className="find-doctors-page">
        <div className="page-header">
          <h1>Find Doctors</h1>
          <p>Find and view profiles of top doctors in your area</p>
        </div>
        
        {/* Search and Filter */}
        <div className="search-filters">
          <div className="search-box">
            
            <input 
              type="text" 
              placeholder="Search doctors by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>
          
          <div className="filters">
            <div className="filter-group">
              <label>Specialization</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Doctors List */}
        <div className="doctors-list">
          {loading ? (
            <div className="loading">Loading doctors...</div>
          ) : doctors.length === 0 ? (
            <div className="no-results">
              <p>No doctors found matching your criteria.</p>
              <p>Try adjusting your filters or search term.</p>
            </div>
          ) : (
            doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <div className="doctor-card-header">
                  <div className="doctor-image">
                    <img src={doctor.profileImage} alt={doctor.name} />
                  </div>
                  <div className="doctor-info">
                    <h2>{doctor.name}</h2>
                    <p className="doctor-specialization">{doctor.specialization}</p>
                    <p className="doctor-experience">Experience: {doctor.experience}</p>
                    <div className="doctor-rating">
                      <span className="rating-stars">{'★'.repeat(Math.floor(doctor.rating))}</span>
                      <span className="rating-number">{doctor.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="doctor-card-body">
                  <div className="doctor-availability">
                    <h3>Availability</h3>
                    <div className="availability-days">
                      {doctor.availability.map((day, index) => (
                        <span key={index} className="day-badge">{day}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="doctor-card-footer">
                  <button 
                    className="btn-view-profile"
                    onClick={() => handleViewProfile(doctor)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Doctor Profile Modal */}
        {showDoctorProfile && selectedDoctor && (
          <div className="doctor-profile-modal">
            <div className="modal-content">
              <button className="modal-close" onClick={handleCloseProfile}>×</button>
              
              <div className="doctor-profile-header">
                <div className="doctor-profile-image">
                  <img src={selectedDoctor.profileImage} alt={selectedDoctor.name} />
                </div>
                <div className="doctor-profile-info">
                  <h2>{selectedDoctor.name}</h2>
                  <p className="doctor-profile-specialization">{selectedDoctor.specialization}</p>
                  
                  <div className="doctor-profile-badges">
                    <div className="profile-badge">
                      <span>⭐</span>
                      <span>{selectedDoctor.rating} Rating</span>
                    </div>
                    <div className="profile-badge">
                      <span>👨‍⚕️</span>
                      <span>{selectedDoctor.experience} Experience</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="doctor-profile-body">
                <div className="profile-section">
                  <h3>About Doctor</h3>
                  <p className="profile-bio">{selectedDoctor.bio || 'No biography available for this doctor.'}</p>
                </div>
                
                <div className="profile-section">
                  <h3>Education & Qualifications</h3>
                  {selectedDoctor.education ? (
                    <ul>
                      {selectedDoctor.education.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No education information available.</p>
                  )}
                </div>
                
                <div className="profile-section">
                  <h3>Expertise</h3>
                  {selectedDoctor.expertise ? (
                    <div className="availability-days">
                      {selectedDoctor.expertise.map((item, index) => (
                        <span key={index} className="day-badge">{item}</span>
                      ))}
                    </div>
                  ) : (
                    <p>No expertise information available.</p>
                  )}
                </div>
                
                <div className="profile-section">
                  <h3>Languages</h3>
                  <p>{selectedDoctor.languages ? selectedDoctor.languages.join(', ') : 'No language information available.'}</p>
                </div>
                
                <div className="profile-stats">
                  <div className="stat-card">
                    <div className="stat-value">{selectedDoctor.patientsServed || 'N/A'}</div>
                    <div className="stat-label">Patients Served</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{selectedDoctor.experience || 'N/A'}</div>
                    <div className="stat-label">Experience</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{Math.floor(selectedDoctor.rating) || 'N/A'}</div>
                    <div className="stat-label">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default FindDoctors;