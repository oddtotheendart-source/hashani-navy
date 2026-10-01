(() => {
  const board = document.querySelector('#voyage-board .reference-body');
  const events = document.createElement('section');
  events.id = 'navy-events';
  events.className = 'at-glance navy-events';
  events.setAttribute('aria-labelledby','events-title');
  events.innerHTML = `<p class="label">NAVY EVENTS · SUGGESTED ACTIVITIES</p>
    <h3 id="events-title">Adventures at sea</h3>
    <p>Are you a sailor who wants to get a little wet and learn how to voyage or trade? Reach out in game with your regular availability to join adventures at sea with the Navy and the City of Hashan.</p>
    <p class="event-contact"><strong>MAIL IN GAME: Elius</strong><br>Include the days and times you can usually participate, your time zone, and the activities you would like to try.</p>
    <div class="event-grid">
      <article><p class="label">SUGGESTED EVENT</p><h3>Voyage together</h3><p>Learn how to voyage with other sailors.</p></article>
      <article><p class="label">SUGGESTED EVENT</p><h3>Trading at sea</h3><p>Learn about sea trade and plan a trading trip.</p></article>
      <article><p class="label">SUGGESTED EVENT</p><h3>Ship Arena</h3><p>Fun to be had, and a fun way to learn how to attack ships!</p></article>
    </div>
    <p class="small">Suggestions from Ticca. Dates, times, meeting places, and participation details are awaiting announcement.</p>`;
  board.prepend(events);
})();
