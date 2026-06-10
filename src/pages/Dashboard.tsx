import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, walkMeetups } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

import iconCircleRight from '../assets/icon-circle-right.svg';
import iconClock from '../assets/icon-clock.svg';

export default function Dashboard() {
  const context = useContext(AppContext);

  if (!context) return null;
  const { currentUserLabel } = context;

  return (
    <section className="dashboard-shell">
      <header className="dashboard-header">
        <h1>Cześć, {currentUserLabel}!</h1>
      </header>

      <section className="dashboard-action-grid" aria-label="Skróty aplikacji">
        <article className="action-card action-card--gold">
          <span className="action-card__label">Masz</span>
          <strong>12 dopasowań</strong>
          <span className="action-card__arrow">
            <img src={iconCircleRight} alt="Przejdź" />
          </span>
        </article>
        <article className="action-card action-card--orange" onClick={() => navigate('/map')} style={{ cursor: 'pointer' }}>
          <span className="action-card__label">Twoja okolica</span>
          <strong>Mapa</strong>
          <span className="action-card__arrow">
            <img src={iconCircleRight} alt="Przejdź" />
          </span>
        </article>
        <article className="action-card action-card--green" onClick={() => navigate('/search')} style={{ cursor: 'pointer' }}>
          <span className="action-card__label">Znajdź partnera</span>
          <strong>Eksploruj</strong>
          <span className="action-card__arrow">
            <img src={iconCircleRight} alt="Przejdź" />
          </span>
        </article>
      </section>

      <section className="dashboard-section">
        <h2>Umówione spacerki</h2>
        <div className="walk-list">
          {walkMeetups.map((meetup, index) => (
            <article className="walk-card" key={`${meetup.name}-${index}`}>
              <div className="walk-card__avatar">
                {meetup.avatar ? <img src={meetup.avatar} alt={meetup.name} /> : <span>{meetup.initials}</span>}
              </div>
              <div className="walk-card__content">
                <h3>{meetup.name}</h3>
                <p>{meetup.owner}</p>
                <span className="walk-card__time">
                  <img src={iconClock} alt="" className="walk-card__icon" />
                  {meetup.time}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </section>
  );
}