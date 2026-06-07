import React from 'react';
import logoImg from '../assets/paw-logo.png'; 

export default function PawLogo() {
  return (
    <img 
      src={logoImg} 
      style={{ width: '118px', height: '118px' }}
      alt="Logo PawMatch" 
      className="PawLogo" 
    />
  );
}