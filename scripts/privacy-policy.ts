// Scripts from our own origin (app bundles and Lovable Analytics /~flock.js) plus the
// exact Meta Pixel paths can execute; third-party loaders stay blocked.
export function privacyPolicy(development = false): string {
  const scripts = [
    "'self'",
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
    "media-src https://isxkgzebsoyordijkpnt.supabase.co/storage/v1/object/public/carnet-audio/ https://www.regenb.fr/__l5e/ https://regenb.fr/__l5e/ https://regenb.lovable.app/__l5e/",
    "img-src 'self' https://regenb.lovable.app https://www.regenb.fr https://regenb.fr https://www.facebook.com/tr/ data: blob:",
    "connect-src 'self' https://isxkgzebsoyordijkpnt.supabase.co https://www.facebook.com/tr/" + (development ? ' ws://localhost:8080' : ''),
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}