import React from 'react';
import { useNavigate } from 'react-router-dom';
import { dogAvatarDataUri } from '../context/AppContext';
import '../styles/DogProfile.css';

const mockedDog = {
  name: 'Burek',
  breed: 'Border Collie',
  age: '3 lata',
  weight: '18 kg',
  gender: 'Samiec',
  energy: 'Wysoki',
  location: 'Warszawa, Mokotów',
  description:
    'Burek to wulkan energii, który kocha długie spacery po lesie i aportowanie. Jest niezwykle inteligentny i szybko uczy się nowych sztuczek. Szuka towarzysza, który dotrzyma mu kroku podczas porannych przebieżek.',
};

export default function DogProfileView() {
  const navigate = useNavigate();

  return (
    <section className="dog-profile-view-shell">
      <button className="dog-profile-view-back" type="button" onClick={() => navigate('/search')}>
        ← Powrót
      </button>

      <article className="dog-profile-view-hero">
        <div
          className="dog-profile-view-hero-image"
          style={{ backgroundImage: `url(${dogAvatarDataUri()})` }}
        />
        <div className="dog-profile-view-hero-overlay">
          <div>
            <h1>{mockedDog.name}</h1>
            <p className="dog-profile-view-location">{mockedDog.location}</p>
          </div>
        </div>
      </article>

      <div className="dog-profile-view-attrs">
        <article className="dog-profile-view-attr-card">
          <span>Rasa</span>
          <strong>{mockedDog.breed}</strong>
        </article>
        <article className="dog-profile-view-attr-card">
          <span>Waga</span>
          <strong>{mockedDog.weight}</strong>
        </article>
        <article className="dog-profile-view-attr-card">
          <span>Płeć</span>
          <strong>{mockedDog.gender}</strong>
        </article>
      </div>

      <section className="dog-profile-view-section">
        <h2>O mnie</h2>
        <p>{mockedDog.description}</p>
      </section>

      <section className="dog-profile-view-section">
        <h2>Cechy charakteru</h2>
        <div className="dog-profile-view-tags">
          <span className="dog-profile-view-tag">Energiczny</span>
          <span className="dog-profile-view-tag">Przyjacielski</span>
          <span className="dog-profile-view-tag">Inteligentny</span>
          <span className="dog-profile-view-tag">Ciekawski</span>
        </div>
      </section>
    </section>
  );
}
