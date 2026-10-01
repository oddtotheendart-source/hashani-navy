(() => {
  const months=['Sarapin','Daedalan','Aeguary','Miraman','Scarlatan','Ero','Valnuary','Lupar','Phaestian','Chronos','Glacian','Mayan'];
  const section=document.createElement('section');section.id='navy-calendar';section.className='at-glance navy-calendar';
  section.innerHTML=`<p class="label">NAVY CALENDAR · GAME &amp; REAL TIME</p><h3>Find a time to sail</h3>
    <div class="navy-clocks"><div><strong>Eastern Time</strong><p id="eastern-clock"></p></div><div><strong>UTC / GMT</strong><p id="utc-clock"></p></div><div><strong>Your time zone</strong><p id="personal-clock"></p></div></div>
    <p class="small">Eastern Time follows EST in winter and EDT in summer automatically.</p>
    <label for="navy-zone">Show times in</label><select id="navy-zone"><option value="America/New_York">Eastern — New York</option><option value="America/Chicago">Central — Chicago</option><option value="America/Denver">Mountain — Denver</option><option value="America/Los_Angeles">Pacific — Los Angeles</option><option value="Europe/London">United Kingdom — London</option><option value="Europe/Paris">Central Europe — Paris</option><option value="Australia/Sydney">Australia — Sydney</option><option value="UTC">UTC / GMT</option></select>
    <div class="event-time-tool"><h3>Plan an event in real and Achaean time</h3><p>Choose a real-world date, time, and time zone. See GMT, Eastern Time, and the estimated Achaean date together.</p><label for="event-input-zone">Time zone of the date you are entering</label><select id="event-input-zone"></select><label for="event-eastern">Real-world event date and time</label><input id="event-eastern" type="datetime-local"><div id="converted-time" role="status">Choose a date and time above.</div><p class="small">Achaean dates are estimates from the Merchants reference: 6 Glacian 1015 AF at 30 September 2026, 16:25:05 GMT. The time within that game day was not recorded, so two possible dates may be shown. Confirm with in-game DATE before announcing an event.</p></div>
    <div class="game-calendar-heading"><h3>Achaean calendar</h3><label for="game-year">Browse year (AF)<input id="game-year" type="number" min="1" max="99999" value="1015"></label></div>
    <p class="small">1015 AF is the Merchants calendar’s starting reference year, not a live date. Choose a year and a day to plan. Current game-date synchronisation is awaiting a confirmed DATE/TIME reading.</p>
    <div id="navy-months" class="navy-months"></div><p id="game-day-details" role="status">No Navy event dates have been announced yet.</p>
    <p class="small">Twelve months of 25 days, following the <a href="https://www.achaea.com/local/Achaea_Manual.pdf">Achaea calendar</a>. In-game dates and real-world event times will be recorded together when confirmed.</p>`;
  document.querySelector('#navy-events').after(section);
  const zone=section.querySelector('#navy-zone');
  const local=Intl.DateTimeFormat().resolvedOptions().timeZone;
  if(local){if(![...zone.options].some(o=>o.value===local))zone.add(new Option('Your device — '+local,local));zone.value=local;}
  const inputZone=section.querySelector('#event-input-zone');
  [...zone.options].forEach(o=>inputZone.add(new Option(o.text,o.value)));
  inputZone.value=zone.value;
  function format(date,timeZone){return new Intl.DateTimeFormat('en-US',{timeZone,dateStyle:'full',timeStyle:'long'}).format(date);}
  function clocks(){const now=new Date();section.querySelector('#eastern-clock').textContent=format(now,'America/New_York');section.querySelector('#utc-clock').textContent=format(now,'UTC');section.querySelector('#personal-clock').textContent=format(now,zone.value);}
  // Preserve the unknown fraction of the recorded game day instead of inventing midnight.
  function gameDates(date){
    const elapsed=(+date-Date.parse('2026-09-30T16:25:05Z'))/3600000;
    const base=1015*300+10*25+5;
    function describe(serial){const year=Math.floor(serial/300);if(year<1)return 'outside the supported AF calendar';const dayOfYear=((serial%300)+300)%300;return `${dayOfYear%25+1} ${months[Math.floor(dayOfYear/25)]}, ${year} AF`;}
    const first=describe(base+Math.floor(elapsed));const last=describe(base+Math.ceil(elapsed));
    return first===last?first:first+' or '+last;
  }
  // Resolve wall time against UTC candidates; reject skipped or repeated local times.
  function convert(){const input=section.querySelector('#event-eastern').value;const out=section.querySelector('#converted-time');if(!input){out.textContent='Choose a date and time above.';return;}
    const wall=new Date(input+'Z');if(!Number.isFinite(+wall)){out.textContent='Choose a valid date and time.';return;}
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:inputZone.value,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
    const candidates=Array.from({length:113},(_,i)=>(i-56)/4).map(offset=>new Date(+wall+offset*3600000)).filter(date=>{const p=Object.fromEntries(parts.formatToParts(date).map(p=>[p.type,p.value]));return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`===input;});
    if(!candidates.length){out.textContent='This local time does not exist during a clock change, or is outside the supported time-zone range. Choose another time.';return;}
    if(candidates.length>1){out.textContent='This local time occurs twice when clocks turn back. Enter the event in GMT / UTC to make it unambiguous.';return;}
    const date=candidates[0];out.replaceChildren();
    for(const [label,value] of [['GMT / UTC',format(date,'UTC')],['Eastern',format(date,'America/New_York')],['Selected time zone',format(date,zone.value)],['ACHAEA · estimated',gameDates(date)]]){const p=document.createElement('p');const strong=document.createElement('strong');strong.textContent=label+': ';p.append(strong,document.createTextNode(value));out.append(p);}
  }
  zone.addEventListener('change',()=>{clocks();convert();});section.querySelector('#event-eastern').addEventListener('input',convert);clocks();setInterval(clocks,1000);
  inputZone.addEventListener('change',convert);
  function render(){const year=Number(section.querySelector('#game-year').value);const grid=section.querySelector('#navy-months');grid.replaceChildren();if(!Number.isInteger(year)||year<1||year>99999)return;
    months.forEach(month=>{const card=document.createElement('article');const title=document.createElement('h4');title.textContent=month;card.append(title);const days=document.createElement('div');days.className='navy-days';for(let day=1;day<=25;day++){const button=document.createElement('button');button.type='button';button.textContent=day;button.setAttribute('aria-label',`${day} ${month}, ${year} AF`);button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');section.querySelector('#game-day-details').textContent=`${day} ${month}, ${year} AF — no confirmed Navy event recorded. Real-world time awaiting confirmation.`;});const shared=window.merchantSchedule; if(shared?.events.some(e=>e.year===year&&e.month===month&&e.day===day))button.classList.add('shared-event-day'); button.addEventListener('click',()=>window.dispatchEvent(new CustomEvent('merchant-calendar-day',{detail:{year,month,day}}))); days.append(button);}card.append(days);grid.append(card);});
    section.querySelector('#game-day-details').textContent='No Navy event dates have been announced yet.';
  }
  section.querySelector('#game-year').addEventListener('input',render);window.addEventListener('merchant-schedule-loaded',render);render();
})();
