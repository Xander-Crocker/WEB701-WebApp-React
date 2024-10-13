import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../../jwt-auth/AuthContext';
import ProtectedRoute from '../../jwt-auth/ProtectedRoute';
import App from './App';
import Register from './components/RegisterEditAccount';
import RecordList from './components/RecordList';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/records",
        element: (
          <ProtectedRoute>
            <RecordList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create",
        element: <Register />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);