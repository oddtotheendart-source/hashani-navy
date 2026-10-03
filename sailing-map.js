/* Full-resolution chart opens separately for native browser zoom. */
(() => {
  const panel=document.createElement('section');
  panel.id='sailing-map';panel.className='sailing-map';
  panel.innerHTML='<p class="label">THE CHARTROOM · COMPLETE CHART</p><h3>Achaea sailing map</h3><p>Open the full-size map in a new tab or window. Click the image there to enlarge it, then scroll to the area you need. You can also use your browser’s zoom controls.</p><a class="sailing-map-preview" href="Achaea_Map_Complete.png" target="_blank" rel="noopener" aria-label="Open the full-size Achaea sailing map in a new tab or window"><img src="Achaea_Map_Complete.png" alt="Preview of the complete Achaea sailing map" loading="lazy" width="3797" height="9731"></a><p><a href="Achaea_Map_Complete.png" target="_blank" rel="noopener">Open full-size map ↗</a> · <a href="Achaea_Map_Complete.png" download>Download map</a></p>';
  document.querySelector('#chartroom .reference-body').prepend(panel);
  const style=document.createElement('style');
  style.textContent='.sailing-map{margin-bottom:2rem}.sailing-map h3{font-size:1.7rem}.sailing-map-preview{display:inline-block;max-width:100%;border:1px solid #ae9055;background:#05080c;padding:.5rem}.sailing-map-preview img{display:block;width:auto;height:360px;max-width:100%;object-fit:contain}@media(max-width:600px){.sailing-map-preview img{height:300px}}';
  document.head.append(style);
  if(location.hash==='#sailing-map')openDestination();
})();
