import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Chat.css';

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, text: 'Hej! Widziałam, że Luna i Twój piesek mają podobną energię.\nMoże wspólny spacer w parku jutro o 10? 🐾', sent: false, time: '09:41' },
  { id: 2, text: 'Cześć Ania! Bardzo chętnie. Luna wygląda na super towarzyską. Park Skaryszewski pasuje?', sent: true, time: '09:45' },
  { id: 3, text: 'Tak, Luna uwielbia ten park! To jej ulubione miejsce do biegania.', sent: false, time: '09:48' },
];

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setMessages(prev => [...prev, { id: Date.now(), text, sent: true, time }]);
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <button className="chat-back" onClick={() => navigate('/message-list')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="chat-header-avatar" />
        <span className="chat-header-name">Anna &amp; Azor</span>
        <span className="chat-online-dot" />
      </header>

      <div className="chat-messages">
        <div className="chat-date-separator">DZISIAJ</div>

        {messages.map(msg => (
          <div key={msg.id} className={`chat-bubble-wrap ${msg.sent ? 'chat-bubble-wrap--sent' : ''}`}>
            <div className={`chat-bubble ${msg.sent ? 'chat-bubble--sent' : 'chat-bubble--received'}`}>
              {msg.text}
            </div>
            <span className="chat-time">{msg.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <input
          className="chat-input"
          type="text"
          placeholder="Napisz wiadomość..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
