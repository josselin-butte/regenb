// Only app bundles can execute. Hosting-injected analytics and marketing loaders
// (including /~flock.js) are intentionally excluded, even on our own origin.
export function privacyPolicy(development = false): string {
  const scripts = [
    'https://www.regenb.fr/assets/',
    'https://regenb.fr/assets/',
    'https://*.lovable.app/assets/',
    'https://connect.facebook.net/en_US/fbevents.js',
    'https://connect.facebook.net/signals/config/2072978403507203',
  ];
  if (development) scripts.push('http://localhost:8080', "'unsafe-inline'");
  return [
    `script-src ${scripts.join(' ')}`,
    "object-src 'none'",
    "frame-src https://lecontinuo.substack.com/embed",
    "font-src 'self'",
    "media-src https://isxkgzebsoyordijkpnt.supabase.co/storage/v1/object/public/carnet-audio/",
    "img-src 'self' https://regenb.lovable.app https://www.facebook.com/tr/ data: blob:",
    "connect-src 'self' https://isxkgzebsoyordijkpnt.supabase.co https://www.facebook.com/tr/" + (development ? ' ws://localhost:8080' : ''),
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}