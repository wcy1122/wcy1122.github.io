(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('homepage-theme'); } catch { /* Storage may be disabled. */ }

  function applyTheme(theme) {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeColor.setAttribute('content', dark ? '#191b20' : '#faf9f6');
  }

  applyTheme(savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : preference.matches ? 'dark' : 'light');
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(savedTheme);
    try { localStorage.setItem('homepage-theme', savedTheme); } catch { /* The toggle still works without persistence. */ }
  });
  const onPreferenceChange = event => {
    if (savedTheme !== 'dark' && savedTheme !== 'light') applyTheme(event.matches ? 'dark' : 'light');
  };
  if (typeof preference.addEventListener === 'function') {
    preference.addEventListener('change', onPreferenceChange);
  } else if (typeof preference.addListener === 'function') {
    preference.addListener(onPreferenceChange);
  }

  const newsList = document.getElementById('news-list');
  const newsToggle = document.getElementById('news-toggle');
  if (newsList.children.length > 4) {
    newsList.classList.add('is-collapsible');
    newsToggle.hidden = false;
    newsToggle.addEventListener('click', () => {
      const expanded = newsList.classList.toggle('expanded');
      newsToggle.setAttribute('aria-expanded', String(expanded));
      newsToggle.innerHTML = expanded ? 'Show less <span aria-hidden="true">↑</span>' : 'Show earlier news <span aria-hidden="true">↓</span>';
    });
  }
})();
