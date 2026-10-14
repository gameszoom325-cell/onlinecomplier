import React from "react";

interface IconProps {
  className?: string;
}

export const LanguageIcon: React.FC<{ id: string; className?: string }> = ({ id, className = "w-5 h-5" }) => {
  switch (id) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.5 2 6 3.5 6 6v3h6v1H5a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h2v-2a2 2 0 0 1 2-2h6a2 2 0 0 0 2-2V9a3 3 0 0 0-3-3h-1V4a2 2 0 0 0-2-2z" />
          <circle cx="8" cy="5" r="1" fill="currentColor" />
          <path d="M12 22c3.5 0 6-1.5 6-4v-3h-6v-1h7a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-2v2a2 2 0 0 1-2 2h-6a2 2 0 0 0-2 2v6a3 3 0 0 0 3 3h1v2a2 2 0 0 0 2 2z" />
          <circle cx="16" cy="19" r="1" fill="currentColor" />
        </svg>
      );
    case "r":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <text x="5" y="18" fontSize="16" fontWeight="bold" fontFamily="sans-serif">R</text>
          <ellipse cx="12" cy="12" rx="9" ry="8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2" />
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "html":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case "kotlin":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 3 21 3 3 21 3 3" />
          <polygon points="21 3 12 12 21 21 3 21 21 3" fill="currentColor" fillOpacity="0.2" />
        </svg>
      );
    case "c":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9a4.5 4.5 0 1 0 0 6" />
        </svg>
      );
    case "cpp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="12" r="7" />
          <path d="M11 9.5a3.5 3.5 0 1 0 0 5" />
          <line x1="17" y1="10" x2="17" y2="14" />
          <line x1="15" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "csharp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="12" r="6" />
          <path d="M10 9.5a3 3 0 1 0 0 5" />
          <path d="M15 9v6M19 9v6M13.5 11h7M13.5 13h7" strokeWidth="1.5" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12v4a2 2 0 0 1-2 2H5" />
          <path d="M14 12c1 0 2 .5 2 1.5s-1 1.5-2 2c-1 .5-2 1-2 2s1 1.5 2 1.5h1" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <line x1="6" y1="9" x2="12" y2="9" />
          <line x1="9" y1="9" x2="9" y2="17" />
          <path d="M15 11c1 0 2 .5 2 1.5s-1 1.5-2 2c-1 .5-2 1-2 2s1 1.5 2 1.5h1" />
        </svg>
      );
    case "go":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="12" r="4" />
          <path d="M8 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4h1V12H8" />
          <circle cx="16" cy="12" r="4" />
        </svg>
      );
    case "rust":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="7" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "scala":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6c8-3 12 1 16 0" />
          <path d="M4 12c8-3 12 1 16 0" />
          <path d="M4 18c8-3 12 1 16 0" />
        </svg>
      );
    case "dart":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 20 10 12 18 4 10 12 2" />
          <line x1="12" y1="2" x2="12" y2="18" />
        </svg>
      );
    case "ruby":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <line x1="12" y1="21" x2="6" y2="9" />
          <line x1="12" y1="21" x2="18" y2="9" />
        </svg>
      );
    case "php":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <path d="M7 14V10h2a1.5 1.5 0 0 1 0 3H7" />
          <path d="M15 14V10h2a1.5 1.5 0 0 1 0 3h-2" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
      );
    case "swift":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19c6 0 10-3 14-11-2 4-5 6-9 7 3-1 6-4 8-9-7 4-11 9-13 13z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
};
