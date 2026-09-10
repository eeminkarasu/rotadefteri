const BUILD='v7-5-clean';
const SHELL_CACHE='rotadefteri-shell-'+BUILD;
const RUNTIME_CACHE='rotadefteri-runtime-'+BUILD;
const SHELL=['./','./index.html','./firebase-config.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/nav-arrow.svg','./icons/phone.svg','./icons/note.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rotadefteri-')&&![SHELL_CACHE,RUNTIME_CACHE].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
  const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);
  if(req.mode==='navigate'){
    event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{if(res&&res.ok)caches.open(SHELL_CACHE).then(c=>c.put('./index.html',res.clone()));return res}).catch(()=>caches.match('./index.html')));return;
  }
  const same=url.origin===self.location.origin;
  const cdn=['unpkg.com','cdn.sheetjs.com','www.gstatic.com','maps.googleapis.com','maps.gstatic.com'].includes(url.hostname);
  if(!same&&!cdn)return;
  if(same){
    event.respondWith(fetch(req,{cache:'no-store'}).then(res=>{if(res&&res.status<400)caches.open(SHELL_CACHE).then(c=>c.put(req,res.clone()));return res}).catch(()=>caches.match(req)));return;
  }
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{if(res&&res.status<400)caches.open(RUNTIME_CACHE).then(c=>c.put(req,res.clone()));return res})));
});
