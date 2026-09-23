const RD_VERSION='v8.5.17-direct-call';
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys()){if(key.startsWith('rotadefteri-'))await caches.delete(key)}await self.clients.claim()})())});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;if(req.mode==='navigate'||new URL(req.url).origin===self.location.origin){event.respondWith((async()=>{try{return await fetch(req,{cache:'no-store'})}catch(e){const hit=await caches.match(req);if(hit)return hit;throw e}})())}});
