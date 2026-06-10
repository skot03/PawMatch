import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import PawLogo from '../components/PawLogo';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Nieprawidłowy e-mail lub hasło.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Nieprawidłowy format adresu e-mail.');
      } else {
        setError('Wystąpił błąd podczas logowania.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="login-card">
      <div className="brand-wrap">
        <PawLogo />
        <h1>PawMatch</h1>
      </div>

      <center><p className="headline">Witaj z powrotem!</p></center>
      <center><p className="subheadline">Dołącz do nas i znajdź najlepszych kumpli dla swojego zwierzaka!</p></center>

      <form className="login-form" onSubmit={handleEmailLogin}>
        <label className="field">
          <span>Twój adres e-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Twój adres e-mail"
            required
          />
        </label>

        <label className="field">
          <span>Hasło</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
            required
          />
        </label>

        <div className="form-row">
          <button className="link-button" type="button" onClick={() => setPassword('')}>
            Nie pamiętam hasła
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="primary-button" type="submit" disabled={busy}>
          {busy ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>

      <div className="divider" />

      <p className="footer-copy" style={{ textAlign: 'center' }}>
        Nie masz konta?{' '}
        <button className="inline-link" type="button" onClick={() => navigate('/register')}>
          Zarejestruj się!
        </button>
      </p>
    </section>
  );
}