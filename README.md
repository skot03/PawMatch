# 🐾 PawMatch - Aplikacja do Łączenia Właścicieli Psów


PawMatch to interaktywna makieta aplikacji mobilnej. Projekt dedykowany jest dla właścicieli psów, którzy chcą w łatwy sposób znaleźć idealnych towarzyszy do wspólnych spacerów.


## Wygląd Aplikacji (Screeny)

<table align="center">
  <tr>
    <td align="center" width="33%">
      <b>Ekran Logowania</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/cdbcc008-1f9b-4616-9966-b4e5f1ee963d" width="100%" alt="Login"/>
    </td>
    <td align="center" width="33%">
      <b>Dashboard</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/e3472807-14b0-400b-a976-0a26cb13b9b4" width="100%" alt="Register"/>
    </td>
    <td align="center" width="33%">
      <b>Profil</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/37b2b940-b25f-4b77-a421-5e7e75db9a40" width="100%" alt="Dog Profile"/>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <b>Wiadomości</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/d116426b-5dbe-4fd4-b03a-90bb63bc413f" width="100%" alt="Dashboard"/>
    </td>
    <td align="center" width="33%">
      <b>Mapa</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/b6b83e86-48a3-4ed9-8199-67558874fb40" width="100%" alt="Messages"/>
    </td>
    <td align="center" width="33%">
      <b>Dopasowania</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/618fa017-1fe3-413b-8bb5-1529294d91f9" width="100%" alt="User Profile"/>
    </td>
  </tr>
</table>

---

## Integracja Firebase Authentication
<cr></cr>

<p align="center">
  <img width="100%" alt="Firebase Users List" src="https://github.com/user-attachments/assets/97d35cb1-0600-4fef-8fac-bcd46a268ac6" />
</p>

<p align="center">
  <img width="949" height="469" alt="image" src="https://github.com/user-attachments/assets/79d75bb9-aba6-4d66-aeb0-56ecacc59f96" />
</p>

---

## Integracja Google Analytics 


<p align="center">
  <img width="100%" alt="Google Analytics Realtime View" src="https://github.com/user-attachments/assets/725a92cf-809a-43c0-99c8-04c9d4993a65" />
</p>

<p align="center">
  <img width="100%" alt="Google Analytics User Metrics" src="https://github.com/user-attachments/assets/f1fdfe87-3b14-4788-89b1-50464bf85c25" />
</p>

---

## Integracja Hotjar


<p align="center">
  <img width="100%" alt="Hotjar Project Dashboard" src="https://github.com/user-attachments/assets/0599cb98-ba61-461e-977b-ffca1811a64b" />
</p>

---

## Struktura Katalogów Projektu

```text
src/
├── assets/                 # Wszystkie ikony SVG oraz grafiki
├── components/             # Reużywalne komponenty
├── context/                # Zarządzanie stanem aplikacji
├── pages/                  # Wszystkie ekrany aplikacji zarządzane przez React Router:
│   ├── Login.tsx / Register.tsx       # Uwierzytelnianie użytkowników
│   ├── Dashboard.tsx                  # Główny panel aplikacji
│   ├── UserProfile.tsx / DogProfile.tsx # Zarządzanie profilami
│   ├── Chat.tsx / MessageList.tsx     # Wiadomości
│   └── Map.tsx                        # Lokalizacja
│   └── Search.tsx                     # Dopasowania
├── styles/                 # Komplet dedykowanych arkuszy stylów CSS dla każdego ekranu i komponentu
├── App.tsx                 # Główny komponent
├── firebase.ts             # Konfiguracja i połączenie z usługą Firebase Authentication
└── main.tsx

```

##  Instalacja i Uruchomienie

Sklonuj projekt z repozytorium GitHub na swój dysk lokalny:
```bash
git clone https://github.com/skot03/PawMatch.git .
```
Wejdź do folderu i pobierz zależności 
```bash
npm install
```
Uruchom program
```bash
npm run dev
```
Dostęp do aplikacji (Otwórz przeglądarkę i wejdź pod wygenerowany link lokalny)
```bash
http://localhost:5173/
```
