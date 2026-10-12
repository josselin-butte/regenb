// Only app bundles can execute. Hosting-injected analytics and marketing loaders
// (including /~flock.js) are intentionally excluded, even on our own origin.
export function privacyPolicy(development = false): string {
  const scripts = [
    'https://www.regenb.fr/assets/',
    'https://regenb.fr/assets/',
    'https://*.lovable.app/assets/',
  ];
  if (development) scripts.push('http://localhost:8080', "'unsafe-inline'");
  return [
    `script-src ${scripts.join(' ')}`,
    "object-src 'none'",
    "frame-src 'none'",
    "font-src 'self'",
    "img-src 'self' https://regenb.lovable.app data: blob:",
    "connect-src 'self'" + (development ? ' ws://localhost:8080' : ''),
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}