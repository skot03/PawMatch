import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MessageList.css';

const ImageIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1c5b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);

export default function MessageList() {
    const navigate = useNavigate();
    const newMatches = [
        { name: 'Luna' },
        { name: 'Burek' },
        { name: 'Maks' },
        { name: 'Bella' },
        { name: 'Puszek' },
    ];

    const messages = [
        { sender: 'Anna & Azor', text: 'To kiedy idziemy na ten spacer do parku?', time: '12:45', unread: false, type: 'gold' },
        { sender: 'Marek & Rocky', text: 'Rocky już nie może się doczekać!', time: 'Wczoraj', unread: true, type: 'orange' },
        { sender: 'Kasia & Figa', text: 'Czy Figa lubi inne suczki?', time: 'Pn', unread: false, type: 'green' },
        { sender: 'Tomek & Bruno', text: 'Dzięki za spacer, Bruno padł trupem :)', time: '22 Lip', unread: false, type: 'gold' },
    ];

    return (
        <section className="messages-shell">
            <header className="messages-header">
                <h1>Wiadomości</h1>
            </header>

            <section>
                <h2 className="section-title">Nowe Dopasowania</h2>
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
                    <article className={`message-card message-card--${msg.type}`} key={index} onClick={() => navigate('/chat')} style={{ cursor: 'pointer' }}>
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
        </section>
    );
}