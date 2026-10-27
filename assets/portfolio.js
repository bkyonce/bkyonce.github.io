(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#1b211e' : '#f7f6f2';
  }
  try { applyTheme(localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light'); }
  catch { applyTheme('light'); }
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works without storage. */ }
  });
  const links = [...document.querySelectorAll('nav a')];
  const sections = [...document.querySelectorAll('main section')];
  function updateNavigation() {
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= window.innerHeight * .3) current = section;
    }
    for (const link of links) {
      if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }
  let pending = false;
  window.addEventListener('scroll', () => {
    if (!pending) {
      pending = true;
      requestAnimationFrame(() => { updateNavigation(); pending = false; });
    }
  }, {passive:true});
  window.addEventListener('resize', updateNavigation);
  updateNavigation();
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
