'use strict';
(() => {
  const capturedInLog = new Set([
    'basiccommands','mapnew','shiptypes','sunk','underattack',
    'ammo','combattraining','combatvolunteers','nwtcrew','nwtintro','nwtstrategy','sailors'
  ]);

  const sourceFile = topic => capturedInLog.has(topic) ? null : `records/${topic}.txt`;

  const rows = [
    ['Basics','basiccommands','The Quarterdeck','Quick-reference commands'],
    ['Basics','harbourdirections','The Chartroom','Route table'],
    ['Basics','harbours','The Chartroom','Harbour table'],
    ['Basics','mapnew','The Chartroom','Map / chart'],
    ['Basics','progression','The Quarterdeck','Role and progression table'],
    ['Basics','seafaring','The Quarterdeck','Skill reference'],
    ['Basics','ships',"The Ship's Book",'Fleet reference'],
    ['Basics','shiptypes',"The Ship's Book",'Ship comparison'],
    ['Basics','sunk','Battle Stations','Emergency checklist'],
    ['Basics','underattack','Battle Stations','Emergency guide'],
    ['Basics','welcome','The Quarterdeck','Onboarding'],
    ['Basics','whatnow','The Quarterdeck','First-steps guide'],

    ['Specialisations','command','The Watch Bill','Role reference'],
    ['Specialisations','deckhand','The Watch Bill','Role reference'],
    ['Specialisations','helm','The Watch Bill','Role reference'],
    ['Specialisations','specialisations','The Watch Bill','Specialisation table'],
    ['Specialisations','specialists','The Watch Bill','Teacher / specialist list'],
    ['Specialisations','watch','The Watch Bill','Role reference'],
    ['Specialisations','weapons','The Watch Bill','Role reference'],

    ['Combat','ammo','Battle Stations','Ammunition table'],
    ['Combat','combattraining','Battle Stations','Training scenarios'],
    ['Combat','combatvolunteers','Battle Stations','Volunteer reference'],
    ['Combat','nwtcrew','Battle Stations','Tactical crew guide'],
    ['Combat','nwtintro','Battle Stations','Tactical introduction'],
    ['Combat','nwtstrategy','Battle Stations','Tactical strategy guide'],
    ['Combat','sailors','Battle Stations','Sailor record'],
    ['Combat','targetlist','Battle Stations','Searchable target table'],

    ['Activities','bounties','The Voyage Board','Bounty reference'],
    ['Activities','deepseadiving','The Hunting Chart','Diving guide'],
    ['Activities','deepseatreasure','The Hunting Chart','Treasure reference'],
    ['Activities','kraken','The Hunting Chart','Creature guide'],
    ['Activities','seamonsterareas','The Hunting Chart','Area table'],
    ['Activities','seamonsters','The Hunting Chart','Bestiary'],
    ['Activities','shiptrades',"The Merchant's Ledger",'Trade guide'],
    ['Activities','tradecargo',"The Merchant's Ledger",'Cargo table'],
    ['Activities','tradedealchart',"The Merchant's Ledger",'Deal chart'],
    ['Activities','trademath',"The Merchant's Ledger",'Calculator / formula'],
    ['Activities','traderewards',"The Merchant's Ledger",'Rewards table'],
    ['Activities','traderouteguide',"The Merchant's Ledger",'Route guide'],
    ['Activities','voyagelist','The Voyage Board','Voyage table'],
    ['Activities','voyages','The Voyage Board','Voyage guide'],

    ['Guides','buyingaship',"The Ship's Book",'Buying guide'],
    ['Guides','crew',"The Ship's Book",'Crew guide'],
    ['Guides','mapold','The Chartroom','Historical map'],
    ['Guides','needammo',"The Ship's Book",'Readiness checklist'],
    ['Guides','newship',"The Ship's Book",'New-ship checklist'],
    ['Guides','seaspells',"The Ship's Book",'Sea-spell table'],
    ['Guides','shipequipment',"The Ship's Book",'Equipment table'],
    ['Guides','shipfitting',"The Ship's Book",'Fitting guide'],
    ['Guides','statues','The Chartroom','Statue locations'],

    ['Misc','cityships',"The Ship's Book",'Hashani fleet table']
  ].map(([sourceSection, topic, websiteSection, presentation]) => ({
    sourceSection,
    topic,
    websiteSection,
    presentation,
    status: 'Captured',
    sourcePath: sourceFile(topic),
    sourceNote: capturedInLog.has(topic)
      ? 'Captured in the supplied 1 October 2026 Navy session log; individual repository extraction is pending.'
      : 'Individual source file is archived in the repository.'
  }));

  window.HN_SCROLL_REGISTRY = rows;

  const targetRows = [
    ['def','TLS Defiance','MHALDOR'],['hok','The Hokulea',''],['tfm','The Forbidden Maiden',''],
    ['obh','Obsidian Heart',''],['acci','The Acseapiter',''],['fuo','Forward Unto Oblivion',''],
    ['si','Sudden Impulse',''],['inex','TLS Inexorable','MHALDOR'],['hql',"Hailqas'an's Lament",''],
    ['fury',"Shuun'eludiela's Fury",''],['sure','SHIP OUT OF LUCK',''],['hnvc','HNS Verdict of the Court',''],
    ['tul',"Leviathan's Lure",''],['kur','MTC Peshwarian Sea Turtle','TARG NAVY'],
    ['lem','MTC Lemnian Sea Bear','ARTANIS'],['lum',"MTC Luman's Own",'ARTANIS'],
    ['sap','MTC Lumanian Sapphire Sea Dragon','TARG NAVY'],['abs','CTS Absolution','TARG NAVY'],
    ['fer','CTS Fervour','TARG NAVY'],['res','CTS Resilient','TARG NAVY'],['oak','Oaken Spirit','LANDON'],
    ['pen','Penultimate Word','LANDON'],['sea','Sea Talvace','LANDON'],['sir','The Siren of Black Waters','LANDON'],
    ['cat','ENS Cataclysm','ELEUSIS'],['que','ENS Queen Titania','ELEUSIS'],['san','ENS Sanguine Rose','ELEUSIS'],
    ['lio','SHS Lion, Raven, and Wolf','LANDON'],['kuy','MTC Lumanian Sea Badger','TARG NAVY'],
    ['inq','CTS Inquisitor','TARG NAVY'],['inc',"MTC Jaru's Inconceivable Dawn",'TARG NAVY'],
    ['clo',"MTC Cloudfall's Sunshine Tea",'TARG NAVY'],['las','Last Word','LANDON']
  ];

  const archive = document.getElementById('all-scrolls');
  if (archive) {
    const counts = rows.reduce((acc, row) => {
      acc[row.sourceSection] = (acc[row.sourceSection] || 0) + 1;
      return acc;
    }, {});
    const registry = document.createElement('details');
    registry.id = 'source-registry';
    registry.className = 'source-registry';
    registry.innerHTML = `
      <summary><strong>HN Master Registry — 51 / 51 captured</strong><span class="small">Original HN headings preserved</span></summary>
      <div class="registry-counts">
        ${Object.entries(counts).map(([name,count]) => `<span><strong>${count}</strong> ${name}</span>`).join('')}
      </div>
      <div class="table-scroll">
        <table class="registry-table">
          <thead><tr><th>HN heading</th><th>Scroll</th><th>Website section</th><th>Presentation</th><th>Source</th></tr></thead>
          <tbody>
            ${rows.map(row => `<tr>
              <td>${row.sourceSection}</td>
              <td><code>CLHELP ${row.topic.toUpperCase()}</code></td>
              <td>${row.websiteSection}</td>
              <td>${row.presentation}</td>
              <td>${row.sourcePath ? `<a href="${row.sourcePath}">Archived file</a>` : 'Captured session log'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>`;
    const searchLabel = archive.querySelector('label[for="scroll-search"]');
    archive.insertBefore(registry, searchLabel || null);
  }

  rows.forEach(row => {
    const record = document.getElementById(`scroll-${row.topic}`);
    if (!record) return;
    const status = record.querySelector('summary .small');
    if (status) status.textContent = `${row.websiteSection} · Captured`;
    const p = record.querySelector('p');
    if (p && row.topic === 'targetlist') {
      p.innerHTML = 'Exact source received 1 October 2026. <a href="records/targetlist.txt">Open the preserved TARGETLIST scroll.</a>';
    } else if (p && capturedInLog.has(row.topic)) {
      p.textContent = row.sourceNote;
    }
  });

  const battle = document.querySelector('#battle-stations .reference-body');
  if (battle) {
    const targetPanel = document.createElement('section');
    targetPanel.className = 'activity-detail';
    targetPanel.id = 'target-list-reference';
    targetPanel.innerHTML = `
      <div class="at-glance">
        <p class="label">TARGET LIST · AUROLA · 18 MAYAN 974 AF</p>
        <h3>Common ship target shortnames</h3>
        <p>The scroll instructs Hashani ships to keep the same target list. A vessel appearing here is not independently labelled hostile by this site; affiliations are reproduced only where the source supplies one.</p>
        <label for="target-search">Find a shortname, ship, or affiliation</label>
        <input id="target-search" type="search" placeholder="Try def, Verdict, or LANDON" autocomplete="off">
        <div class="table-scroll">
          <table class="target-table"><thead><tr><th>Shortname</th><th>Ship</th><th>Affiliation</th></tr></thead>
          <tbody>${targetRows.map(([shortname,name,affiliation]) => `<tr data-target-search="${(shortname+' '+name+' '+affiliation).toLowerCase()}"><td><code>${shortname}</code></td><td>${name}</td><td>${affiliation || '—'}</td></tr>`).join('')}</tbody></table>
        </div>
        <p class="small"><a href="records/targetlist.txt">Read the exact TARGETLIST source</a>.</p>
      </div>`;
    battle.append(targetPanel);
    const targetSearch = targetPanel.querySelector('#target-search');
    targetSearch.addEventListener('input', () => {
      const q = targetSearch.value.trim().toLowerCase();
      targetPanel.querySelectorAll('tbody tr').forEach(tr => { tr.hidden = !tr.dataset.targetSearch.includes(q); });
    });
  }
})();
