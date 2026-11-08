// أيقونات السوشيال — SVG مدمجة (أيقونات العلامات غير متاحة في lucide الحديث)
export function FacebookIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V5c-.2 0-1-.1-1.9-.1-1.9 0-3.3 1.2-3.3 3.4V11H8.5v3h2.7v7h2.3Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.6 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.9C16.4 5 12 5 12 5s-4.4 0-6.9.1c-.4.1-1.2.1-1.9.9-.6.6-.8 2-.8 2S2.2 9.6 2.2 11.3v1.5C2.2 14.4 2.4 16 2.4 16s.2 1.4.8 2c.7.7 1.6.7 2 .8 1.5.1 6.4.2 6.8.2 0 0 4.4 0 6.9-.2.4-.1 1.2-.1 1.9-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C21.8 9.6 21.6 8 21.6 8ZM10 14.7V9.3l5.2 2.7-5.2 2.7Z" />
    </svg>
  );
}
