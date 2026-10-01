/* Persistent course selector and a one-step return to the reader's place. */
(() => {
  const bar = document.querySelector('.topbar');
  const nav = bar.querySelector('nav');
  const destinations = [['home','Home'], ['tasks','Find your bearings'],
    ...sections.map(s => [s.id,s.title]), ['navy-ranks','Navy Ranks'],
    ['navy-members','Navy Members'], ['all-scrolls','All Navy Scrolls']];
  const controls = document.createElement('div');
  controls.className = 'course-controls';
  controls.innerHTML = '<label for="course-select">Set your course</label><select id="course-select"></select><button type="button" class="return-place" disabled>Return to my place</button>';
  nav.prepend(controls);
  const select = controls.querySelector('select');
  destinations.forEach(([id,title]) => select.add(new Option(title,id)));
  const back = controls.querySelector('button');
  let savedPlace = null;
  function remember() {
    const markers = [...document.querySelectorAll('main [id]')].filter(el => el.getClientRects().length && el.getBoundingClientRect().top <= bar.offsetHeight + 25);
    const marker = markers.at(-1) || document.getElementById('home');
    savedPlace = {el:marker, offset:marker.getBoundingClientRect().top, hash:location.hash};
    back.disabled = false;
  }
  select.addEventListener('change', () => {
    remember();
    const hash = '#' + select.value;
    if (location.hash === hash) openDestination();
    else location.hash = hash;
  });
  bar.addEventListener('click', e => { if(e.target.closest('a[href^="#"]')) remember(); });
  back.addEventListener('click', () => {
    if (!savedPlace) return;
    history.replaceState(null,'',savedPlace.hash || location.pathname + location.search);
    window.scrollTo({top:scrollY + savedPlace.el.getBoundingClientRect().top - savedPlace.offset,behavior:'instant'});
    savedPlace = null;
    back.disabled = true;
    update();
  });
  function update() {
    let current = destinations[0][0];
    for(const [id] of destinations) {
      const el = document.getElementById(id);
      if(el && el.getBoundingClientRect().top <= bar.offsetHeight + 40) current = id;
    }
    if(document.activeElement !== select) select.value = current;
    nav.querySelectorAll('a').forEach(a => {
      if(a.hash === '#' + current) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  }
  const size = new ResizeObserver(() => document.documentElement.style.setProperty('--nav-height',bar.offsetHeight + 'px'));
  size.observe(bar);
  let pending = false;
  window.addEventListener('scroll', () => {if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;update();});}}, {passive:true});
  update();
})();
