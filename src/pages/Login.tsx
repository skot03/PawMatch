import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import PawLogo from '../components/PawLogo';

export default function Login() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@admin.pl');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');

  if (!context) return null;
  const { users, setSessionEmail } = context;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find((user) => user.email === normalizedEmail);
    const isValid = Boolean(matchedUser && matchedUser.password === password);

    if (!isValid) {
      setError('Nieprawidłowy e-mail lub hasło. Użyj admin@admin.pl / admin.');
      return;
    }

    setError('');
    setSessionEmail(normalizedEmail);
    navigate('/dashboard');
  }

  return (
    <section className="login-card">
      <div className="brand-wrap">
        <PawLogo />
        <h1>PawMatch</h1>
      </div>

      <p className="headline">Witaj!</p>
      <p className="subheadline">Dołącz do nas i znajdź najlepszych kumpli dla swojego zwierzaka!</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Twój adres e-mail</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            inputMode="email"
            placeholder="admin@admin.pl"
          />
        </label>

        <label className="field">
          <span>Hasło</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            placeholder="admin"
          />
        </label>

        <div className="form-row">
          <button className="link-button" type="button" onClick={() => setPassword('')}>
            Nie pamiętam hasła
          </button>
        </div>

        {error ? <p className="error-message">{error}</p> : null}

        <button className="primary-button" type="submit">
          Zaloguj się
        </button>
      </form>

      <div className="divider" />

      <p className="footer-copy">
        Nie masz konta?{' '}
        <button className="inline-link" type="button" onClick={() => navigate('/register')}>
          Zarejestruj się!
        </button>
      </p>
    </section>
  );
}