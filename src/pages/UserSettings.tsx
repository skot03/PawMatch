import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import '../styles/UserSettings.css';

import iconArrowLeft from '../assets/icon-arrow-left.svg';
import iconEdit from '../assets/icon-edit.svg';

export default function UserSettings() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { currentProfile, sessionEmail, setProfiles } = context;

  const [displayName, setDisplayName] = useState(currentProfile?.displayName || '');
  const [about, setAbout] = useState(currentProfile?.about || '');

  useEffect(() => {
    if (currentProfile) {
      setDisplayName(currentProfile.displayName);
      setAbout(currentProfile.about);
    }
  }, [currentProfile]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionEmail) return;

    setProfiles((prev) => ({
      ...prev,
      [sessionEmail]: {
        ...prev[sessionEmail],
        displayName,
        about
      }
    }));

    navigate('/user-profile');
  }

  return (
    <section className="user-settings-shell">
      <header className="user-settings-header">
        <button className="back-btn" onClick={() => navigate('/user-profile')}>
          <img src={iconArrowLeft} alt="Powrót" />
        </button>
      </header>

      <div className="user-settings-content">
        <div className="avatar-edit-container">
          <div className="avatar-edit-circle">
            <div style={{ width: '100%', height: '100%', background: '#E8E8E8' }}></div>
          </div>
          <div className="avatar-edit-badge">
            <img src={iconEdit} alt="Edytuj" />
          </div>
        </div>

        <form className="settings-form" onSubmit={handleSave}>
          <div className="settings-field">
            <label className="settings-label">Nazwa użytkownika</label>
            <input
              type="text"
              className="settings-input"
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Anna Kowalska"
            />
          </div>

          <div className="settings-field">
            <label className="settings-label">O mnie</label>
            <textarea
              className="settings-textarea"
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Placeholder"
            />
          </div>

          <button type="submit" className="settings-submit-btn">
            Zapisz
          </button>
        </form>
      </div>
    </section>
  );
}
