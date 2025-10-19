// API Service - Demonstrates Promise handling and async/await
const API_BASE = 'https://jsonplaceholder.typicode.com';

// Using Promises - Traditional approach
export const fetchUsersWithPromises = () => {
  return fetch(`${API_BASE}/users`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Promise-based fetch error:', error);
      throw error;
    });
};

// Using Async/Await - Modern approach
export const fetchUsersWithAsync = async () => {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Async/await fetch error:', error);
    throw error;
  }
};

// Create user with form data - Async/Await with POST
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status}`);
    }
    
    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};

// Simulate network delay for demo purposes
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));