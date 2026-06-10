import React from 'react';
import '../styles/Map.css';

import mapPhoto from '../assets/map-photo.png';
import iconSearch from '../assets/icon-search.svg';
import iconLocation from '../assets/icon-location.svg';
import iconPaw from '../assets/icon-paw.svg';
import iconFavourite from '../assets/icon-favourite.svg';

export default function Map() {
  return (
    <section className="map-shell">
      <div className="map-canvas" style={{ backgroundImage: `url(${mapPhoto})` }}></div>

      <header className="map-header-overlay">
        <img src={iconSearch} alt="" className="map-search-icon-img" style={{ width: '18px', height: '18px', marginRight: '12px' }} />
        <input 
          type="text" 
          className="map-search-input" 
          placeholder="Szukaj parków..." 
        />
      </header>

      <div className="map-pin" style={{ left: '30%', top: '40%' }}>
        <img src={iconPaw} alt="" style={{ width: '18px', height: '18px' }} />
      </div>

      <div className="map-pin map-pin--large" style={{ left: '60%', top: '55%' }}>
        <img src={iconLocation} alt="" style={{ width: '22px', height: '22px' }} />
      </div>

      <article className="map-place-card">
        <div className="map-place-image"></div>
        <div className="map-place-info">
          <div className="map-place-header">
            <h3 className="map-place-title">Park</h3>
            <button className="map-place-fav-btn">
              <img src={iconFavourite} alt="" style={{ width: '20px', height: '18px' }} />
            </button>
          </div>
          <button className="map-place-button">
            Zamelduj się
          </button>
        </div>
      </article>
    </section>
  );
}
