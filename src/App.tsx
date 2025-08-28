import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import CSVConverterPage from './pages/CSVConverterPage';
import Layout from './components/layout/Layout';
import { AuthProvider, useAuth } from './utils/auth';
import './App.css';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route Component (redirect to main page if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } />
          <Route path="/csv-converter" element={
            <Layout>
              <CSVConverterPage />
            </Layout>
          } />
          <Route path="/" element={<Navigate to="/csv-converter" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;