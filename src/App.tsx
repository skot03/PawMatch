import { FormEvent, useEffect, useMemo, useState } from 'react';

const VALID_EMAIL = 'admin@admin.pl';
const VALID_PASSWORD = 'admin';

type Screen = 'login' | 'register' | 'dashboard';

type UserRecord = {
  email: string;
  password: string;
};

type DogMatch = {
  name: string;
  owner: string;
  time: string;
  avatar?: string;
  initials?: string;
};

const STORAGE_KEY = 'pawmatch-users';
const SESSION_KEY = 'pawmatch-active-user';

const defaultUsers: UserRecord[] = [
  { email: VALID_EMAIL, password: VALID_PASSWORD },
];

const walkMeetups: DogMatch[] = [
  { name: 'Max', owner: 'Anna Kowalska', time: '20.05 16:30', avatar: dogAvatarDataUri() },
  { name: 'Max', owner: 'Anna Kowalska', time: '20.05 16:30', initials: 'M' },
  { name: 'Max', owner: 'Anna Kowalska', time: '20.05 16:30', initials: 'M' },
];

function dogAvatarDataUri() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Dog avatar">
      <defs>
        <linearGradient id="fur" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#e6b07e"/>
          <stop offset="100%" stop-color="#b9753f"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="60" fill="#f6ebde"/>
      <circle cx="60" cy="66" r="28" fill="url(#fur)"/>
      <path d="M38 46c0-10 7-18 17-18 5 0 9 2 13 5 4-3 8-5 13-5 10 0 17 8 17 18 0 8-4 16-10 20-4-12-13-19-20-19s-16 7-20 19c-6-4-10-12-10-20Z" fill="#8c5a2c"/>
      <circle cx="49" cy="63" r="3.5" fill="#3c2517"/>
      <circle cx="71" cy="63" r="3.5" fill="#3c2517"/>
      <path d="M59 69c2 0 4 1 4 3 0 2-2 5-4 5s-4-3-4-5c0-2 2-3 4-3Z" fill="#3c2517"/>
      <path d="M54 76c2 2 4 3 6 3s4-1 6-3" stroke="#3c2517" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M34 58c-7-4-11-10-11-17 0-7 4-11 10-11 5 0 9 2 11 6l-10 22Z" fill="#8c5a2c"/>
      <path d="M86 58c7-4 11-10 11-17 0-7-4-11-10-11-5 0-9 2-11 6l10 22Z" fill="#8c5a2c"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function readStoredUsers(): UserRecord[] {
  if (typeof window === 'undefined') {
    return defaultUsers;
  }

  const rawUsers = window.localStorage.getItem(STORAGE_KEY);

  if (!rawUsers) {
    return defaultUsers;
  }

  try {
    const parsedUsers = JSON.parse(rawUsers) as UserRecord[];
    return parsedUsers.length ? parsedUsers : defaultUsers;
  } catch {
    return defaultUsers;
  }
}

function PawLogo() {
  return (
    <svg viewBox="0 0 128 128" className="paw-logo" aria-hidden="true">
      <g fill="currentColor">
        <circle cx="42" cy="30" r="11" className="tone-2" />
        <circle cx="28" cy="51" r="11" className="tone-3" />
        <circle cx="62" cy="24" r="11" className="tone-1" />
        <circle cx="84" cy="32" r="11" className="tone-2" />
        <path d="M70 45c7.7-15.9 28.3-15.4 34.7 1l5.3 13.6c5.8 14.8-5 30.4-20.8 30.4H56.8c-14.9 0-24.8-15.1-19-29.2l5.1-12.4c5.1-12.5 22.5-16 27.1-3.4Z" className="tone-1" />
        <circle cx="32" cy="79" r="11" className="tone-3" />
        <circle cx="54" cy="92" r="11" className="tone-2" />
        <circle cx="77" cy="85" r="11" className="tone-3" />
        <circle cx="97" cy="67" r="11" className="tone-2" />
        <path d="M42 98c4.8-11.2 14.1-17 22.7-17 8.7 0 17.8 5.8 22.6 17 4.8 11.1-2.7 23-14.5 23H56.4c-11.9 0-19.3-11.9-14.4-23Z" className="tone-1" />
      </g>
    </svg>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [users, setUsers] = useState<UserRecord[]>(defaultUsers);
  const [sessionEmail, setSessionEmail] = useState('');
  const [email, setEmail] = useState(VALID_EMAIL);
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [confirmPassword, setConfirmPassword] = useState(VALID_PASSWORD);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const storedUsers = readStoredUsers();
    setUsers(storedUsers);

    const storedSession = window.localStorage.getItem(SESSION_KEY);

    if (storedSession && storedUsers.some((user) => user.email === storedSession)) {
      setSessionEmail(storedSession);
      setScreen('dashboard');
      setEmail(storedSession);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (screen === 'dashboard' && sessionEmail) {
      window.localStorage.setItem(SESSION_KEY, sessionEmail);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, [screen, sessionEmail]);

  const currentUserLabel = useMemo(() => {
    if (!sessionEmail) {
      return 'Użytkownik';
    }

    const userPrefix = sessionEmail.split('@')[0];
    return nickname.trim() || userPrefix.charAt(0).toUpperCase() + userPrefix.slice(1);
  }, [nickname, sessionEmail]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find((user) => user.email === normalizedEmail);
    const isValid = Boolean(matchedUser && matchedUser.password === password);

    if (!isValid) {
      setError('Nieprawidłowy e-mail lub hasło. Użyj admin@admin.pl / admin.');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('');
    setSessionEmail(normalizedEmail);
    setScreen('dashboard');
  }

  function handleRegister(event: FormEvent<HTMLFormElement>) {
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
    setSuccess('Konto zostało utworzone. Możesz się teraz zalogować.');
    setScreen('dashboard');
  }

  function handleLogout() {
    setScreen('login');
    setSessionEmail('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setNickname('');
    setError('');
    setSuccess('');
  }

  function handleGoToRegister() {
    setScreen('register');
    setError('');
    setSuccess('');
  }

  function handleGoToLogin() {
    setScreen('login');
    setError('');
    setSuccess('');
    setConfirmPassword('');
  }

  return (
    <main className="page-shell">
      {screen === 'dashboard' ? (
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

          <section className="dashboard-section">
            <h2>Umówione spacerki</h2>
            <div className="walk-list">
              {walkMeetups.map((meetup, index) => (
                <article className="walk-card" key={`${meetup.name}-${index}`}>
                  <div className="walk-card__avatar">
                    {meetup.avatar ? (
                      <img src={meetup.avatar} alt="Piesek" />
                    ) : (
                      <span>{meetup.initials}</span>
                    )}
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

          <nav className="bottom-nav" aria-label="Nawigacja dolna">
            <button type="button">👤</button>
            <button type="button">⌕</button>
            <button type="button" className="active">⌂</button>
            <button type="button">▭</button>
            <button type="button">⌂⌂</button>
          </nav>

          <button className="logout-link" type="button" onClick={handleLogout}>
            Wyloguj się
          </button>
        </section>
      ) : (
        <section className="login-card">
          <div className="brand-wrap">
            <PawLogo />
            <h1>PawMatch</h1>
          </div>

          {screen === 'login' ? (
            <>
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
                Nie masz konta? <button className="inline-link" type="button" onClick={handleGoToRegister}>Zarejestruj się!</button>
              </p>
            </>
          ) : (
            <>
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
                Masz już konto? <button className="inline-link" type="button" onClick={handleGoToLogin}>Zaloguj się!</button>
              </p>
            </>
          )}
        </section>
      )}
    </main>
  );
}