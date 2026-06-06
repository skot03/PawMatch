import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, walkMeetups } from '../context/AppContext';
import BottomNav from '../components/BottomNav';

export default function Dashboard() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { currentUserLabel, handleLogout } = context;

  return (
    <section className="dashboard-shell">
      <header className="dashboard-header">
        <h1>Cześć, {currentUserLabel}!</h1>
        <p>Masz teraz dostęp do swoich dopasowań, mapy i spacerów.</p>
      </header>

      <section className="dashboard-action-grid" aria-label="Skróty aplikacji">
        <article className="action-card action-card--gold">
          <span className="action-card__label">Masz</span>
          <strong>12 dopasowań</strong>
          <span className="action-card__arrow">→</span>
        </article>
        <article className="action-card action-card--orange">
          <span className="action-card__label">Twoja okolica</span>
          <strong>Mapa</strong>
          <span className="action-card__arrow">→</span>
        </article>
        <article className="action-card action-card--green">
          <span className="action-card__label">Znajdź partnera</span>
          <strong>Eksploruj</strong>
          <span className="action-card__arrow">→</span>
        </article>
      </section>

      <section className="dashboard-section dashboard-section--actions">
        <button className="secondary-dashboard-button" type="button" onClick={() => navigate('/user-profile')}>
          Mój profil
        </button>
        <button className="secondary-dashboard-button" type="button" onClick={() => navigate('/dog-profile')}>
          Uzupełnij profil psa
        </button>
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
                <span>◔ {meetup.time}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BottomNav activeTab="dashboard" />

      <button className="logout-link" type="button" onClick={() => { handleLogout(); navigate('/'); }}>
        Wyloguj się
      </button>
    </section>
  );
}