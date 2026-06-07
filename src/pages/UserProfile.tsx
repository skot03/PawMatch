import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, dogAvatarDataUri } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import ProfileAvatar from '../components/ProfileAvatar';

export default function UserProfile() {
  const context = useContext(AppContext);
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  if (!context) return null;
  const { currentProfile, handleDeleteAccount } = context;

  if (!currentProfile) {
    return (
      <section className="user-profile-shell">
        <p>Brak aktywnej sesji profilu. Zaloguj się.</p>
        <button className="primary-button" onClick={() => navigate('/')}>Do logowania</button>
      </section>
    );
  }

  return (
    <section className="user-profile-shell">
      <header className="user-profile-header">
        <ProfileAvatar />
        <h1>{currentProfile.displayName}</h1>
        <button className="inline-link inline-link--header" type="button" onClick={() => navigate('/dog-profile')}>
          Edytuj profil
        </button>
      </header>

      <section className="profile-block">
        <h2>O mnie</h2>
        <p>{currentProfile.about}</p>
      </section>

      <section className="profile-block">
        <div className="profile-block__row">
          <h2>Moje psy</h2>
          <button className="pill-button" type="button" onClick={() => navigate('/dog-profile')}>
            + Dodaj psa
          </button>
        </div>

        <div className="dog-list">
          {currentProfile.dogs.length ? (
            currentProfile.dogs.map((dog, index) => (
              <article className="dog-profile-card" key={`${dog.name}-${index}`}>
                <div className="dog-profile-card__avatar">
                  <img src={dogAvatarDataUri()} alt={dog.name} />
                </div>
                <div className="dog-profile-card__content">
                  <h3>{dog.name}</h3>
                  <button className="pill-button pill-button--wide" type="button" onClick={() => navigate('/dog-profile')}>
                    Edytuj profil
                  </button>
                </div>
              </article>
            ))
          ) : (
            <article className="dog-profile-card dog-profile-card--empty">
              <div className="dog-profile-card__avatar dog-profile-card__avatar--empty">+</div>
              <div className="dog-profile-card__content">
                <h3>Brak psa w profilu</h3>
                <p>Dodaj pierwszego psa, aby zacząć łączyć się z innymi właścicielami.</p>
              </div>
            </article>
          )}
        </div>
      </section>

      <div className="profile-divider" />

      <div className="profile-actions">
        <button className="primary-button" type="button" onClick={async () => { await logout(); navigate('/'); }}>
          Wyloguj
        </button>
        <button className="secondary-button" type="button" onClick={async () => { await handleDeleteAccount(); navigate('/'); }}>
          Usuń konto
        </button>
      </div>

    </section>
  );
}