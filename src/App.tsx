import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DogProfile from './pages/DogProfile';
import UserProfile from './pages/UserProfile';
import MessageList from './pages/MessageList';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dog-profile" element={<DogProfile />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/message-list" element={<MessageList />} />
          </Routes>
        </main>
      </AppProvider>
    </BrowserRouter>
  );
}