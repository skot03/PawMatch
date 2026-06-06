import React from 'react';
import BottomNav from '../components/BottomNav';

const ImageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1c5b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);

export default function MessageList() {
    const newMatches = [
        { name: 'Luna' },
        { name: 'Burek' },
        { name: 'Maks' },
        { name: 'Bella' },
        { name: 'Puszek' },
    ];

    const messages = [
        { sender: 'Anna & Azor', text: 'To kiedy idziemy na ten spacer do parku?', time: '12:45', unread: false },
        { sender: 'Marek & Rocky', text: 'Rocky już nie może się doczekać!', time: 'Wczoraj', unread: true },
        { sender: 'Kasia & Figa', text: 'Czy Figa lubi inne suczki?', time: 'Pn', unread: false },
        { sender: 'Tomek & Bruno', text: 'Dzięki za spacer, Bruno padł trupem :)', time: '22 Lip', unread: false },
    ];

    return (
        <section className="dashboard-shell">

            <header className="dashboard-header" style={{ borderBottom: 'none', paddingBottom: '0' }}>
                <h1>Wiadomości</h1>
            </header>

            <section className="dashboard-section" style={{ overflow: 'hidden' }}>
                <h2 style={{ fontSize: '1.3rem', color: '#855a35', marginBottom: '8px' }}>
                    Nowe Dopasowania
                </h2>
                <div className="matches-scroll">
                    {newMatches.map((match, index) => (
                        <div className="match-avatar-wrapper" key={index}>
                            <div className="match-avatar-circle">
                                <ImageIcon />
                            </div>
                            <span className="match-name">{match.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="messages-list">
                {messages.map((msg, index) => (
                    <article className="message-card" key={index}>
                        <div className="message-card-avatar">
                            <ImageIcon />
                        </div>
                        <div className="message-card-content">
                            <div className="message-card-header">
                                <h3 className="message-card-title">{msg.sender}</h3>
                                <span className="message-card-time">{msg.time}</span>
                            </div>
                            <p className={`message-card-text ${msg.unread ? 'message-card-text--unread' : ''}`}>
                                {msg.text}
                            </p>
                        </div>
                    </article>
                ))}
            </section>

            <BottomNav activeTab="messages" />
        </section>
    );
}