import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';

import { mockedDogs } from '../data/mockedDogs';
import iconFilter from '../assets/icon-filter.svg';
import iconInfo from '../assets/icon-info.svg';
import iconMap from '../assets/icon-map.svg';
import iconCancel from '../assets/icon-cancel.svg';
import iconFavourite from '../assets/icon-favourite.svg';

export default function Search() {
  const navigate = useNavigate();
  const [size, setSize] = useState<'Małe' | 'Średnie' | 'Duże'>('Małe');
  const [gender, setGender] = useState<'Samiczka' | 'Samiec'>('Samiec');
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [likedDogs, setLikedDogs] = useState<Record<string, boolean>>({});

  const filteredDogs = useMemo(
    () => mockedDogs.filter((dog) => dog.size === size && dog.gender === gender),
    [size, gender],
  );

  useEffect(() => {
    setCurrentDogIndex(0);
  }, [size, gender]);

  const currentDog = filteredDogs[currentDogIndex] || null;
  const isLiked = currentDog ? Boolean(likedDogs[currentDog.id]) : false;

  function goNextDog() {
    if (!filteredDogs.length) return;
    setCurrentDogIndex((currentIndex) => (currentIndex + 1) % filteredDogs.length);
  }

  function handleSkip() {
    goNextDog();
  }

  function handleLike() {
    if (!currentDog) return;
    setLikedDogs((prev) => ({
      ...prev,
      [currentDog.id]: !prev[currentDog.id],
    }));
    goNextDog();
  }

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
        <div
          className="search-card-image"
          style={{ backgroundImage: currentDog ? `url(${currentDog.image})` : 'none' }}
        />
        
        <button
          className="search-card-info-btn"
          type="button"
          onClick={() => navigate('/dog-view', { state: { dog: currentDog } })}
          disabled={!currentDog}
        >
          <img src={iconInfo} alt="Info" />
        </button>
        {currentDog ? (
          <div className="search-card-overlay">
            <h1 className="search-card-name">{currentDog.name}</h1>
            <div className="search-card-location">
              <img src={iconMap} alt="" className="search-card-location-icon" />
              {currentDog.location}
            </div>
          </div>
        ) : (
          <div className="search-card-overlay" style={{ justifyContent: 'center' }}>
            <h1 className="search-card-name">Brak psów</h1>
            <p style={{ color: '#FAF6F0', margin: 0 }}>Brak psów dla wybranych filtrów.</p>
          </div>
        )}
      </article>

      <div className="search-actions">
        <button
          className="search-action-btn search-action-btn--cancel"
          type="button"
          onClick={handleSkip}
          disabled={!currentDog}
        >
          <img src={iconCancel} alt="Anuluj" />
        </button>
        <button
          className="search-action-btn search-action-btn--like"
          type="button"
          onClick={handleLike}
          disabled={!currentDog}
        >
          <img src={iconFavourite} alt={isLiked ? 'Polubione' : 'Lubię'} />
        </button>
      </div>
    </section>
  );
}