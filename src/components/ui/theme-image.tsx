import React, { useEffect, useState } from 'react';

/**
 * Props for ThemeImage component.
 */
type ThemeImageProps = {
  lightSrc: string;
  darkSrc: string;
  alt?: string;
  [key: string]: any;
};

/**
 * ThemeImage component: shows different image for dark/light theme.
 * The image is reloaded on every refresh (force reload on every refresh).
 */
export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt = '',
  ...props
}: ThemeImageProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    }
    return 'light';
  });

  // Generate a unique key for each reload to force <img> reload
  const [reloadKey, setReloadKey] = useState(() => Date.now());

  useEffect(() => {
    // Preload both images for instant switch
    new window.Image().src = lightSrc;
    new window.Image().src = darkSrc;

    // Update theme if <html> class changes
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
      );
    };

    // Set theme immediately on mount (handles reload case)
    updateTheme();

    // Observe <html> class changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Listen for system theme changes (if user hasn't set a theme)
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemTheme = () => {
      const stored = localStorage.getItem('theme');
      if (!stored || stored === 'system') {
        updateTheme();
      }
    };
    mql.addEventListener('change', handleSystemTheme);

    // Force reloadKey to change on every mount (i.e., every refresh)
    setReloadKey(Date.now());

    return () => {
      observer.disconnect();
      mql.removeEventListener('change', handleSystemTheme);
    };
    // eslint-disable-next-line
  }, [lightSrc, darkSrc]);

  // Add a cache-busting query param to force reload on every refresh
  const src =
    (theme === 'dark' ? darkSrc : lightSrc) +
    (/\?/.test(theme === 'dark' ? darkSrc : lightSrc) ? '&' : '?') +
    'v=' +
    reloadKey;

  return <img src={src} alt={alt} {...props} />;
}
