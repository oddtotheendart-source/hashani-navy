'use strict';
(() => {
  // Add dated events here when they are actually announced.
  // Example:
  // { date: '2026-10-17', title: 'Voyage training', time: '8:00 PM ET', detail: 'Meet at ...' }
  const scheduledEvents = [];

  const root = document.getElementById('calendar-root');
  if (root) {
    const state = { month: new Date().getMonth(), year: new Date().getFullYear() };
    const monthName = new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric'});
    const weekdayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    const eventsForDate = iso => scheduledEvents.filter(event => event.date === iso);

    function renderCalendar() {
      const first = new Date(state.year, state.month, 1);
      const last = new Date(state.year, state.month + 1, 0);
      const startOffset = first.getDay();
      const cells = [];
      for (let i = 0; i < startOffset; i++) cells.push('');
      for (let day = 1; day <= last.getDate(); day++) cells.push(String(day));
      while (cells.length % 7) cells.push('');

      root.innerHTML = `
        <div class="calendar-toolbar">
          <button type="button" data-cal="prev" aria-label="Previous month">←</button>
          <h3 aria-live="polite">${monthName.format(first)}</h3>
          <button type="button" data-cal="next" aria-label="Next month">→</button>
          <button type="button" class="calendar-today" data-cal="today">Today</button>
        </div>
        <div class="calendar-weekdays" aria-hidden="true">
          ${weekdayNames.map(day => `<span>${day}</span>`).join('')}
        </div>
        <div class="calendar-grid">
          ${cells.map(day => {
            if (!day) return '<div class="calendar-day calendar-empty" aria-hidden="true"></div>';
            const iso = `${state.year}-${String(state.month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
            const dayEvents = eventsForDate(iso);
            const today = new Date();
            const isToday = today.getFullYear()===state.year && today.getMonth()===state.month && today.getDate()===Number(day);
            return `<article class="calendar-day${isToday ? ' is-today' : ''}" aria-label="${iso}">
              <span class="calendar-number">${day}</span>
              ${dayEvents.map(event => `<div class="calendar-event"><strong>${event.title}</strong>${event.time ? `<span>${event.time}</span>` : ''}${event.detail ? `<small>${event.detail}</small>` : ''}</div>`).join('')}
            </article>`;
          }).join('')}
        </div>
        <div class="calendar-status">
          <p><strong>${scheduledEvents.length ? scheduledEvents.length + ' scheduled Navy event' + (scheduledEvents.length === 1 ? '' : 's') : 'No dated Navy events are entered yet.'}</strong></p>
          <p class="small">Dates are added only from an announced event. Suggested activities are shown separately on the Voyage Board.</p>
        </div>`;

      root.querySelector('[data-cal="prev"]').addEventListener('click', () => {
        state.month--;
        if (state.month < 0) { state.month = 11; state.year--; }
        renderCalendar();
      });
      root.querySelector('[data-cal="next"]').addEventListener('click', () => {
        state.month++;
        if (state.month > 11) { state.month = 0; state.year++; }
        renderCalendar();
      });
      root.querySelector('[data-cal="today"]').addEventListener('click', () => {
        const now = new Date();
        state.month = now.getMonth();
        state.year = now.getFullYear();
        renderCalendar();
      });
    }
    renderCalendar();
  }

  const board = document.querySelector('#voyage-board .reference-body');
  if (board) {
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
  }
})();
