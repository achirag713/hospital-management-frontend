import axios from 'axios';
import { getToken } from '../utils/JwtHelper';

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific error status codes
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          window.location.href = '/signin';
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const auth = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

// Admin endpoints
export const admin = {
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  getDoctors: () => api.get('/admin/doctors'),
  addDoctor: (data) => api.post('/admin/doctors', data),
  updateDoctor: (id, data) => api.put(`/admin/doctors/${id}`, data),
  deleteDoctor: (id) => api.delete(`/admin/doctors/${id}`),
  getPatients: () => api.get('/admin/patients'),
  addPatient: (data) => api.post('/admin/patients', data),
  updatePatient: (id, data) => api.put(`/admin/patients/${id}`, data),
  deletePatient: (id) => api.delete(`/admin/patients/${id}`),
  getAppointments: () => api.get('/admin/appointments'),
  updateAppointment: (id, data) => api.put(`/admin/appointments/${id}`, data),
};

// Doctor endpoints
export const doctor = {
  getDashboardStats: () => api.get('/doctor/dashboard/stats'),
  getMyPatients: () => api.get('/doctor/my-patients'),
  getAppointments: () => api.get('/doctor/appointments'),
  updateAppointmentStatus: (id, status) =>
    api.put(`/doctor/appointments/${id}/status`, { status }),
  addPrescription: (data) => api.post('/doctor/prescriptions', data),
  getPrescriptions: (patientId) =>
    api.get(`/doctor/prescriptions?patientId=${patientId}`),
};

// Patient endpoints
export const patient = {
  getDashboardStats: () => api.get('/patient/dashboard/stats'),
  getDoctors: (query) => api.get('/patient/doctors', { params: query }),
  bookAppointment: (data) => api.post('/patient/appointments', data),
  getAppointments: () => api.get('/patient/appointments'),
  cancelAppointment: (id) => api.delete(`/patient/appointments/${id}`),
  getMedicalRecords: () => api.get('/patient/medical-records'),
  getBillings: () => api.get('/patient/billings'),
  payBill: (id) => api.post(`/patient/billings/${id}/pay`),
};

// User profile endpoints
export const profile = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  changePassword: (data) => api.put('/profile/password', data),
  uploadAvatar: (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;