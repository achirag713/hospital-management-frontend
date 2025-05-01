import React, { useState, useEffect } from 'react';
import { FaDownload, FaSearch, FaSort, FaSortUp, FaSortDown, FaEye } from 'react-icons/fa';
import './MedicalRecords.css';
import PatientLayout from '../../layouts/PatientLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [labResults, setLabResults] = useState([]);
  
  // New state variables for enhanced features
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
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
            diagnosis: 'Common Cold',
            treatment: 'Rest, fluids, and over-the-counter medication',
            notes: 'Patient should recover within 7-10 days'
          },
          {
            id: 2,
            date: '2025-03-22',
            doctorName: 'Dr. Michael Chen',
            diagnosis: 'Seasonal Allergies',
            treatment: 'Antihistamines daily',
            notes: 'Follow up in one month if symptoms persist'
          },
          {
            id: 3,
            date: '2025-02-10',
            doctorName: 'Dr. Lisa Wong',
            diagnosis: 'Annual Physical',
            treatment: 'No treatment required',
            notes: 'All vitals are normal. Next check-up in one year.'
          },
          // Adding more mock data for pagination demonstration
          {
            id: 4,
            date: '2025-01-05',
            doctorName: 'Dr. Robert Smith',
            diagnosis: 'Influenza',
            treatment: 'Antiviral medication and rest',
            notes: 'Symptoms should improve within 5-7 days'
          },
          {
            id: 5,
            date: '2024-12-18',
            doctorName: 'Dr. Emily Parker',
            diagnosis: 'Migraine',
            treatment: 'Prescribed sumatriptan for acute attacks',
            notes: 'Avoid triggers like bright lights and loud noises'
          },
          {
            id: 6,
            date: '2024-11-30',
            doctorName: 'Dr. Sarah Johnson',
            diagnosis: 'High Blood Pressure',
            treatment: 'Started on lisinopril 10mg daily',
            notes: 'Monitor blood pressure regularly at home'
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
              'Potassium': '4.5 mEq/L',
              'CO2': '24 mEq/L',
              'Chloride': '100 mEq/L',
              'BUN': '15 mg/dL',
              'Creatinine': '1.0 mg/dL',
              'Albumin': '4.0 g/dL',
              'Total Protein': '7.0 g/dL',
              'ALP': '70 U/L',
              'ALT': '20 U/L',
              'AST': '25 U/L',
              'Bilirubin': '0.7 mg/dL'
            }
          },
          {
            id: 3,
            date: '2025-02-05',
            testName: 'Lipid Panel',
            requestedBy: 'Dr. Lisa Wong',
            status: 'Normal',
            fileUrl: 'lipid_panel.pdf',
            results: {
              'Total Cholesterol': '180 mg/dL',
              'HDL': '55 mg/dL',
              'LDL': '100 mg/dL',
              'Triglycerides': '125 mg/dL'
            }
          },
          {
            id: 4,
            date: '2025-02-05',
            testName: 'Thyroid Function Tests',
            requestedBy: 'Dr. Lisa Wong',
            status: 'Normal',
            fileUrl: 'thyroid_test.pdf',
            results: {
              'TSH': '2.5 mIU/L',
              'Free T4': '1.2 ng/dL',
              'Free T3': '3.0 pg/mL'
            }
          },
          {
            id: 5,
            date: '2024-12-10',
            testName: 'Urinalysis',
            requestedBy: 'Dr. Emily Parker',
            status: 'Normal',
            fileUrl: 'urinalysis.pdf',
            results: {
              'Color': 'Yellow',
              'Clarity': 'Clear',
              'pH': '6.0',
              'Protein': 'Negative',
              'Glucose': 'Negative',
              'Ketones': 'Negative',
              'Blood': 'Negative',
              'WBC': '0-2/hpf',
              'RBC': '0-2/hpf'
            }
          },
          {
            id: 6,
            date: '2024-11-25',
            testName: 'Vitamin D',
            requestedBy: 'Dr. Sarah Johnson',
            status: 'Abnormal',
            fileUrl: 'vitamin_d.pdf',
            results: {
              'Vitamin D, 25-OH': '20 ng/mL (Low)'
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

  const handleDownloadPDF = (fileUrl, testName) => {
    // In a real application, this would trigger a download of the actual PDF file
    // For now, we'll just log a message
    console.log(`Downloading ${testName} PDF file: ${fileUrl}`);
    
    // Create a mock download by generating a blank PDF and downloading it
    const downloadLink = document.createElement('a');
    downloadLink.href = `data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`;
    downloadLink.download = fileUrl;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Sort function for both medical records and lab results
  const sortData = (data) => {
    return [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  // Handle sorting when a column header is clicked
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon for a column
  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort />;
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSortField('date');
    setSortDirection('desc');
  };

  // View record details
  const viewRecordDetails = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // View lab result details
  const viewLabResultDetails = (result) => {
    setSelectedRecord(result);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Filter records by search term
  const filterRecords = (records) => {
    return records.filter(record => {
      const matchesSearch = 
        record.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (record.testName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        record.date.includes(searchTerm);
      
      return matchesSearch;
    });
  };

  const filteredMedicalRecords = filterRecords(medicalRecords);
  const sortedMedicalRecords = sortData(filteredMedicalRecords);
  
  const filteredLabResults = filterRecords(labResults);
  const sortedLabResults = sortData(filteredLabResults);

  // Render modal content for record details
  const renderModalContent = () => {
    if (!selectedRecord) return null;
    
    if (selectedRecord.diagnosis) {
      // Medical record details
      return (
        <div className="record-details">
          <h3>Medical Record Details</h3>
          <div className="detail-row">
            <span className="detail-label">Date:</span> 
            <span className="detail-value">{selectedRecord.date}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Doctor:</span> 
            <span className="detail-value">{selectedRecord.doctorName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Diagnosis:</span> 
            <span className="detail-value">{selectedRecord.diagnosis}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Treatment:</span> 
            <span className="detail-value">{selectedRecord.treatment}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Notes:</span> 
            <span className="detail-value">{selectedRecord.notes}</span>
          </div>
        </div>
      );
    } else {
      // Lab result details
      return (
        <div className="record-details">
          <h3>Lab Result Details</h3>
          <div className="detail-row">
            <span className="detail-label">Date:</span> 
            <span className="detail-value">{selectedRecord.date}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Test:</span> 
            <span className="detail-value">{selectedRecord.testName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Requested By:</span> 
            <span className="detail-value">{selectedRecord.requestedBy}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span> 
            <span className={`status-badge ${selectedRecord.status.toLowerCase()}`}>
              {selectedRecord.status}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Results:</span>
          </div>
          <div className="results-table">
            <table>
              <thead>
                <tr>
                  <th>Test</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedRecord.results).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="detail-actions">
            <Button 
              label="Download PDF" 
              onClick={() => handleDownloadPDF(selectedRecord.fileUrl, selectedRecord.testName)}
              icon={<FaDownload />}
            />
          </div>
        </div>
      );
    }
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
              <input
                type="text"
                className="search-input"
                placeholder="Search by doctor, diagnosis, test name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </div>
            
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'records' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('records');
              }}
            >
              Medical Records
            </button>
            <button
              className={`tab ${activeTab === 'lab-results' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('lab-results');
              }}
            >
              Lab Results
            </button>
          </div>

          <div className="tab-content">
            {loading ? (
              <div className="loading">Loading data...</div>
            ) : (
              <>
                {activeTab === 'records' && (
                  <>
                    {sortedMedicalRecords.length === 0 ? (
                      <div className="no-data">No medical records found</div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th onClick={() => handleSort('date')} className="sortable-header">
                                  Date {getSortIcon('date')}
                                </th>
                                <th onClick={() => handleSort('doctorName')} className="sortable-header">
                                  Doctor {getSortIcon('doctorName')}
                                </th>
                                <th onClick={() => handleSort('diagnosis')} className="sortable-header">
                                  Diagnosis {getSortIcon('diagnosis')}
                                </th>
                                <th>Treatment</th>
                                <th>Notes</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedMedicalRecords.map((record) => (
                                <tr key={record.id}>
                                  <td>{record.date}</td>
                                  <td>{record.doctorName}</td>
                                  <td>{record.diagnosis}</td>
                                  <td>{record.treatment}</td>
                                  <td>{record.notes}</td>
                                  <td>
                                    <button
                                      className="view-btn"
                                      onClick={() => viewRecordDetails(record)}
                                      title="View Details"
                                    >
                                      <FaEye />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </>
                )}

                {activeTab === 'lab-results' && (
                  <>
                    {sortedLabResults.length === 0 ? (
                      <div className="no-data">No lab results found</div>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th onClick={() => handleSort('date')} className="sortable-header">
                                  Date {getSortIcon('date')}
                                </th>
                                <th onClick={() => handleSort('testName')} className="sortable-header">
                                  Test {getSortIcon('testName')}
                                </th>
                                <th onClick={() => handleSort('requestedBy')} className="sortable-header">
                                  Requested By {getSortIcon('requestedBy')}
                                </th>
                                <th onClick={() => handleSort('status')} className="sortable-header">
                                  Status {getSortIcon('status')}
                                </th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedLabResults.map((result) => (
                                <tr key={result.id}>
                                  <td>{result.date}</td>
                                  <td>{result.testName}</td>
                                  <td>{result.requestedBy}</td>
                                  <td>
                                    <span className={`status-badge ${result.status.toLowerCase()}`}>
                                      {result.status}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="action-buttons">
                                      <button
                                        className="view-btn"
                                        onClick={() => viewLabResultDetails(result)}
                                        title="View Details"
                                      >
                                        <FaEye />
                                      </button>
                                      <button
                                        className="download-btn"
                                        onClick={() => handleDownloadPDF(result.fileUrl, result.testName)}
                                        title="Download PDF"
                                      >
                                        <FaDownload />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={selectedRecord?.diagnosis ? "Medical Record Details" : "Lab Result Details"}
          >
            {renderModalContent()}
          </Modal>
        )}
      </div>
    </PatientLayout>
  );
};

export default MedicalRecords;