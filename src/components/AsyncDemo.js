import React, { useState } from 'react';
import { fetchUsersWithPromises, fetchUsersWithAsync, delay } from '../services/api';

const AsyncDemo = ({ onUsersLoaded }) => {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState('');

  // Demonstrate Promise-based approach
  const loadUsersWithPromises = () => {
    setLoading(true);
    setMethod('Promises');
    
    fetchUsersWithPromises()
      .then(users => {
        return delay(1000).then(() => users); // Simulate processing time
      })
      .then(users => {
        onUsersLoaded(users, null);
        setLoading(false);
      })
      .catch(error => {
        onUsersLoaded([], error.message);
        setLoading(false);
      });
  };

  // Demonstrate Async/Await approach
  const loadUsersWithAsync = async () => {
    setLoading(true);
    setMethod('Async/Await');
    
    try {
      const users = await fetchUsersWithAsync();
      await delay(1000); // Simulate processing time
      onUsersLoaded(users, null);
    } catch (error) {
      onUsersLoaded([], error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>Async Operations Demo</h3>
      <p>Choose how to fetch data:</p>
      
      <div style={styles.buttonGroup}>
        <button 
          onClick={loadUsersWithPromises}
          disabled={loading}
          style={{...styles.button, backgroundColor: '#28a745'}}
        >
          Load with Promises
        </button>
        
        <button 
          onClick={loadUsersWithAsync}
          disabled={loading}
          style={{...styles.button, backgroundColor: '#17a2b8'}}
        >
          Load with Async/Await
        </button>
      </div>
      
      {loading && (
        <div style={styles.status}>
          🔄 Loading users using <strong>{method}</strong>...
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
    backgroundColor: '#f8f9fa'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  button: {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  status: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#e7f3ff',
    border: '1px solid #b3d9ff',
    borderRadius: '4px',
    textAlign: 'center'
  }
};

export default AsyncDemo;