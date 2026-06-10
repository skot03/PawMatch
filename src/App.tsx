import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ReactGA from "react-ga4";
import Hotjar from "@hotjar/browser";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DogProfile from './pages/DogProfile';
import UserProfile from './pages/UserProfile';
import MessageList from './pages/MessageList';
import Search from './pages/Search';
import Map from './pages/Map';
import UserSettings from './pages/UserSettings';
import BottomNav from './components/BottomNav';
import AnalyticsListener from "./components/AnalyticsListener";

ReactGA.initialize("G-BNELMWTGHS");

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>Ładowanie...</div>;
  if (!user) return <Navigate to="/" replace />;

  return (
    <>
      {children}
      <BottomNav />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const siteId = 870384;
    const hotjarVersion = 6;

    Hotjar.init(siteId, hotjarVersion);
  }, []);

  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AnalyticsListener />

          <main className="page-shell">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
              <Route path="/map" element={<PrivateRoute><Map /></PrivateRoute>} />
              <Route path="/dog-profile" element={<PrivateRoute><DogProfile /></PrivateRoute>} />
              <Route path="/user-profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
              <Route path="/user-settings" element={<PrivateRoute><UserSettings /></PrivateRoute>} />
              <Route path="/message-list" element={<PrivateRoute><MessageList /></PrivateRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}