import { useEffect, useState } from 'react';
import { ModeToggle } from './mode-toggle';
import ThemeImage from './theme-image';

export default function GlobalHeader() {
  const [isRoot, setIsRoot] = useState(false);

  useEffect(() => {
    // Handler to check if current path is root
    const checkIsRoot = () => {
      setIsRoot(window.location.pathname === '/');
    };

    // Initial check on mount (handles reload)
    checkIsRoot();

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', checkIsRoot);

    // Listen for pushState/replaceState (client-side navigation)
    const origPushState = window.history.pushState;
    const origReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      origPushState.apply(this, args);
      checkIsRoot();
    };
    window.history.replaceState = function (...args) {
      origReplaceState.apply(this, args);
      checkIsRoot();
    };

    // Listen for hashchange (in case of hash navigation)
    window.addEventListener('hashchange', checkIsRoot);

    return () => {
      window.removeEventListener('popstate', checkIsRoot);
      window.removeEventListener('hashchange', checkIsRoot);
      window.history.pushState = origPushState;
      window.history.replaceState = origReplaceState;
    };
  }, []);

  return (
    <header
      id="global-header"
      className={`top-0 z-50 w-full rounded-md ${
        isRoot ? 'absolute top-0' : ''
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between p-8 ${
          isRoot ? 'text-white' : ''
        }`}
      >
        <div className="flex items-center gap-10">
          <a href="/">
            {isRoot ? (
              <img src="/brand/logo.png" alt="global-logo" width={200} />
            ) : (
              <ThemeImage
                lightSrc="/brand/logo-dark.png"
                darkSrc="/brand/logo.png"
                alt="global-logo"
                width={200}
              />
            )}
          </a>
          <div className="flex gap-5 text-lg uppercase">
            <a href="/docs">docs</a>
            <a href="/blogs">blog</a>
          </div>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
