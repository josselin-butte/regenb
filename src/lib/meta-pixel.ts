import { deleteOptionalCookies, getConsent, registerOptionalService } from './consent';

export const META_PIXEL_ID = '2072978403507203';
export const META_PIXEL_SCRIPT = 'https://connect.facebook.net/en_US/fbevents.js';
type Pixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Pixel;
  loaded: boolean;
  version: string;
};
declare global { interface Window { fbq?: Pixel; _fbq?: Pixel } }

export const isPublicPixelPath = (path: string) => !/^\/(?:en\/)?(?:admin|dashboard|login|auth|account|checkout|learn)(?:\/|$)/.test(path);

let active = false;
let lastPage: string | undefined;

export function reportMetaPageView(): void {
  if (!active || !getConsent('advertising') || !isPublicPixelPath(location.pathname) || lastPage === location.pathname) return;
  lastPage = location.pathname;
  window.fbq?.('track', 'PageView');
}

export function registerMetaPixel(): () => void {
  return registerOptionalService('advertising', () => {
    if (!isPublicPixelPath(location.pathname)) return () => {};
    let pixel = window.fbq;
    if (!pixel) {
      const queued = function (...args: unknown[]) {
        if (queued.callMethod) queued.callMethod.apply(queued, args);
        else queued.queue.push(args);
      } as Pixel;
      queued.queue = [];
      queued.push = queued;
      queued.loaded = true;
      queued.version = '2.0';
      window.fbq = window._fbq = queued;
      pixel = queued;
      pixel('set', 'autoConfig', false, META_PIXEL_ID);
      pixel('init', META_PIXEL_ID);
    }
    pixel('consent', 'grant');
    active = true;
    lastPage = undefined;
    if (!document.head.querySelector('script[data-meta-pixel]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = META_PIXEL_SCRIPT;
      script.dataset.metaPixel = META_PIXEL_ID;
      document.head.appendChild(script);
    }
    reportMetaPageView();
    return () => {
      active = false;
      lastPage = undefined;
      window.fbq?.('consent', 'revoke');
      // Remove unsent page views if withdrawal occurs before the SDK arrives.
      if (window.fbq && !window.fbq.callMethod) window.fbq.queue = window.fbq.queue.filter(args => args[0] !== 'track');
      document.head.querySelector('script[data-meta-pixel]')?.remove();
      deleteOptionalCookies(['_fbp', '_fbc']);
    };
  });
}