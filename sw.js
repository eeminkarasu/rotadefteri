const SHELL_CACHE='rotadefteri-shell-v7-3-stops-tabs';
const RUNTIME_CACHE='rotadefteri-runtime-v7-3-stops-tabs';
const SHELL=['./','./index.html','./rotadefteri.html','./firebase-config.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/nav-arrow.svg','./icons/phone.svg','./icons/note.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>![SHELL_CACHE,RUNTIME_CACHE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);
  if(req.mode==='navigate'){
    event.respondWith(fetch(req).then(res=>{const copy=res.clone();caches.open(SHELL_CACHE).then(c=>c.put('./index.html',copy));return res}).catch(()=>caches.match('./index.html')));return;
  }
  if(url.origin===self.location.origin && url.pathname.endsWith('/firebase-config.js')){event.respondWith(fetch(req).then(res=>{caches.open(SHELL_CACHE).then(c=>c.put(req,res.clone()));return res}).catch(()=>caches.match(req)));return;}
  const cacheableSameOrigin=url.origin===self.location.origin;
  const cacheableCdn=['unpkg.com','cdn.sheetjs.com','www.gstatic.com'].includes(url.hostname);
  if(!cacheableSameOrigin&&!cacheableCdn)return;
  event.respondWith(caches.match(req).then(hit=>{
    const network=fetch(req).then(res=>{if(res&&res.status<400)caches.open(cacheableSameOrigin?SHELL_CACHE:RUNTIME_CACHE).then(c=>c.put(req,res.clone()));return res}).catch(()=>hit);
    return hit||network;
  }));
});
