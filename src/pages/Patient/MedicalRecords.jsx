import React, { useState, useEffect } from 'react';
import { FaDownload, FaSearch, FaEye, FaPrescriptionBottle } from 'react-icons/fa';
import './MedicalRecords.css';
import PatientLayout from '../../layouts/PatientLayout';
import Modal from '../../components/common/Modal';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [labResults, setLabResults] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch medical records and lab results
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real application, these would be API calls
        // For now, we're using mock data
        const mockMedicalRecords = [
          {
            id: 1,
            date: '2025-04-15',
            doctorName: 'Dr. Sarah Johnson',
            type: 'prescription',
            diagnosis: 'Common Cold',
            medications: [
              {
                name: 'Acetaminophen',
                dosage: '500mg',
                frequency: 'Every 6 hours',
                duration: '3 days'
              },
              {
                name: 'Vitamin C',
                dosage: '1000mg',
                frequency: 'Once daily',
                duration: '7 days'
              }
            ],
            notes: 'Rest well and stay hydrated. Follow-up if symptoms worsen.',
            followUpDate: '2025-04-22'
          },
          {
            id: 2,
            date: '2025-03-22',
            doctorName: 'Dr. Michael Chen',
            type: 'notes',
            diagnosis: 'Seasonal Allergies',
            notes: 'Patient reports increased sneezing and watery eyes. Recommended over-the-counter antihistamines and nasal spray. Follow up in one month if symptoms persist.'
          },
          {
            id: 3,
            date: '2025-02-10',
            doctorName: 'Dr. Lisa Wong',
            type: 'prescription',
            diagnosis: 'Annual Physical',
            medications: [
              {
                name: 'Multivitamin',
                dosage: '1 tablet',
                frequency: 'Once daily',
                duration: 'Ongoing'
              }
            ],
            notes: 'All vitals are normal. Continue with regular exercise and healthy diet. Next check-up in one year.',
            followUpDate: '2026-02-10'
          }
        ];

        const mockLabResults = [
          {
            id: 1,
            date: '2025-04-10',
            testName: 'Complete Blood Count (CBC)',
            requestedBy: 'Dr. Sarah Johnson',
            status: 'Normal',
            fileUrl: 'cbc_results.pdf',
            results: {
              'Red Blood Cells': '5.0 million/mcL',
              'White Blood Cells': '7,500/mcL',
              'Hemoglobin': '14 g/dL',
              'Hematocrit': '42%',
              'Platelets': '250,000/mcL'
            }
          },
          {
            id: 2,
            date: '2025-04-10',
            testName: 'Comprehensive Metabolic Panel',
            requestedBy: 'Dr. Sarah Johnson',
            status: 'Abnormal',
            fileUrl: 'metabolic_panel.pdf',
            results: {
              'Glucose': '110 mg/dL (High)',
              'Calcium': '9.5 mg/dL',
              'Sodium': '140 mEq/L',
              'Potassium': '4.5 mEq/L'
            }
          }
        ];

        setMedicalRecords(mockMedicalRecords);
        setLabResults(mockLabResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadPDF = (fileUrl, testName) => {
    console.log(`Downloading ${testName} PDF file: ${fileUrl}`);
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`;
    downloadLink.download = fileUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const viewRecordDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const filterRecords = (records) => {
    if (!searchTerm) return records;
    const searchLower = searchTerm.toLowerCase();
    return records.filter(record => 
      record.doctorName?.toLowerCase().includes(searchLower) ||
      record.diagnosis?.toLowerCase().includes(searchLower) ||
      record.notes?.toLowerCase().includes(searchLower)
    );
  };

  const renderModalContent = () => {
    if (!selectedRecord) return null;

    return (
      <div className="record-details">
        <h2>Medical Record Details</h2>
        <div className="record-detail-item">
          <span className="label">Date:</span>
          <span className="value">{formatDate(selectedRecord.date)}</span>
        </div>
        <div className="record-detail-item">
          <span className="label">Doctor:</span>
          <span className="value">{selectedRecord.doctorName}</span>
        </div>
        <div className="record-detail-item">
          <span className="label">Type:</span>
          <span className="value">{selectedRecord.type === 'prescription' ? 'Prescription' : 'Medical Notes'}</span>
        </div>
        <div className="record-detail-item">
          <span className="label">Diagnosis:</span>
          <span className="value">{selectedRecord.diagnosis}</span>
        </div>
        
        {selectedRecord.type === 'prescription' && (
          <>
            <div className="record-detail-item medications">
              <span className="label">Medications:</span>
              <div className="medications-list">
                {selectedRecord.medications.map((med, index) => (
                  <div key={index} className="medication-item">
                    <div className="medication-name">{med.name}</div>
                    <div className="medication-details">
                      {med.dosage} - {med.frequency} for {med.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {selectedRecord.followUpDate && (
              <div className="record-detail-item">
                <span className="label">Follow-up Date:</span>
                <span className="value">{formatDate(selectedRecord.followUpDate)}</span>
              </div>
            )}
          </>
        )}
        
        <div className="record-detail-item">
          <span className="label">Notes:</span>
          <span className="value">{selectedRecord.notes}</span>
        </div>
        
        {selectedRecord.type === 'prescription' && (
          <div className="modal-actions">
            <button className="download-btn" onClick={() => handleDownloadPDF('prescription.pdf', 'Prescription')}>
              <FaDownload /> Download Prescription
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <PatientLayout>
      <div className="medical-records-page">
        <div className="page-header">
          <h1>Medical Records</h1>
          <p>View your medical history and lab results</p>
        </div>

        <div className="filters-container">
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'records' ? 'active' : ''}`}
              onClick={() => setActiveTab('records')}
            >
              Medical Records
            </button>
            <button
              className={`tab ${activeTab === 'lab' ? 'active' : ''}`}
              onClick={() => setActiveTab('lab')}
            >
              Lab Results
            </button>
          </div>

          <div className="tab-content">
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="records-grid">
                {activeTab === 'records' ? (
                  filterRecords(medicalRecords).map((record) => (
                    <div className="record-card" key={record.id}>
                      <div className="record-card-header">
                        <span className="record-card-date">{formatDate(record.date)}</span>
                        <span className={`record-card-type ${record.type}`}>
                          {record.type === 'prescription' ? <FaPrescriptionBottle /> : 'Notes'}
                        </span>
                      </div>
                      <div className="record-card-body">
                        <div className="record-card-field">
                          <span className="record-card-label">Doctor</span>
                          <span className="record-card-value">{record.doctorName}</span>
                        </div>
                        <div className="record-card-field">
                          <span className="record-card-label">Diagnosis</span>
                          <span className="record-card-value">{record.diagnosis}</span>
                        </div>
                        {record.type === 'prescription' && (
                          <div className="record-card-field">
                            <span className="record-card-label">Medications</span>
                            <span className="record-card-value">
                              {record.medications.length} medication(s) prescribed
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="record-card-footer">
                        <button
                          className="view-btn"
                          onClick={() => viewRecordDetails(record)}
                        >
                          <FaEye /> View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  filterRecords(labResults).map((result) => (
                    <div className="record-card" key={result.id}>
                      <div className="record-card-header">
                        <span className="record-card-date">{formatDate(result.date)}</span>
                        <span className={`record-card-tag ${result.status.toLowerCase()}`}>
                          {result.status}
                        </span>
                      </div>
                      <div className="record-card-body">
                        <div className="record-card-field">
                          <span className="record-card-label">Test Name</span>
                          <span className="record-card-value">{result.testName}</span>
                        </div>
                        <div className="record-card-field">
                          <span className="record-card-label">Requested By</span>
                          <span className="record-card-value">{result.requestedBy}</span>
                        </div>
                      </div>
                      <div className="record-card-footer">
                        <button
                          className="view-btn"
                          onClick={() => viewRecordDetails(result)}
                        >
                          <FaEye /> View Details
                        </button>
                        <button
                          className="download-btn"
                          onClick={() => handleDownloadPDF(result.fileUrl, result.testName)}
                        >
                          <FaDownload /> Download
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {renderModalContent()}
          </Modal>
        )}
      </div>
    </PatientLayout>
  );
};

export default MedicalRecords;