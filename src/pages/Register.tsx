import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import PawLogo from '../components/PawLogo';

export default function Register() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@admin.pl');
  const [password, setPassword] = useState('admin');
  const [confirmPassword, setConfirmPassword] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!context) return null;
  const { users, setUsers, setSessionEmail } = context;

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password || !confirmPassword) {
      setError('Uzupełnij wszystkie pola.');
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError('Hasła muszą być identyczne.');
      setSuccess('');
      return;
    }

    if (users.some((user) => user.email === normalizedEmail)) {
      setError('Konto z takim adresem e-mail już istnieje.');
      setSuccess('');
      return;
    }

    const nextUser = { email: normalizedEmail, password };
    setUsers((currentUsers) => [...currentUsers, nextUser]);
    setSessionEmail(normalizedEmail);
    setError('');
    setSuccess('Konto zostało utworzone. Możesz teraz dodać psa.');
    
    setTimeout(() => {
      navigate('/dog-profile');
    }, 1000);
  }

  return (
    <section className="login-card">
      <div className="brand-wrap">
        <PawLogo />
        <h1>PawMatch</h1>
      </div>

      <p className="headline">Witaj!</p>
      <p className="subheadline">Dołącz do nas i znajdź najlepszych kumpli dla swojego zwierzaka!</p>

      <form className="login-form" onSubmit={handleRegister}>
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
            autoComplete="new-password"
            placeholder="admin"
          />
        </label>

        <label className="field">
          <span>Potwierdź hasło</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            placeholder="admin"
          />
        </label>

        {success ? <p className="success-message">{success}</p> : null}
        {error ? <p className="error-message">{error}</p> : null}

        <button className="primary-button" type="submit">
          Zarejestruj się
        </button>
      </form>

      <div className="divider" />

      <p className="footer-copy">
        Masz już konto?{' '}
        <button className="inline-link" type="button" onClick={() => navigate('/')}>
          Zaloguj się!
        </button>
      </p>
    </section>
  );
}