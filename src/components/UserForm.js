import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission with async/await
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Demonstrate async/await with form data
      const newUser = await createUser(formData);
      
      // Show success state
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '' });
      
      // Notify parent component
      if (onUserCreated) {
        onUserCreated(newUser);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      // Error handling
      setError(err.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Create New User (Async Form Submission)</h3>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.field}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.field}>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{...styles.button, opacity: loading ? 0.6 : 1}}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
      
      {/* Success/Error Messages */}
      {success && (
        <div style={styles.success}>
          ✅ User created successfully!
        </div>
      )}
      
      {error && (
        <div style={styles.error}>
          ❌ Error: {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ddd',
    padding: '20px',
    margin: '20px 0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  success: {
    padding: '10px',
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
    borderRadius: '4px',
    marginTop: '10px'
  },
  error: {
    padding: '10px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '4px',
    marginTop: '10px'
  }
};

export default UserForm;