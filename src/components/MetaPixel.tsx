import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { registerMetaPixel, reportMetaPageView } from '@/lib/meta-pixel';

export default function MetaPixel() {
  const { pathname } = useLocation();
  useEffect(() => registerMetaPixel(), [pathname]);
  useEffect(() => reportMetaPageView(), [pathname]);
  return null;
}