const ready=()=>window.dispatchEvent(new Event('rd-maplibre-ready'));
if(window.maplibregl){ready();}
else{
  const existing=document.querySelector('script[data-rd-maplibre]');
  if(existing){existing.addEventListener('load',ready,{once:true});}
  else{
    const s=document.createElement('script');
    s.src='https://unpkg.com/maplibre-gl@6.19.0/dist/maplibre-gl.js';
    s.async=true;s.dataset.rdMaplibre='1';s.onload=ready;
    document.head.appendChild(s);
  }
}
