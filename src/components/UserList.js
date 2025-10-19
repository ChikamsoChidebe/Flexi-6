import React from 'react';

const UserList = ({ users, loading, error }) => {
  if (loading) {
    return (
      <div style={styles.container}>
        <h3>Users (JSON Data Display)</h3>
        <div style={styles.loading}>🔄 Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h3>Users (JSON Data Display)</h3>
        <div style={styles.error}>
          ❌ Error loading users: {error}
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3>Users (JSON Data Display)</h3>
      <div style={styles.userGrid}>
        {users.map(user => (
          <div key={user.id} style={styles.userCard}>
            <h4>{user.name}</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Website:</strong> {user.website || 'N/A'}</p>
            <div style={styles.address}>
              <strong>Address:</strong>
              <span>
                {user.address ? 
                  `${user.address.street}, ${user.address.city}` : 
                  'Not provided'
                }
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {users.length === 0 && (
        <div style={styles.empty}>
          No users found.
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
    borderRadius: '8px'
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '18px',
    color: '#666'
  },
  error: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: '4px'
  },
  userGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px'
  },
  userCard: {
    border: '1px solid #e0e0e0',
    padding: '15px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  empty: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
    fontStyle: 'italic'
  }
};

export default UserList;