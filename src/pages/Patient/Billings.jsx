import React, { useState, useEffect } from 'react';
import PatientLayout from '../../layouts/PatientLayout';
import { formatDate } from '../../utils/dateUtils';
import './Billings.css'; // Import the CSS file for styling

// Mock data for billing
const mockBills = [
  {
    id: 1,
    date: '2023-04-20',
    amount: '$200',
    description: 'Consultation with Dr. Smith',
    status: 'Paid',
  },
  {
    id: 2,
    date: '2023-04-15',
    amount: '$150',
    description: 'Follow-up with Dr. Johnson',
    status: 'Unpaid',
  },
];

const Billings = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchBills = async () => {
      try {
        // In a real app, replace this with an API call
        // const response = await api.get('/patient/bills');
        setBills(mockBills);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bills:', error);
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'unpaid':
        return 'status-pending';
      case 'overdue':
        return 'status-overdue';
      default:
        return 'status-pending';
    }
  };

  return (
    <PatientLayout>
      <div className="billings-page">
        <h1>Billing Information</h1>
        <p>View and manage your medical bills.</p>

        {loading ? (
          <div className="loading">Loading bills...</div>
        ) : bills.length > 0 ? (
          <div className="billings-grid">
            {bills.map((bill) => (
              <div className="billing-card" key={bill.id}>
                <div className="billing-header">
                  <span className="billing-id">#{bill.id}</span>
                  <span className="billing-date">{formatDate(bill.date)}</span>
                </div>
                <div className="billing-details">
                  <div className="billing-item">
                    <span className="billing-label">Description</span>
                    <span className="billing-value">{bill.description}</span>
                  </div>
                  <div className="billing-item">
                    <span className="billing-label">Amount</span>
                    <span className="billing-amount">{bill.amount}</span>
                  </div>
                  <span className={`billing-status ${getStatusClass(bill.status)}`}>
                    {bill.status}
                  </span>
                </div>
                <div className="billing-actions">
                  {bill.status === 'Unpaid' && (
                    <button className="btn-primary">Pay Now</button>
                  )}
                  <button className="btn-primary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">No bills found.</div>
        )}
      </div>
    </PatientLayout>
  );
};

export default Billings;