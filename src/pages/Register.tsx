import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import PawLogo from '../components/PawLogo';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Hasła muszą być identyczne.');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków.');
      return;
    }

    setBusy(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dog-profile');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Konto z takim adresem e-mail już istnieje.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Nieprawidłowy format adresu e-mail.');
      } else {
        setError('Wystąpił błąd podczas rejestracji.');
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

      <center><p className="headline">Witaj!</p></center>
      <center><p className="subheadline">Dołącz do nas i znajdź najlepszych kumpli dla swojego zwierzaka!</p></center>

      <form className="login-form" onSubmit={handleRegister}>
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

        <label className="field">
          <span>Powtórz hasło</span>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Potwierdź hasło"
            required 
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button className="primary-button" type="submit" disabled={busy}>
          {busy ? 'Trwa rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>

      <div className="divider" />

      <p className="footer-copy" style={{ textAlign: 'center' }}>
        Masz już konto?{' '}
        <button className="inline-link" type="button" onClick={() => navigate('/')}>
          Zaloguj się!
        </button>
      </p>
    </section>
  );
}