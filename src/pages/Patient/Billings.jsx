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

  return (
    <PatientLayout>
      <div className="billings-page">
        <h1>Billing Information</h1>
        <p>View and manage your medical bills.</p>

        {loading ? (
          <p>Loading bills...</p>
        ) : bills.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{formatDate(bill.date)}</td>
                    <td>{bill.description}</td>
                    <td>{bill.amount}</td>
                    <td>{bill.status}</td>
                    <td>
                      {bill.status === 'Unpaid' && (
                        <button className="btn btn-primary">Pay Now</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No bills found.</p>
        )}
      </div>

      
    </PatientLayout>
  );
};

export default Billings;