const BUILD='v9-9-manual-plan-map';
const SHELL_CACHE='rotadefteri-shell-'+BUILD;
const RUNTIME_CACHE='rotadefteri-runtime-'+BUILD;
const SHELL=['./','./index.html','./rotadefteri.html','./firebase-config.js','./manifest.webmanifest','./js/rd-v9-maplibre.mjs','./js/rd-v98-stability.js','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/brand-mark.svg','./icons/nav-arrow.svg','./icons/phone.svg','./icons/note.svg','./icons/google-maps.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rotadefteri-')&&![SHELL_CACHE,RUNTIME_CACHE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data?.type==='SKIP_WAITING')self.skipWaiting()});
async function networkFirst(req,cacheName,timeoutMs=4500){const cache=await caches.open(cacheName);const ctrl=new AbortController();const t=setTimeout(()=>ctrl.abort(),timeoutMs);try{const res=await fetch(req,{cache:'no-store',signal:ctrl.signal});if(res&&res.ok)cache.put(req,res.clone()).catch(()=>{});return res}catch(err){const hit=await cache.match(req);if(hit)return hit;throw err}finally{clearTimeout(t)}}
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const u=new URL(req.url);if(req.mode==='navigate'){e.respondWith(networkFirst(req,SHELL_CACHE,3500).catch(()=>caches.match('./index.html')));return}if(u.origin!==self.location.origin)return;e.respondWith(networkFirst(req,RUNTIME_CACHE,5000).catch(()=>caches.match(req)))});
