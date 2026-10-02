/* Beginner purchase reference; original scroll remains unchanged and linked. */
(() => {
  const guide = document.querySelector('#guide-buyingaship');
  guide.classList.add('ship-buying');
  guide.querySelector('summary h2').textContent = 'I want to own my own ship';
  guide.querySelector('summary .label').textContent = 'A beginner’s guide to buying a vessel';
  const source = guide.querySelector('.source-box');
  guide.querySelector('.reference-body').innerHTML = `
    <img class="buying-harbour" src="3ships.png" width="1672" height="941" alt="Moonlit harbour with a Windcutter, Seastrider, and War Galley; Ticca Indasha’s nautical quote beneath the ships.">
    <div class="buying-content">
      <p class="buying-kicker">01 / Choose your ship</p>
      <div class="buying-prices">
        <article><h3>Windcutter</h3><p>2.5 million <span>gold</span></p></article>
        <article><h3>Seastrider</h3><p>5 million <span>gold</span></p></article>
        <article><h3>War Galley</h3><p>10 million <span>gold</span></p></article>
      </div>
      <p class="buying-price-note">Base commission prices recorded in <a href="records/buyingaship.txt">CLHELP BUYINGASHIP</a>, without ship commodities.</p>
      <div class="buying-routes">
        <article class="buying-route buying-full">
          <p class="buying-kicker">02 / Full-price route</p><h3>Pay full price</h3>
          <p><strong>No ship commodities required.</strong> Prepare the base gold price for your chosen vessel, then go to the ship vendor.</p>
          <a href="#buying-commission">Continue to commissioning ↓</a>
        </article>
        <article class="buying-route">
          <p class="buying-kicker">03 / Optional discount route</p><h3>Use shipcloth and shiplines</h3>
          <p><strong>Ship commodities are optional. They only reduce the commission cost.</strong></p>
          <ol class="buying-steps">
            <li>Check <code>HELP SHIPTYPES</code> for the useful maximums for your chosen vessel.</li>
            <li>Bring the raw materials to a shipfitter, found with <code>TRADEWHO SHIPFITTING</code>. Ask them to make the maximum useful <strong>shipcloth and shiplines</strong>.</li>
            <li><strong>OUTRIFT the finished ship commodities</strong> so you are holding them outside your rift.</li>
            <li>Go to the ship vendor with those finished commodities held, then follow the commissioning step below.</li>
          </ol>
        </article>
      </div>
      <details class="buying-materials"><summary>Materials for the optional route</summary>
        <p>Recorded quantities for shipcloth and shiplines only. Confirm the maximums in <code>HELP SHIPTYPES</code> before crafting.</p>
        <div class="table-scroll"><table><caption>CLHELP BUYINGASHIP · shipcloth and shiplines</caption><thead><tr><th scope="col">Vessel</th><th scope="col">Finished commodities</th><th scope="col">Raw materials</th></tr></thead><tbody>
          <tr><th scope="row">Windcutter</th><td>150 shipcloth + 150 shiplines</td><td>1,500 iron · 7,500 cloth · 7,500 rope</td></tr>
          <tr><th scope="row">Seastrider</th><td>300 shipcloth + 300 shiplines</td><td>3,000 iron · 15,000 cloth · 15,000 rope</td></tr>
          <tr><th scope="row">War Galley</th><td>600 shipcloth + 600 shiplines</td><td>6,000 iron · 30,000 cloth · 30,000 rope</td></tr>
        </tbody></table></div>
        <p>The source values each shipcloth and each shiplines at 1,750 gold toward the commission. Buying raw materials and paying for crafting affects your total spending; compare those costs with the discount.</p>
      </details>
      <section id="buying-commission" class="buying-completion" aria-labelledby="buying-commission-title">
        <p class="buying-kicker">04 / Both routes meet here</p><h3 id="buying-commission-title">Commission once, then return</h3>
        <ol class="buying-finish">
          <li><span>1</span><div><h4>At the ship vendor</h4><p><code>COMMISSION</code> your chosen vessel <strong>once</strong>. For the discount route, keep the finished ship commodities held outside your rift.</p></div></li>
          <li><span>2</span><div><h4>Leave</h4><p>Leave after commissioning.</p></div></li>
          <li><span>3</span><div><h4>Return later</h4><p>Return later to find your completed ship in the harbour.</p></div></li>
        </ol>
        <p><a href="#guide-newship">Next: outfit your new vessel →</a></p>
      </section>
      <div class="buying-provenance"><p><strong>Sources:</strong> <a href="records/buyingaship.txt">Kuriel’s CLHELP BUYINGASHIP · 849 AF</a> supplies prices, discounts, and material quantities. <a href="records/shipfitting.txt">CLHELP SHIPFITTING</a> confirms the commodity recipes. The leave-and-return sequence follows Ticca’s supplied buying instructions.</p><p>The buying scroll’s Seastrider example conflicts with its shipcloth/shiplines recommendation. This guide follows the recommendation and breakdown tables; it does not use that conflicting example or promise a fixed total saving.</p></div>
    </div>`;
  const content = guide.querySelector('.buying-content');
  content.append(source);
  document.querySelector('#task-grid').insertAdjacentHTML('beforeend', '<a class="task-card" href="#guide-buyingaship"><span class="number" aria-hidden="true">⚓</span><h3>Own a ship</h3><p>I want to own my own ship</p><span class="arrow" aria-hidden="true">↗</span></a>');
  if (['#guide-buyingaship', '#buying-commission'].includes(location.hash)) openDestination();
})();
