(() => {
  const months=['Sarapin','Daedalan','Aeguary','Miraman','Scarlatan','Ero','Valnuary','Lupar','Phaestian','Chronos','Glacian','Mayan'];
  const section=document.createElement('section');section.id='navy-calendar';section.className='at-glance navy-calendar';
  section.innerHTML=`<p class="label">NAVY CALENDAR · GAME &amp; REAL TIME</p><h3>Find a time to sail</h3>
    <div class="navy-clocks"><div><strong>Eastern Time</strong><p id="eastern-clock"></p></div><div><strong>UTC / GMT</strong><p id="utc-clock"></p></div><div><strong>Your time zone</strong><p id="personal-clock"></p></div></div>
    <p class="small">Eastern Time follows EST in winter and EDT in summer automatically.</p>
    <label for="navy-zone">Show times in</label><select id="navy-zone"><option value="America/New_York">Eastern — New York</option><option value="America/Chicago">Central — Chicago</option><option value="America/Denver">Mountain — Denver</option><option value="America/Los_Angeles">Pacific — Los Angeles</option><option value="Europe/London">United Kingdom — London</option><option value="Europe/Paris">Central Europe — Paris</option><option value="Australia/Sydney">Australia — Sydney</option><option value="UTC">UTC / GMT</option></select>
    <div class="event-time-tool"><h3>Check an event time</h3><p>Enter the announced Eastern date and time to see UTC and your selected time zone.</p><label for="event-eastern">Event date and time in Eastern Time</label><input id="event-eastern" type="datetime-local"><p id="converted-time" role="status">Choose a date and time above.</p></div>
    <div class="game-calendar-heading"><h3>Achaean calendar</h3><label for="game-year">Browse year (AF)<input id="game-year" type="number" min="1" max="99999" value="1015"></label></div>
    <p class="small">1015 AF is the Merchants calendar’s starting reference year, not a live date. Choose a year and a day to plan. Current game-date synchronisation is awaiting a confirmed DATE/TIME reading.</p>
    <div id="navy-months" class="navy-months"></div><p id="game-day-details" role="status">No Navy event dates have been announced yet.</p>
    <p class="small">Twelve months of 25 days, following the <a href="https://www.achaea.com/local/Achaea_Manual.pdf">Achaea calendar</a>. In-game dates and real-world event times will be recorded together when confirmed.</p>`;
  document.querySelector('#navy-events').after(section);
  const zone=section.querySelector('#navy-zone');
  const local=Intl.DateTimeFormat().resolvedOptions().timeZone;
  if(local){if(![...zone.options].some(o=>o.value===local))zone.add(new Option('Your device — '+local,local));zone.value=local;}
  function format(date,timeZone){return new Intl.DateTimeFormat('en-US',{timeZone,dateStyle:'full',timeStyle:'long'}).format(date);}
  function clocks(){const now=new Date();section.querySelector('#eastern-clock').textContent=format(now,'America/New_York');section.querySelector('#utc-clock').textContent=format(now,'UTC');section.querySelector('#personal-clock').textContent=format(now,zone.value);}
  // Match Eastern wall time against UTC candidates, including daylight-saving transitions.
  function convert(){const input=section.querySelector('#event-eastern').value;const out=section.querySelector('#converted-time');if(!input){out.textContent='Choose a date and time above.';return;}
    const wall=new Date(input+'Z');if(!Number.isFinite(+wall)){out.textContent='Choose a valid date and time.';return;}
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
    const candidates=[4,5].map(offset=>new Date(+wall+offset*3600000)).filter(date=>{const p=Object.fromEntries(parts.formatToParts(date).map(p=>[p.type,p.value]));return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`===input;});
    if(!candidates.length){out.textContent='This Eastern time falls in the spring clock change and does not exist. Choose another time.';return;}
    if(candidates.length>1){out.textContent='This Eastern time occurs twice when clocks turn back. Ask the organiser to specify EST or EDT (or UTC).';return;}
    const date=candidates[0];out.textContent='Eastern: '+format(date,'America/New_York')+' · UTC: '+format(date,'UTC')+' · Selected zone: '+format(date,zone.value);
  }
  zone.addEventListener('change',()=>{clocks();convert();});section.querySelector('#event-eastern').addEventListener('input',convert);clocks();setInterval(clocks,1000);
  function render(){const year=Number(section.querySelector('#game-year').value);const grid=section.querySelector('#navy-months');grid.replaceChildren();if(!Number.isInteger(year)||year<1||year>99999)return;
    months.forEach(month=>{const card=document.createElement('article');const title=document.createElement('h4');title.textContent=month;card.append(title);const days=document.createElement('div');days.className='navy-days';for(let day=1;day<=25;day++){const button=document.createElement('button');button.type='button';button.textContent=day;button.setAttribute('aria-label',`${day} ${month}, ${year} AF`);button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');section.querySelector('#game-day-details').textContent=`${day} ${month}, ${year} AF — no confirmed Navy event recorded. Real-world time awaiting confirmation.`;});const shared=window.merchantSchedule; if(shared?.events.some(e=>e.year===year&&e.month===month&&e.day===day))button.classList.add('shared-event-day'); button.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('merchant-calendar-day',{detail:{year,month,day}}))); days.append(button);}card.append(days);grid.append(card);});
    section.querySelector('#game-day-details').textContent='No Navy event dates have been announced yet.';
  }
  section.querySelector('#game-year').addEventListener('input',render);window.addEventListener('merchant-schedule-loaded',render);render();
})();
