import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // NOTE: 
    useEffect(() => {
        const token = localStorage.getItem('token');
        //Ensure token is a valid JWT
        if (token && typeof token === 'string' && token.split('.').length === 3) { 
            try {
                
                setUser(token);
                console.log("Here is the token>>"+token);  
            } catch (error) {
                console.error('Failed to decode token', error);
            } 
        }
    }, []);

    const login = (token) => {
        
        // Ensure token is a valid JWT
        if (token && typeof token === 'string' && token.split('.').length === 3) { 
            localStorage.setItem('token', token);
            try {
                
                setUser(token);
            } catch (error) {
                console.error('Not able to set user token', error);
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