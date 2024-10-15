import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5050/api/user';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // NOTE: 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(token);
        }
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post('/login', { username, password });
            console.log('API Response:', res.data); // Debugging line
            const { token } = res.data;
            if (token) {
                localStorage.setItem('token', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setUser(token);
            } else {
                console.error('Token is undefined in the response');
                console.log('Full API Response:', res); // Log the full response for debugging
                setError('Login failed. No token received.');
            }
        } catch (error) {
            console.error('Login failed', error);
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response:', error.response.data);
                setError(error.response.data.message || 'Login failed. Please check your credentials and try again.');
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error request:', error.request);
                setError('No response from server. Please try again later.');
            } else {
                // Something else happened
                console.error('Error message:', error.message);
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };