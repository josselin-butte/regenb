import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_ORIGIN, langFromPath } from '@/lib/routes';

type Props = {
  title: string;
  description: string;
  noindex?: boolean;
  ogType?: string;
  jsonLd?: object | object[];
};

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Per-page head tags (title, description, canonical, Open Graph, robots, JSON-LD). */
const Seo = ({ title, description, noindex, ogType = 'website', jsonLd }: Props) => {
  const { pathname } = useLocation();
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const url = SITE_ORIGIN + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:locale', langFromPath(pathname) === 'en' ? 'en_GB' : 'fr_FR');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.rel = 'canonical';
      document.head.appendChild(canon);
    }
    canon.href = url;

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex) setMeta('name', 'robots', 'noindex');
    else robots?.remove();

    document.head.querySelectorAll('script[data-seo-ld]').forEach((s) => s.remove());
    if (ld) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo-ld', '');
      s.textContent = ld;
      document.head.appendChild(s);
    }
  }, [pathname, title, description, noindex, ld]);

  return null;
};

export default Seo;
