import React from 'react';
import logoImg from '../assets/paw-logo.png'; 

export default function PawLogo() {
  return (
    <img 
      src={logoImg} 
      alt="Logo PawMatch" 
      className="paw-logo" 
    />
  );
}