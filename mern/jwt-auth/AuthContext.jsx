import React, { createContext, useState, useEffect } from 'react';
import * as jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating tokens

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && typeof token === 'string' && token.split('.').length === 3) { // Ensure token is a valid JWT
            try {
                const decoded = jwtDecode.default(token); // Use jwtDecode default
                setUser(decoded);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }
    }, []);

    const login = (username, password) => {
        // Replace this with actual authentication logic
        const secretKey = process.env.REACT_APP_SECRET_KEY; // Access the secret key from environment variables
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' }); // Generate a token with the username

        if (token && typeof token === 'string' && token.split('.').length === 3) { // Ensure token is a valid JWT
            localStorage.setItem('token', token);
            try {
                const decoded = jwtDecode.default(token); // Use jwtDecode default
                setUser(decoded);
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        } else {
            console.error('Invalid token specified: must be a valid JWT');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };