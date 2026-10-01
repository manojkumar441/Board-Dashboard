import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Schedules from '../pages/Schedules';
import Users from '../pages/Users';
import Settings from '../pages/Settings';
import ProtectedRoute from '../components/common/ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/schedules"
        element={
          <ProtectedRoute>
            <Schedules />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
