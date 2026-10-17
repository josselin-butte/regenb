import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isPublicPixelPath, registerMetaPixel, reportMetaPageView } from '@/lib/meta-pixel';

export default function MetaPixel() {
  const { pathname } = useLocation();
  const publicPage = isPublicPixelPath(pathname);
  useEffect(() => publicPage ? registerMetaPixel() : undefined, [publicPage]);
  useEffect(() => reportMetaPageView(), [pathname]);
  return null;
}