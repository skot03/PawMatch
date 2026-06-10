import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import iconProfile from '../assets/icon-profile.svg';
import iconSearch from '../assets/icon-search.svg';
import iconHome from '../assets/icon-home.svg';
import iconMessage from '../assets/icon-message.svg';
import iconMap from '../assets/icon-map.svg';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/user-profile') return 'profile';
    if (path === '/search') return 'search';
    if (path === '/dashboard') return 'dashboard';
    if (path === '/message-list') return 'messages';
    if (path === '/map') return 'map';
    return 'none';
  };

  const activeTab = getActiveTab();

  return (
    <nav className="bottom-nav" aria-label="Nawigacja dolna">
      <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => navigate('/user-profile')}>
        <img src={iconProfile} alt="Profil" />
      </button>

      <button className={activeTab === 'search' ? 'active' : ''} onClick={() => navigate('/search')}>
        <img src={iconSearch} alt="Szukaj" />
      </button>

      <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')}>
        <img src={iconHome} alt="Start" />
      </button>

      <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => navigate('/message-list')}>
        <img src={iconMessage} alt="Wiadomości" />
      </button>

      <button className={activeTab === 'map' ? 'active' : ''} onClick={() => navigate('/map')}>
        <img src={iconMap} alt="Mapa" />
      </button>
    </nav>
  );
}