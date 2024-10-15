import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return user ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;