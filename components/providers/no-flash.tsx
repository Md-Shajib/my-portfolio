/**
 * Inline script run before hydration to apply the persisted accent
 * onto <html data-accent="…">, avoiding a flash to the default.
 * next-themes handles the dark/light flash on its own.
 */
export function NoFlashAccent() {
  const script = `
    (function () {
      try {
        var v = localStorage.getItem('shajib-accent');
        var allowed = ['emerald','violet','amber','sky','rose'];
        if (v && allowed.indexOf(v) !== -1) {
          document.documentElement.setAttribute('data-accent', v);
        } else {
          document.documentElement.setAttribute('data-accent', 'emerald');
        }
      } catch (e) {
        document.documentElement.setAttribute('data-accent', 'emerald');
      }
    })();
  `
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
