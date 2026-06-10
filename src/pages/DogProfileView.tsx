import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  traits: ['Energiczny', 'Przyjacielski', 'Inteligentny', 'Ciekawski'],
};

export default function DogProfileView() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateDog = (location.state as { dog?: typeof mockedDog } | null)?.dog;
  const dog = stateDog ?? mockedDog;

  return (
    <section className="dog-profile-view-shell">
      <button className="dog-profile-view-back" type="button" onClick={() => navigate('/search')}>
        ← Powrót
      </button>

      <article className="dog-profile-view-hero">
        <div
          className="dog-profile-view-hero-image"
          style={{ backgroundImage: `url(${dog.image ?? ''})` }}
        />
        <div className="dog-profile-view-hero-overlay">
          <div>
            <h1>{dog.name}</h1>
            <p className="dog-profile-view-location">{dog.location}</p>
          </div>
        </div>
      </article>

      <div className="dog-profile-view-attrs">
        <article className="dog-profile-view-attr-card">
          <span>Rasa</span>
          <strong>{dog.breed}</strong>
        </article>
        <article className="dog-profile-view-attr-card">
          <span>Waga</span>
          <strong>{dog.weight}</strong>
        </article>
        <article className="dog-profile-view-attr-card">
          <span>Płeć</span>
          <strong>{dog.gender}</strong>
        </article>
      </div>

      <section className="dog-profile-view-section">
        <h2>O mnie</h2>
        <p>{dog.description}</p>
      </section>

      <section className="dog-profile-view-section">
        <h2>Cechy charakteru</h2>
        <div className="dog-profile-view-tags">
          {dog.traits.map((trait) => (
            <span key={trait} className="dog-profile-view-tag">
              {trait}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}
