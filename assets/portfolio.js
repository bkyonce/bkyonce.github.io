(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const themeColors = { light: '#fbfaf9', dark: '#141316' };

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-pressed', String(dark));
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = dark ? themeColors.dark : themeColors.light;
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
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) current = section;
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
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  updateNavigation();

  document.getElementById('year').textContent = String(new Date().getFullYear());

  // Song of the week: one pick per calendar week (Monday start), cycling through the list.
  // 52 entries, so the cycle repeats yearly. [title, artist, year or ''].
  const songs = [
    ['Take Five', 'The Dave Brubeck Quartet', '1959'],
    ['So What', 'Miles Davis', '1959'],
    ['Summertime', 'Ella Fitzgerald & Louis Armstrong', '1957'],
    ['My Favorite Things', 'John Coltrane', '1961'],
    ['Cantaloupe Island', 'Herbie Hancock', '1964'],
    ['The Girl from Ipanema', 'Stan Getz & João Gilberto', '1964'],
    ['Autumn Leaves', 'Cannonball Adderley', '1958'],
    ["'Round Midnight", 'Thelonious Monk', '1947'],
    ['What a Wonderful World', 'Louis Armstrong', '1967'],
    ["Moanin'", 'Art Blakey & the Jazz Messengers', '1958'],
    ['Fly Me to the Moon', 'Frank Sinatra & Count Basie', '1964'],
    ['Take the "A" Train', 'Duke Ellington', '1941'],
    ['Blue in Green', 'Miles Davis', '1959'],
    ['Misty', 'Erroll Garner', '1954'],
    ['Feeling Good', 'Nina Simone', '1965'],
    ['Watermelon Man', 'Herbie Hancock', '1962'],
    ["Don't Know Why", 'Norah Jones', '2002'],
    ['Giant Steps', 'John Coltrane', '1960'],
    ['Georgia on My Mind', 'Ray Charles', '1960'],
    ['Blue Rondo à la Turk', 'The Dave Brubeck Quartet', '1959'],
    ['St. Thomas', 'Sonny Rollins', '1956'],
    ['Lush Life', 'John Coltrane & Johnny Hartman', '1963'],
    ['Chameleon', 'Herbie Hancock', '1973'],
    ['Cheek to Cheek', 'Ella Fitzgerald & Louis Armstrong', '1956'],
    ['All Blues', 'Miles Davis', '1959'],
    ['Waltz for Debby', 'Bill Evans Trio', '1961'],
    ['The Sidewinder', 'Lee Morgan', '1964'],
    ['Mack the Knife', 'Ella Fitzgerald', '1960'],
    ['Blue Bossa', 'Joe Henderson', '1963'],
    ['In a Sentimental Mood', 'Duke Ellington & John Coltrane', '1963'],
    ['Birdland', 'Weather Report', '1977'],
    ['L-O-V-E', 'Nat King Cole', '1965'],
    ['Song for My Father', 'Horace Silver', '1965'],
    ['Desafinado', 'Stan Getz & Charlie Byrd', '1962'],
    ['Sing, Sing, Sing', 'Benny Goodman', '1937'],
    ['Maiden Voyage', 'Herbie Hancock', '1965'],
    ['Dream a Little Dream of Me', 'Louis Armstrong & Ella Fitzgerald', '1950'],
    ['Naima', 'John Coltrane', '1960'],
    ['Spain', 'Chick Corea', '1972'],
    ['Satin Doll', 'Duke Ellington', '1953'],
    ['A Night in Tunisia', 'Dizzy Gillespie', '1946'],
    ['Straight, No Chaser', 'Thelonious Monk', ''],
    ['My Funny Valentine', 'Chet Baker', ''],
    ['Peace Piece', 'Bill Evans', ''],
    ['Linus and Lucy', 'Vince Guaraldi Trio', '1964'],
    ['Mood Indigo', 'Duke Ellington', '1930'],
    ["It Don't Mean a Thing (If It Ain't Got That Swing)", 'Duke Ellington', '1932'],
    ['The Nearness of You', 'Norah Jones', '2002'],
    ['Corcovado', 'Stan Getz & João Gilberto', '1964'],
    ['Freddie Freeloader', 'Miles Davis', '1959'],
    ['Christmas Time Is Here', 'Vince Guaraldi Trio', '1965'],
    ['Ornithology', 'Charlie Parker', '1946']
  ];
  const DAY = 86400000;
  const epoch = Date.UTC(2026, 0, 5); // a Monday

  function weekNumber(date) {
    const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    return Math.floor((today - epoch) / (7 * DAY));
  }
  function songFor(weeks) {
    const n = songs.length;
    return songs[((weeks % n) + n) % n];
  }
  function mondayOf(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
  }
  function label(song) {
    return song[0] + ' by ' + song[1];
  }

  const titleEl = document.getElementById('song-title');
  if (titleEl) {
    const now = new Date();
    const weeks = weekNumber(now);
    const [title, artist, year] = songFor(weeks);
    const query = encodeURIComponent(title + ' ' + artist);
    titleEl.textContent = title;
    document.getElementById('song-artist').textContent = year ? artist + ', ' + year : artist;
    document.getElementById('song-week').textContent = 'Song of the week, ' +
      mondayOf(now).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    document.getElementById('song-youtube').href = 'https://www.youtube.com/results?search_query=' + query;
    document.getElementById('song-spotify').href = 'https://open.spotify.com/search/' + query;
    document.getElementById('song-next').textContent = 'Next week: ' + label(songFor(weeks + 1)) + '.';
  }
})();
