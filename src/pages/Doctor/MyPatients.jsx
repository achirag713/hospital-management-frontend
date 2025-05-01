import React, { useState, useEffect } from 'react';
import DoctorLayout from '../../layouts/DoctorLayout';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import { useAuth } from '../../context/AuthContext';
import './MyPatients.css'; // Assuming you have a CSS file for styling

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'James Wilson',
    age: 45,
    gender: 'Male',
    phone: '(555) 123-4567',
    email: 'james.wilson@example.com',
    lastVisit: '2025-04-15',
    condition: 'Hypertension',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Emily Davis',
    age: 32,
    gender: 'Female',
    phone: '(555) 234-5678',
    email: 'emily.davis@example.com',
    lastVisit: '2025-04-10',
    condition: 'Migraine',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    phone: '(555) 345-6789',
    email: 'robert.johnson@example.com',
    lastVisit: '2025-04-01',
    condition: 'Diabetes Type 2',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Sarah Miller',
    age: 29,
    gender: 'Female',
    phone: '(555) 456-7890',
    email: 'sarah.miller@example.com',
    lastVisit: '2025-03-22',
    condition: 'Anxiety',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Michael Brown',
    age: 64,
    gender: 'Male',
    phone: '(555) 567-8901',
    email: 'michael.brown@example.com',
    lastVisit: '2025-03-15',
    condition: 'Arthritis',
    status: 'Referred'
  }
];

// Mock medical history data
const mockMedicalHistory = {
  1: [
    {
      id: 1,
      date: '2025-04-15',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      notes: 'Blood pressure reading 140/90. Follow-up in 30 days.'
    },
    {
      id: 2,
      date: '2025-03-01',
      diagnosis: 'Common Cold',
      treatment: 'Rest and fluids. Tylenol for fever.',
      notes: 'Symptoms include sore throat, cough, and mild fever.'
    },
    {
      id: 3,
      date: '2024-11-10',
      diagnosis: 'Annual Physical',
      treatment: 'None',
      notes: 'All vitals normal. Cholesterol slightly elevated.'
    }
  ],
  2: [
    {
      id: 1,
      date: '2025-04-10',
      diagnosis: 'Migraine',
      treatment: 'Prescribed Sumatriptan as needed',
      notes: 'Patient reports increasing frequency of migraines. Recommended lifestyle changes and keeping a headache diary.'
    },
    {
      id: 2,
      date: '2025-02-15',
      diagnosis: 'Migraine Follow-up',
      treatment: 'Continued current medication',
      notes: 'Some improvement. Discussed potential triggers.'
    }
  ],
  3: [
    {
      id: 1,
      date: '2025-04-01',
      diagnosis: 'Diabetes Type 2',
      treatment: 'Metformin 500mg twice daily',
      notes: 'HbA1c at 7.8%. Weight management program discussed.'
    },
    {
      id: 2,
      date: '2025-01-15',
      diagnosis: 'Diabetes Check',
      treatment: 'Continued medication',
      notes: 'Blood sugar levels still elevated. Emphasized dietary changes.'
    },
    {
      id: 3,
      date: '2024-10-01',
      diagnosis: 'Diabetes Type 2 Diagnosis',
      treatment: 'Initial Metformin prescription, dietary counseling',
      notes: 'HbA1c at 8.2%. Patient education on blood sugar monitoring provided.'
    }
  ],
  4: [
    {
      id: 1,
      date: '2025-03-22',
      diagnosis: 'Anxiety',
      treatment: 'Prescribed Sertraline 50mg daily',
      notes: 'Patient reports increased anxiety due to work stress. Recommended therapy in addition to medication.'
    }
  ],
  5: [
    {
      id: 1,
      date: '2025-03-15',
      diagnosis: 'Arthritis',
      treatment: 'Pain management and physical therapy',
      notes: 'Referred to rheumatologist for specialized care.'
    },
    {
      id: 2,
      date: '2025-02-01',
      diagnosis: 'Joint Pain',
      treatment: 'Anti-inflammatory medication',
      notes: 'Initial assessment. X-rays ordered.'
    }
  ]
};

