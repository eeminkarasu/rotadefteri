import * as maplibregl from 'https://unpkg.com/maplibre-gl@6.19.0/dist/maplibre-gl.mjs';
window.maplibregl = maplibregl;
window.dispatchEvent(new CustomEvent('rd-maplibre-ready'));
