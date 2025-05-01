import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRole } from '../../context/RoleContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { validateEmail } from '../../utils/validationUtils';
import { setToken } from '../../utils/JwtHelper';
import './SignIn.css'; // Import the CSS file

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const { login } = useAuth();
  const { updateRole } = useRole();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
    
    // Clear login error when user types
    if (loginError) {
      setLoginError('');
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Mock API call - in real app, this would be a fetch/axios request to your backend
      // const response = await api.login(formData);
      
      // For demo purposes, using hardcoded data from users.json
      const users = [
        {
          id: 1,
          name: "Admin User",
          email: "admin@hospital.com",
          password: "admin123",
          role: "admin"
        },
        {
          id: 2,
          name: "Dr. John Smith",
          email: "doctor@hospital.com",
          password: "doctor123",
          role: "doctor",
          specialization: "Cardiology",
          experience: "10 years"
        },
        {
          id: 3,
          name: "Patient User",
          email: "patient@example.com",
          password: "patient123",
          role: "patient",
          age: 35,
          bloodGroup: "A+"
        }
      ];
      
      // Find user with matching credentials
      const user = users.find(
        (user) => user.email === formData.email && user.password === formData.password
      );
      
      if (user) {
        // Simulate a JWT token (in real app, this would come from the backend)
        const mockToken = 'mock-jwt-token-' + user.id;
        
        // Store token in localStorage
        setToken(mockToken);
        
        // Update auth context with user data
        login(user);
        
        // Update role context
        updateRole(user.role);
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'doctor') {
          navigate('/doctor/dashboard');
        } else if (user.role === 'patient') {
          navigate('/patient/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="sign-in-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-form-container">
          <h2>Sign In</h2>
          
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="auth-links">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SignIn;
