import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import AsyncDemo from './components/AsyncDemo';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle users loaded from async operations
  const handleUsersLoaded = (loadedUsers, errorMessage) => {
    setUsers(loadedUsers);
    setError(errorMessage);
    setLoading(false);
  };

  // Handle new user created from form
  const handleUserCreated = (newUser) => {
    // Add new user to the beginning of the list
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>🚀 Asynchronous React Demo</h1>
        <p>Demonstrating JSON handling, Form data, Promises, and Async/Await</p>
      </header>

      <main style={styles.main}>
        {/* Async Operations Demo */}
        <AsyncDemo onUsersLoaded={handleUsersLoaded} />
        
        {/* Form with Async Submission */}
        <UserForm onUserCreated={handleUserCreated} />
        
        {/* JSON Data Display */}
        <UserList 
          users={users} 
          loading={loading} 
          error={error} 
        />
      </main>

      <footer style={styles.footer}>
        <p>Built with React • Demonstrates async patterns and JSON handling</p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '8px'
  },
  main: {
    minHeight: '600px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px',
    borderTop: '1px solid #ddd',
    color: '#666'
  }
};

export default App;