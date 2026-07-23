// Full-text client-side search using lunr.js and data/scraped_wiki.json
async function runSiteSearch() {
  const urlParams = new URLSearchParams(location.search);
  const q = urlParams.get('q');
  if(!q) return;
  const out = document.getElementById('scraped-output');
  if(!out) return;
  out.innerHTML = '<p class="muted">Searching for "'+q+'" …</p>';

  try{
    const r = await fetch('data/scraped_wiki.json');
    if(!r.ok) throw new Error('no data');
    const data = await r.json();
    const pages = (data.pages || []).map(p=>({
      pageid: p.pageid || p.title,
      title: p.title || '',
      extract: p.extract || '',
      fullurl: p.fullurl || ''
    }));

    if (typeof lunr === 'undefined') {
      // fallback to simple substring search
      const term = q.toLowerCase();
      const results = pages.filter(p=> (p.title.toLowerCase().includes(term) || p.extract.toLowerCase().includes(term)));
      renderResults(results.slice(0,10), q, out);
      return;
    }

    // Build lunr index
    const idx = lunr(function(){
      this.ref('pageid');
      this.field('title', {boost: 10});
      this.field('extract');
      // add documents
      pages.forEach(function(p){
        this.add(p);
      }, this);
    });

    // perform search
    let lunrResults = [];
    try{
      lunrResults = idx.search(q + '*'); // wildcard to broaden matches
    }catch(e){
      // If lunr query fails, fallback to a simple search
      lunrResults = [];
    }

    let results = [];
    if(lunrResults.length>0){
      const pageMap = Object.fromEntries(pages.map(p=>[String(p.pageid), p]));
      results = lunrResults.map(r => ({score: r.score, page: pageMap[r.ref]})).filter(x=>x.page);
    } else {
      // fallback substring matching
      const term = q.toLowerCase();
      results = pages.filter(p=> (p.title.toLowerCase().includes(term) || p.extract.toLowerCase().includes(term))).map(p=>({score:0.5, page:p}));
    }

    if(results.length===0){ out.innerHTML = '<p class="muted">No results found in wiki extracts.</p>'; return; }

    const sliced = results.slice(0,12);
    const list = document.createElement('div');
    sliced.forEach(r=>{
      const s = document.createElement('section');
      s.style.marginBottom='12px';
      const h = document.createElement('h4');
      if(r.page.fullurl){
        const a = document.createElement('a'); a.href = r.page.fullurl; a.target='_blank'; a.rel='noopener'; a.textContent = r.page.title; h.appendChild(a);
      } else {
        h.textContent = r.page.title;
      }
      s.appendChild(h);
      const p = document.createElement('p');
      const snippet = (r.page.extract || '').replace(/\n+/g,' ').slice(0,600);
      p.textContent = snippet + (snippet.length>=600? '...':'');
      s.appendChild(p);
      list.appendChild(s);
    });
    out.innerHTML=''; out.appendChild(list);

  }catch(e){ out.innerHTML = '<p class="muted">Search failed: '+e.message+'</p>' }
}

function renderResults(docs, q, out){
  if(docs.length===0){ out.innerHTML = '<p class="muted">No results found in wiki extracts.</p>'; return; }
  const list = document.createElement('div');
  docs.forEach(p=>{
    const s = document.createElement('section');
    s.style.marginBottom='12px';
    const h = document.createElement('h4'); h.textContent = p.title; s.appendChild(h);
    const snippet = (p.extract||'').replace(/\n+/g,' ').slice(0,600);
    const pr = document.createElement('p'); pr.textContent = snippet + (snippet.length>=600? '...':''); s.appendChild(pr);
    list.appendChild(s);
  });
  out.innerHTML=''; out.appendChild(list);
}

window.addEventListener('load', runSiteSearch);