const MyPatients = () => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call filtered by the logged-in doctor
    // const fetchPatients = async () => {
    //   try {
    //     const response = await api.doctor.getMyPatients(user.id);
    //     setPatients(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching patients:', error);
    //     setLoading(false);
    //   }
    // };
    
    // Simulating API call with mock data
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);
  }, [user]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewPatient = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setMedicalHistory(mockMedicalHistory[patientId] || []);
      setNotes('');
      setActiveTab('details');
      setIsModalOpen(true);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddNotes = () => {
    if (!notes.trim()) return;
    
    // In a real app, this would be an API call
    // api.doctor.addPatientNotes(selectedPatient.id, { notes, date: new Date() })
    
    const newHistoryEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      diagnosis: 'Follow-up visit',
      treatment: 'See notes',
      notes: notes
    };
    
    setMedicalHistory([newHistoryEntry, ...medicalHistory]);
    setNotes('');
  };

  const filteredPatients = patients.filter(patient => {
    const searchLower = searchTerm.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.email.toLowerCase().includes(searchLower) ||
      patient.condition.toLowerCase().includes(searchLower)
    );
  });

  const columns = [
    { key: 'name', title: 'Patient Name' },
    { key: 'age', title: 'Age' },
    { key: 'gender', title: 'Gender' },
    { key: 'phone', title: 'Phone' },
    { key: 'lastVisit', title: 'Last Visit' },
    { key: 'condition', title: 'Condition' },
    { key: 'status', title: 'Status' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, patient) => (
        <div className="action-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleViewPatient(patient.id)}
          >
            View Details
          </Button>
        </div>
      )
    }
  ];

  return (
    <DoctorLayout>
      <div className="my-patients">
        <div className="page-header">
          <h1>My Patients</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="patients-table">
          <Table
            columns={columns}
            data={filteredPatients}
            loading={loading}
            emptyMessage="No patients found"
          />
        </div>
        
        {selectedPatient && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`Patient: ${selectedPatient.name}`}
            size="large"
          >
            <div className="patient-modal-content">
              <div className="modal-tabs">
                <button
                  className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => handleTabChange('details')}
                >
                  Patient Details
                </button>
                <button
                  className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => handleTabChange('history')}
                >
                  Medical History
                </button>
                <button
                  className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`}
                  onClick={() => handleTabChange('notes')}
                >
                  Add Notes
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'details' && (
                  <div className="patient-details">
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Full Name:</span>
                        <span className="detail-value">{selectedPatient.name}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Age:</span>
                        <span className="detail-value">{selectedPatient.age} years</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Gender:</span>
                        <span className="detail-value">{selectedPatient.gender}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Phone:</span>
                        <span className="detail-value">{selectedPatient.phone}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">{selectedPatient.email}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Last Visit:</span>
                        <span className="detail-value">{selectedPatient.lastVisit}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Condition:</span>
                        <span className="detail-value">{selectedPatient.condition}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Status:</span>
                        <span className="detail-value">{selectedPatient.status}</span>
                      </div>
                    </div>
                    
                    <div className="actions">
                      <Button 
                        variant="outline" 
                        onClick={() => handleTabChange('notes')}
                      >
                        Add Notes
                      </Button>
                      <Button variant="primary">Schedule Appointment</Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'history' && (
                  <div className="medical-history">
                    {medicalHistory.length > 0 ? (
                      <div className="history-list">
                        {medicalHistory.map((entry) => (
                          <div key={entry.id} className="history-entry">
                            <div className="history-entry-header">
                              <span className="history-date">{entry.date}</span>
                              <span className="history-diagnosis">{entry.diagnosis}</span>
                            </div>
                            <div className="history-entry-body">
                              <div className="history-treatment">
                                <strong>Treatment:</strong> {entry.treatment}
                              </div>
                              <div className="history-notes">
                                <strong>Notes:</strong> {entry.notes}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-history">No medical history available</div>
                    )}
                  </div>
                )}
                
                {activeTab === 'notes' && (
                  <div className="add-notes">
                    <div className="form-group">
                      <label htmlFor="notes">Medical Notes</label>
                      <textarea
                        id="notes"
                        rows="5"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter your medical notes here..."
                      />
                    </div>
                    <Button 
                      variant="primary" 
                      onClick={handleAddNotes} 
                      disabled={!notes.trim()}
                    >
                      Save Notes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
      
      
    </DoctorLayout>
  );
};

export default MyPatients;