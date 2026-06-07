import React from 'react';
import { useNavigate } from 'react-router-dom';

import iconProfile from '../assets/icon-profile.png';
import iconSearch from '../assets/icon-search.png';
import iconHome from '../assets/icon-home.png';
import iconMessage from '../assets/icon-message.png';
import iconMap from '../assets/icon-map.png';

interface BottomNavProps {
  activeTab: 'profile' | 'dashboard' | 'messages' | 'map' | 'none';
  className?: string;
}

export default function BottomNav({ activeTab, className = '' }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav className={`bottom-nav ${className}`} aria-label="Nawigacja dolna">
      <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => navigate('/user-profile')}>
        <img src={iconProfile} alt="Profil" />
      </button>

      <button onClick={() => navigate('/dashboard')}>
        <img src={iconSearch} alt="Szukaj" />
      </button>

      <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')}>
        <img src={iconHome} alt="Start" />
      </button>

      <button className={activeTab === 'messages' ? 'active' : ''} onClick={() => navigate('/message-list')}>
        <img src={iconMessage} alt="Wiadomości" />
      </button>

      <button className={activeTab === 'map' ? 'active' : ''} onClick={() => navigate('/dashboard')}>
        <img src={iconMap} alt="Mapa" />
      </button>
    </nav>
  );
}