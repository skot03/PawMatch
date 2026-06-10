import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';

import iconFilter from '../assets/icon-filter.svg';
import iconInfo from '../assets/icon-info.svg';
import iconMap from '../assets/icon-map.svg';
import iconCancel from '../assets/icon-cancel.svg';
import iconFavourite from '../assets/icon-favourite.svg';

export default function Search() {
  const navigate = useNavigate();
  const [size, setSize] = useState<'Małe' | 'Średnie' | 'Duże'>('Małe');
  const [gender, setGender] = useState<'Samiczka' | 'Samiec'>('Samiec');

  return (
    <section className="search-shell">
      <div className="filters-container">
        <h2 className="filters-title">
          Filtry
          <img src={iconFilter} alt="" />
        </h2>

        <div className="filter-group">
          <span className="filter-label">Wielkość</span>
          <div className="filter-options">
            {(['Małe', 'Średnie', 'Duże'] as const).map((opt) => (
              <button
                key={opt}
                className={`filter-option ${size === opt ? 'filter-option--active' : ''}`}
                onClick={() => setSize(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Płeć</span>
          <div className="filter-options">
            {(['Samiczka', 'Samiec'] as const).map((opt) => (
              <button
                key={opt}
                className={`filter-option ${gender === opt ? 'filter-option--active' : ''}`}
                onClick={() => setGender(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Zasięg 15km</span>
          <div className="range-slider">
            <div className="range-line"></div>
            <div className="range-handle"></div>
          </div>
        </div>
      </div>

      <article className="search-card">
        <div className="search-card-image"></div>
        
        <button className="search-card-info-btn" type="button" onClick={() => navigate('/dog-view')}>
          <img src={iconInfo} alt="Info" />
        </button>
        
        <div className="search-card-overlay">
          <h1 className="search-card-name">Burek</h1>
          <div className="search-card-location">
            <img src={iconMap} alt="" className="search-card-location-icon" />
            Warszawa, Mokotów
          </div>
        </div>
      </article>

      <div className="search-actions">
        <button className="search-action-btn search-action-btn--cancel">
          <img src={iconCancel} alt="Anuluj" />
        </button>
        <button className="search-action-btn search-action-btn--like">
          <img src={iconFavourite} alt="Lubię" />
        </button>
      </div>
    </section>
  );
}