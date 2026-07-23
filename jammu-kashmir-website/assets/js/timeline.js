(function(){
  const events = [
    {year:1846, title:'Treaty of Amritsar — Gulab Singh becomes ruler', link:'history.html'},
    {year:1931, title:'Early political unrest in Kashmir', link:'history.html'},
    {year:1947, title:'Instrument of Accession signed', link:'political-analysis.html'},
    {year:1947.5, title:'First Indo-Pakistan conflict & UN involvement', link:'history.html'},
    {year:2019, title:'Abrogation of Article 370 & reorganisation', link:'political-analysis.html'}
  ];
  const root = document.getElementById('timeline-root');
  if(!root) return;
  root.style.display='grid';
  root.style.gridTemplateColumns='1fr';
  root.style.rowGap='12px';
  events.forEach(ev=>{
    const card = document.createElement('div');
    card.className='card';
    card.style.padding='12px';
    card.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><strong>${ev.year}</strong><div><a href="${ev.link}">${ev.title}</a></div></div>`;
    root.appendChild(card);
  });
})();