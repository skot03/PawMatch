import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

export const VALID_EMAIL = 'admin@admin.pl';
export const VALID_PASSWORD = 'admin';

export type DogMatch = {
  name: string;
  owner: string;
  time: string;
  avatar?: string;
  initials?: string;
};

export type DogProfile = {
  name: string;
  breed: string;
  age: string;
  weight: string;
  gender: 'Samiec' | 'Samiczka';
  energy: 'Niski' | 'Średni' | 'Wysoki';
};

export type UserProfileType = {
  displayName: string;
  about: string;
  dogs: DogProfile[];
};

export type UserRecord = {
  email: string;
  password: string;
};

export type ProfilesByEmail = Record<string, UserProfileType>;

const STORAGE_KEY = 'pawmatch-users';
const PROFILE_KEY = 'pawmatch-profiles';
const SESSION_KEY = 'pawmatch-active-user';

const defaultUsers: UserRecord[] = [{ email: VALID_EMAIL, password: VALID_PASSWORD }];

export const defaultDogForm: DogProfile = {
  name: '',
  breed: '',
  age: '',
  weight: '',
  gender: 'Samiec',
  energy: 'Niski',
};

export function dogAvatarDataUri() {
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

export const walkMeetups: DogMatch[] = [
  { name: 'Max', owner: 'Anna Kowalska', time: '20.05 16:30', avatar: dogAvatarDataUri() },
  { name: 'Max', owner: 'Anna Kowalska', time: '20.05 16:30', initials: 'M' },
  { name: 'Max', owner: 'Anna Kowalska', time: '20.05 16:30', initials: 'M' },
];

function formatDisplayNameFromEmail(email: string) {
  const localPart = email.split('@')[0] || 'Użytkownik';
  return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

function createDefaultProfile(email: string): UserProfileType {
  if (email === VALID_EMAIL) {
    return {
      displayName: 'Anna Kowalska',
      about: 'Moje super bio blabla. Opis użytkownika itd. Dłuższy tekst dłuższy tekst.',
      dogs: [
        {
          name: 'Max',
          breed: 'Pomeranian',
          age: '3 lata',
          weight: '7 kg',
          gender: 'Samiec',
          energy: 'Niski',
        },
      ],
    };
  }
  return {
    displayName: formatDisplayNameFromEmail(email),
    about: 'Dodaj kilka słów o sobie i o psach, które lubisz spotykać.',
    dogs: [],
  };
}

function readStoredUsers(): UserRecord[] {
  if (typeof window === 'undefined') return defaultUsers;
  const rawUsers = window.localStorage.getItem(STORAGE_KEY);
  if (!rawUsers) return defaultUsers;
  try {
    const parsedUsers = JSON.parse(rawUsers) as UserRecord[];
    return parsedUsers.length ? parsedUsers : defaultUsers;
  } catch {
    return defaultUsers;
  }
}

function readStoredProfiles(): ProfilesByEmail {
  if (typeof window === 'undefined') return { [VALID_EMAIL]: createDefaultProfile(VALID_EMAIL) };
  const rawProfiles = window.localStorage.getItem(PROFILE_KEY);
  if (!rawProfiles) return { [VALID_EMAIL]: createDefaultProfile(VALID_EMAIL) };
  try {
    const parsedProfiles = JSON.parse(rawProfiles) as ProfilesByEmail;
    return { [VALID_EMAIL]: createDefaultProfile(VALID_EMAIL), ...parsedProfiles };
  } catch {
    return { [VALID_EMAIL]: createDefaultProfile(VALID_EMAIL) };
  }
}

interface AppContextType {
  users: UserRecord[];
  setUsers: React.Dispatch<React.SetStateAction<UserRecord[]>>;
  profiles: ProfilesByEmail;
  setProfiles: React.Dispatch<React.SetStateAction<ProfilesByEmail>>;
  sessionEmail: string;
  setSessionEmail: React.Dispatch<React.SetStateAction<string>>;
  currentProfile: UserProfileType | null;
  currentUserLabel: string;
  handleLogout: () => void;
  handleDeleteAccount: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserRecord[]>(defaultUsers);
  const [profiles, setProfiles] = useState<ProfilesByEmail>({
    [VALID_EMAIL]: createDefaultProfile(VALID_EMAIL),
  });
  const [sessionEmail, setSessionEmail] = useState('');

  useEffect(() => {
    const storedUsers = readStoredUsers();
    const storedProfiles = readStoredProfiles();
    setUsers(storedUsers);
    setProfiles(
      storedUsers.reduce<ProfilesByEmail>((accumulator, user) => {
        accumulator[user.email] = storedProfiles[user.email] ?? createDefaultProfile(user.email);
        return accumulator;
      }, {})
    );

    const storedSession = window.localStorage.getItem(SESSION_KEY);
    if (storedSession && storedUsers.some((user) => user.email === storedSession)) {
      setSessionEmail(storedSession);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (sessionEmail) {
      window.localStorage.setItem(SESSION_KEY, sessionEmail);
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }, [sessionEmail]);

  const currentProfile = useMemo(() => {
    if (!sessionEmail) return null;
    return profiles[sessionEmail] ?? createDefaultProfile(sessionEmail);
  }, [profiles, sessionEmail]);

  const currentUserLabel = useMemo(() => {
    if (!sessionEmail) return 'Użytkownik';
    return currentProfile?.displayName ?? formatDisplayNameFromEmail(sessionEmail);
  }, [currentProfile, sessionEmail]);

  function handleLogout() {
    setSessionEmail('');
    window.localStorage.removeItem(SESSION_KEY);
  }

  function handleDeleteAccount() {
    if (!sessionEmail) return;
    if (sessionEmail !== VALID_EMAIL) {
      setUsers((currentUsers) => currentUsers.filter((user) => user.email !== sessionEmail));
    }
    setProfiles((currentProfiles) => {
      const nextProfiles = { ...currentProfiles };
      delete nextProfiles[sessionEmail];
      return nextProfiles;
    });
    handleLogout();
  }

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        profiles,
        setProfiles,
        sessionEmail,
        setSessionEmail,
        currentProfile,
        currentUserLabel,
        handleLogout,
        handleDeleteAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}