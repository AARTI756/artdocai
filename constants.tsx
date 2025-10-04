import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM4 8.5L12 13.5L20 8.5L12 3.5L4 8.5ZM4 15.5V10.78L12 15.78L20 10.78V15.5L12 20.5L4 15.5Z" />
  </svg>
);

export const ChatWithPDFIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 
         4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20
         l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 
         4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

export const AICalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 
         002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 
         112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

export const DiagramInterpreterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 
         00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 
         0V9a2 2 0 012-2h2a2 2 0 012 
         2v10m-6 0a2 2 0 002 2h2a2 2 0 
         002-2m0 0V5a2 2 0 012-2h2a2 2 0 
         012 2v14a2 2 0 01-2 2h-2a2 2 0 
         01-2-2z"
    />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 
         005.25 21h13.5A2.25 2.25 0 
         0021 18.75V16.5m-13.5-9L12 
         3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);

/* -------------------- NEW ICONS -------------------- */

export const TranslatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5h12M9 3v2m3.5 10.5l2.5 
         2.5-2.5 2.5M15 12a6 6 0 01-12 
         0m6 0h.01"
    />
  </svg>
);

export const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 18l6-6-6-6M8 6l-6 
         6 6 6"
    />
  </svg>
);

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1a3 3 0 00-3 
         3v7a3 3 0 006 0V4a3 3 0 
         00-3-3zm6 10a6 6 0 
         01-12 0m6 6v4m-4 
         0h8"
    />
  </svg>
);
