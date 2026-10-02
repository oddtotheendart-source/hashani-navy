(() => {
  const months=['Sarapin','Daedalan','Aeguary','Miraman','Scarlatan','Ero','Valnuary','Lupar','Phaestian','Chronos','Glacian','Mayan'];
  const key='hashani-navy-calendar-calibration-v1';
  const form=document.createElement('form');form.className='calendar-sync event-time-tool';
  form.innerHTML=`<h3>Sync with your in-game reading</h3><p>Run <code>DATE</code> in Achaea and paste the returned date below. Pair it with the real-world GMT time when you captured it. You can paste DATE and TIME together; check the capture time against TIME before saving.</p>
    <label for="game-reading">Paste the in-game output</label><textarea id="game-reading" rows="4" placeholder="Paste your DATE output here, including the day, month, and AF year." required></textarea>
    <label for="sync-capture">Real-world capture date and time — GMT / UTC</label><input id="sync-capture" type="datetime-local" step="1" required><button type="button" id="sync-now">Use now (fresh reading)</button>
    <label for="sync-game-clock">Game clock at capture, if known (24-hour Achaean time)</label><input id="sync-game-clock" type="time" step="60"><p class="small">Optional. This is the clock within the Achaean day, not the real-world time returned by TIME. Leave it blank if the output only says “early morning” or another broad period; the planner will keep a two-date estimate.</p>
    <div class="sync-actions"><button type="submit">Sync my calendar</button><button type="button" id="sync-reset">Reset to site reference</button></div><p id="sync-status" role="status"></p><p class="small">Saved for this browser only. Other visitors keep their own calibration. Check a fresh reading after game time changes or server interruptions.</p>`;
  document.querySelector('.event-time-tool').before(form);
  const reading=form.querySelector('#game-reading');const capture=form.querySelector('#sync-capture');const clock=form.querySelector('#sync-game-clock');const status=form.querySelector('#sync-status');let captureEdited=false;
  function now(){capture.value=new Date().toISOString().slice(0,19);captureEdited=false;}
  now();capture.addEventListener('input',()=>captureEdited=true);reading.addEventListener('paste',()=>{if(!captureEdited)now();});form.querySelector('#sync-now').addEventListener('click',now);
  reading.addEventListener('input',()=>{
    const stamps=[...reading.value.matchAll(/\b(\d{4})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2}):(\d{2})\s+GMT\b/g)];
    const values=[...new Set(stamps.map(m=>`${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}`))];
    if(values.length===1){const value=values[0];const date=new Date(value+'Z');if(Number.isFinite(+date)&&date.toISOString().slice(0,19)===value){capture.value=value;captureEdited=true;status.textContent='GMT capture time recognised from the pasted TIME output. Check it, then sync.';}}
    else if(values.length>1)status.textContent='Multiple GMT readings found. Paste one matching DATE/TIME pair and check its capture time.';
  });
  function valid(c){return c&&Number.isInteger(c.year)&&c.year>=1&&c.year<=99999&&Number.isInteger(c.month)&&c.month>=0&&c.month<12&&Number.isInteger(c.day)&&c.day>=1&&c.day<=25&&Number.isFinite(c.capturedAt)&&(c.minute===null||(Number.isInteger(c.minute)&&c.minute>=0&&c.minute<1440));}
  function apply(c,message){window.navyCalibration=c;status.textContent=message;window.dispatchEvent(new Event('navy-calibration-changed'));}
  function describe(c){return `${c.day} ${months[c.month]}, ${c.year} AF${c.minute===null?' (game clock unknown)':` at ${String(Math.floor(c.minute/60)).padStart(2,'0')}:${String(c.minute%60).padStart(2,'0')} Achaean time`}, captured ${new Date(c.capturedAt).toISOString().replace('T',' ').replace('.000Z',' GMT')}.`;}
  try{const saved=JSON.parse(localStorage.getItem(key));if(valid(saved)){capture.value=new Date(saved.capturedAt).toISOString().slice(0,19);captureEdited=true;apply(saved,'Your saved calibration: '+describe(saved));}}catch{status.textContent='No saved calibration loaded. You can sync below.';}
  form.addEventListener('submit',event=>{event.preventDefault();
    const datePattern=new RegExp('\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+(?:of\\s+)?('+months.join('|')+')\\b[\\s,]*(?:(?:in\\s+)?(?:the\\s+)?year\\s+)?(\\d{1,5})\\s*(?:AF\\b|years?\\s+after\\s+the\\s+fall\\s+of\\s+the\\s+Seleucarian\\s+Empire\\b)','gi');
    const dates=[...reading.value.matchAll(datePattern)];const distinct=new Map(dates.map(m=>[[+m[1],m[2].toLowerCase(),+m[3]].join('-'),m]));
    if(distinct.size!==1){status.textContent=distinct.size?'More than one game date found. Paste just the current DATE/TIME reading.':'I could not recognise the date. Include the day, Achaean month, and AF year (for example: 6 Glacian 1015 AF).';return;}
    const match=[...distinct.values()][0];const capturedAt=Date.parse(capture.value+'Z');
    const minute=clock.value?Number(clock.value.slice(0,2))*60+Number(clock.value.slice(3,5)):null;
    const c={year:+match[3],month:months.findIndex(m=>m.toLowerCase()===match[2].toLowerCase()),day:+match[1],capturedAt,minute};
    if(!valid(c)){status.textContent='Check the date: Achaean days run from 1 to 25. A valid GMT capture time is required.';return;}
    let stored=true;try{localStorage.setItem(key,JSON.stringify(c));}catch{stored=false;}
    apply(c,'Calendar synced: '+describe(c)+(stored?' Saved in this browser.':' Active for this visit; browser storage is unavailable.'));
  });
  form.querySelector('#sync-reset').addEventListener('click',()=>{try{localStorage.removeItem(key);}catch{}reading.value='';clock.value='';now();apply(null,'Using the site’s saved Merchants reference again.');});
  if(location.hash==='#navy-calendar')openDestination();
})();

