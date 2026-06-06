import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activeTab: 'profile' | 'dashboard' | 'none';
  className?: string;
}

export default function BottomNav({ activeTab, className = '' }: BottomNavProps) {
  const navigate = useNavigate();

  return (
    <nav className={`bottom-nav ${className}`} aria-label="Nawigacja dolna">
      <button type="button" className={activeTab === 'profile' ? 'active' : ''} onClick={() => navigate('/user-profile')}>
        👤
      </button>
      <button type="button">⌕</button>
      <button type="button" className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')}>
        ⌂
      </button>
      <button type="button">▭</button>
      <button type="button">⌂⌂</button>
    </nav>
  );
}