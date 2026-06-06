import React from 'react';

export default function ProfileAvatar({ badge = false }: { badge?: boolean }) {
  return (
    <div className={`profile-avatar${badge ? ' profile-avatar--badge' : ''}`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="profileBase" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#d8dee6" />
            <stop offset="100%" stopColor="#f0f3f7" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="#c47141" />
        <circle cx="60" cy="60" r="49" fill="url(#profileBase)" />
        <path d="M18 66c5-25 25-40 46-40 17 0 30 8 39 20-8 8-17 13-28 14-15 2-25 12-31 29-13-4-23-11-26-23Z" fill="#c8ced6" opacity="0.9" />
        <circle cx="38" cy="42" r="8" fill="#fff" opacity="0.85" />
      </svg>
      {badge ? (
        <span className="profile-avatar__badge" aria-hidden="true">
          ✎
        </span>
      ) : null}
    </div>
  );
}