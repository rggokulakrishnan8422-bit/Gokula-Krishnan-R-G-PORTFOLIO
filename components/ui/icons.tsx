/**
 * Brand icons inlined as SVG so the build never depends on the
 * availability of (deprecated) brand icons in icon libraries.
 */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tool brand glyphs (Aug 5 mockup "Tools I Use" strip + skills orbit) */
/* Simplified geometric marks in static brand colors — accents stay    */
/* brand-true while the site accent theme swaps around them.           */
/* ------------------------------------------------------------------ */

type BrandProps = { className?: string };

export function JiraBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#2684FF"
        d="M11.5 2.5 2.6 11.4a.6.6 0 0 0 0 .85l8.05 8.05a.6.6 0 0 0 .85 0l8.9-8.9a.6.6 0 0 0 0-.85L12.35 2.5a.6.6 0 0 0-.85 0Z"
      />
      <path
        fill="#9FC4FF"
        d="M11.5 7.6a3.9 3.9 0 0 1 0 7.8l-4-3.9 4-3.9Z"
      />
      <circle fill="#0B1E3B" cx="11.5" cy="11.5" r="1.6" />
    </svg>
  );
}

export function NotionBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#FFFFFF" />
      <path
        fill="#0F0F0F"
        d="M8.2 6.4c-.5 0-.6.3-.3.6l.6.7v9.1l-.7-.5c-.4-.3-.9-.2-.9.2 0 .2.1.3.3.5l1.5 1c.3.2.8.3 1.1-.1l.3-.4V8.2l4.7 7.7c-.1.4-.1.6-.1 1l-.8-.1c-.4 0-.6.3-.4.6.1.2.3.3.6.3h2.4c.5 0 .7-.3.4-.6l-.6-.7V7.4l.8.1c.4 0 .6-.3.4-.6a.6.6 0 0 0-.6-.5h-2.4c-.4 0-.6.2-.6.5 0 .1 0 .3.2.5l.6.6v5.2l-4-6.5c-.2-.3-.5-.5-.9-.5H8.2Z"
      />
    </svg>
  );
}

export function TrelloBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#0079BF" />
      <rect x="6" y="6" width="5" height="12" rx="1.5" fill="#FFFFFF" />
      <rect x="13" y="6" width="5" height="8" rx="1.5" fill="#FFFFFF" />
    </svg>
  );
}

export function AsanaBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <circle cx="12" cy="7" r="3.6" fill="#F06A6A" />
      <circle cx="7.2" cy="16" r="3.6" fill="#F06A6A" opacity="0.85" />
      <circle cx="16.8" cy="16" r="3.6" fill="#F06A6A" opacity="0.6" />
    </svg>
  );
}

export function ExcelBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#107C41" />
      <path
        fill="#FFFFFF"
        d="m7 7 5 5-5 5h3.2l3.4-3.65L17 17h3l-5-5 5-5h-3.1l-3.3 3.65L10.2 7H7Z"
      />
    </svg>
  );
}

export function WordBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#185ABD" />
      <path
        fill="#FFFFFF"
        d="M6.3 7l1.9 10h2.5l1.3-6.2 1.3 6.2h2.5l1.9-10h-2.7l-1.1 6.1L12.6 7h-1.2L10 13.1 8.9 7H6.3Z"
      />
    </svg>
  );
}

export function MsOfficeBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="#EA3E23"
        d="M12 2.6c5.2 0 9.4 4.2 9.4 9.4s-4.2 9.4-9.4 9.4-9.4-4.2-9.4-9.4 4.2-9.4 9.4-9.4Z"
      />
      <path
        fill="#FFFFFF"
        d="M12 6.2c3.2 0 5.8 2.6 5.8 5.8s-2.6 5.8-5.8 5.8-5.8-2.6-5.8-5.8 2.6-5.8 5.8-5.8Zm0 2.6a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"
      />
    </svg>
  );
}

export function GoogleWorkspaceBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path fill="#FFC107" d="M8.8 3 3 12.8l3.4 3.4 5.8-9.9L8.8 3Z" opacity="0.95" />
      <path fill="#1976D2" d="M12.2 6.3 6.4 16.2l3.4 3.4 8.2-9.9-2.4-3.4h-3.4Z" opacity="0.95" />
      <path fill="#4CAF50" d="m9.8 19.6-3.4-3.4L9.8 13l6.8 6.6H9.8Z" opacity="0.95" />
      <path fill="#F44336" d="m15.2 9.7 5.8-3.4c.6 1 1 2.2 1 3.5 0 3.2-1.9 6.4-5.2 9.8l-1.6-9.9Z" opacity="0.95" />
    </svg>
  );
}

export function SlackBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="9.2" y="2.6" width="3.4" height="7.4" rx="1.7" fill="#36C5F0" />
      <rect x="14.4" y="5.4" width="7" height="3.4" rx="1.7" fill="#36C5F0" transform="rotate(90 17.9 7.1)" />
      <rect x="13.2" y="9.2" width="3.4" height="7.4" rx="1.7" transform="rotate(90 14.9 12.9)" fill="#2EB67D" />
      <rect x="11.4" y="13.2" width="3.4" height="7.4" rx="1.7" transform="rotate(90 13.1 16.9)" fill="#ECB22E" />
      <rect x="11.4" y="11.4" width="3.4" height="7.4" rx="1.7" fill="#E01E5A" transform="rotate(90 13.1 15.1)" />
      <rect x="2.6" y="11.4" width="3.4" height="7.4" rx="1.7" transform="rotate(90 4.3 15.1)" fill="#E01E5A" />
    </svg>
  );
}

export function AiToolsBrand({ className }: BrandProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2.5 13.7 8c.2.7.6 1.2 1.3 1.4l5 1.6-5 1.6c-.7.2-1.1.7-1.3 1.4L12 19.5 10.3 14c-.2-.7-.6-1.2-1.3-1.4L4 11l5-1.6c.7-.2 1.1-.7 1.3-1.4L12 2.5Z"
      />
      <path
        fill="currentColor"
        opacity="0.6"
        d="M18.6 14.6l.8 2.4c.1.3.3.5.6.6l2.2.7-2.2.7c-.3.1-.5.3-.6.6l-.8 2.3-.8-2.3a1.1 1.1 0 0 0-.6-.6l-2.1-.7 2.1-.7c.3-.1.5-.3.6-.6l.8-2.4Z"
      />
    </svg>
  );
}

/** Maps tool labels (config/content.ts) to their brand glyph. */
export function ToolBrandIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  switch (label) {
    case "Jira":
      return <JiraBrand className={className} />;
    case "Notion":
      return <NotionBrand className={className} />;
    case "Trello":
      return <TrelloBrand className={className} />;
    case "Google Workspace":
    case "Google Drive":
      return <GoogleWorkspaceBrand className={className} />;
    case "Excel":
      return <ExcelBrand className={className} />;
    case "Word":
      return <WordBrand className={className} />;
    case "MS Office":
      return <MsOfficeBrand className={className} />;
    case "Asana":
      return <AsanaBrand className={className} />;
    case "GitHub":
      return <GitHubIcon className={className} />;
    case "Slack":
      return <SlackBrand className={className} />;
    case "AI Tools":
      return <AiToolsBrand className={className} />;
    default:
      return <AiToolsBrand className={className} />;
  }
}
