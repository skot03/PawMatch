import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext, defaultDogForm, DogProfile as DogProfileType } from '../context/AppContext';
import ProfileAvatar from '../components/ProfileAvatar';

export default function DogProfile() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [dogForm, setDogForm] = useState<DogProfileType>(defaultDogForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!context) return null;
  const { sessionEmail, setProfiles } = context;

  function handleDogSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!sessionEmail) return;

    if (!dogForm.name.trim() || !dogForm.breed.trim()) {
      setError('Uzupełnij imię i rasę psa.');
      return;
    }

    setProfiles((currentProfiles) => {
      const currentProfileData = currentProfiles[sessionEmail] || {
        displayName: sessionEmail.split('@')[0],
        about: '',
        dogs: [],
      };
      return {
        ...currentProfiles,
        [sessionEmail]: {
          ...currentProfileData,
          dogs: [...currentProfileData.dogs, { ...dogForm }],
        },
      };
    });

    setDogForm(defaultDogForm);
    setError('');
    setSuccess('Pies został dodany do profilu.');
    
    setTimeout(() => {
      navigate('/user-profile');
    }, 1000);
  }

  function updateDogField<K extends keyof DogProfileType>(key: K, value: DogProfileType[K]) {
    setDogForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));
  }

  return (
    <section className="setup-card">
      <header className="setup-header">
        <h1>Poznajmy się!</h1>
        <p>Uzupełnij profil zwierzaka</p>
      </header>

      <div className="profile-avatar profile-avatar--setup">
        <ProfileAvatar badge />
      </div>

      <form className="setup-form" onSubmit={handleDogSubmit}>
        <label className="field field--visible-label">
          <span>Imię</span>
          <input
            type="text"
            value={dogForm.name}
            onChange={(event) => updateDogField('name', event.target.value)}
            placeholder="Placeholder"
          />
        </label>

        <label className="field field--visible-label">
          <span>Rasa</span>
          <input
            type="text"
            value={dogForm.breed}
            onChange={(event) => updateDogField('breed', event.target.value)}
            placeholder="Placeholder"
          />
        </label>

        <div className="setup-grid">
          <label className="field field--visible-label">
            <span>Wiek</span>
            <input
              type="text"
              value={dogForm.age}
              onChange={(event) => updateDogField('age', event.target.value)}
              placeholder="Placeholder"
            />
          </label>

          <label className="field field--visible-label">
            <span>Waga</span>
            <input
              type="text"
              value={dogForm.weight}
              onChange={(event) => updateDogField('weight', event.target.value)}
              placeholder="Placeholder"
            />
          </label>
        </div>

        <div className="choice-group">
          <span className="choice-group__label">Płeć</span>
          <div className="choice-group__options">
            {(['Samiec', 'Samiczka'] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={
                  option === dogForm.gender
                    ? 'choice-group__option choice-group__option--active'
                    : 'choice-group__option'
                }
                onClick={() => updateDogField('gender', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="choice-group">
          <span className="choice-group__label">Poziom energii</span>
          <div className="choice-group__options choice-group__options--three">
            {(['Niski', 'Średni', 'Wysoki'] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={
                  option === dogForm.energy
                    ? 'choice-group__option choice-group__option--active'
                    : 'choice-group__option'
                }
                onClick={() => updateDogField('energy', option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="error-message">{error}</p> : null}
        {success ? <p className="success-message">{success}</p> : null}

        <button className="primary-button" type="submit">
          Dodaj psa
        </button>

        <button className="secondary-button" type="button" onClick={() => navigate('/user-profile')}>
          Pomiń
        </button>
      </form>
    </section>
  );
}