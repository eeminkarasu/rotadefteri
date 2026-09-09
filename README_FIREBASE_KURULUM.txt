ROTADEFTERİ v6.4 — FIREBASE + GOOGLE GİRİŞ KURULUMU
=================================================

Bu paket mevcut Firebase projesi "rotadefteri-1a9d1" için hazırlanmıştır.
Firebase Web App yapılandırması firebase-config.js içinde korunmuştur.

EN KOLAY KURULUM — FIREBASE HOSTING
-----------------------------------
1. Windows'ta Node.js kurulu olmalıdır.
2. Komut İstemi / PowerShell:
      npm install -g firebase-tools
3. ZIP'i klasöre çıkarın.
4. DEPLOY_FIREBASE.bat dosyasını çalıştırın.
5. Firebase hesabınızla giriş yapın.
6. Script Hosting ve Firestore Rules'u deploy eder.

Google girişi için uygulamayı file:// ile açmayın. HTTP/HTTPS gerekir.

AUTH/UNAUTHORIZED-DOMAIN HATASI
-------------------------------
Şu hata görülürse:
  Firebase: This domain is not authorized for OAuth operations
  (auth/unauthorized-domain)

Firebase Console:
  Authentication > Settings > Authorized domains

bölümüne uygulamanın çalıştığı alan adını ekleyin.
Örnekler:
  rotadefteri-1a9d1.web.app
  rotadefteri-1a9d1.firebaseapp.com
  kendi-domaininiz.com
  localhost   (yalnızca yerel test gerekiyorsa)

Not: Yeni Firebase projelerinde localhost her zaman otomatik ekli olmayabilir.
Uygulama artık bu hata oluştuğunda eklenmesi gereken mevcut alan adını ekranda
açıkça gösterir.

GOOGLE SIGN-IN
--------------
Firebase Console > Authentication > Sign-in method > Google sağlayıcısı
etkin olmalıdır.

Masaüstü ve mobil cihazlarda Firebase signInWithPopup akışı kullanılır.
signInWithRedirect/getRedirectResult kullanılmaz; bu sayede Safari/Chrome üçüncü taraf
depolama bölümleme sorunu tetiklenmez. Uygulama içinde ayrı OAuth Client ID tutulmaz.
Oturum kalıcılığı LOCAL'dır; tarayıcı tekrar açıldığında hesap korunur.

FIRESTORE
---------
Firestore Database oluşturulmuş olmalıdır. firestore.rules dosyası yalnızca
oturum açmış kullanıcının kendi UID yoluna erişmesine izin verir:

users/{uid}
  profile fields
  users/{uid}/stops/{stopId}
  users/{uid}/routes/{routeId}
  users/{uid}/settings/app

Bir kullanıcı başka bir kullanıcının UID yolunu okuyamaz/yazamaz.

SENKRONİZASYON
--------------
- Cihaz önbelleği kullanıcı UID'sine göre ayrıdır.
- Yalnızca değişen durak/rota/ayar kayıtları buluta yazılır.
- Başka cihazın bu cihaz tarafından henüz görülmeyen kayıtları toplu
  "sil ve yeniden yaz" işlemiyle yanlışlıkla silinmez.
- Uygulama yeniden öne geldiğinde ve bekleyen yerel değişiklik yoksa bulut
  verisi yenilenir.
- İnternet geri geldiğinde bekleyen değişiklik tekrar gönderilir.
- Firestore batch işlemleri 450'lik güvenli gruplar halinde yapılır.

ESKİ VERİ MİGRASYONU / HESAP GÜVENLİĞİ
--------------------------------------
Eski misafir/localStorage verisi yalnızca bir kez ilk uygun Google hesabına
aktarılır. Hesaptan çıkıp başka bir boş hesaba giriş yapıldığında önceki
kullanıcının verileri yeni hesaba taşınmaz.

GOOGLE MAPS / YER ARAMA
-----------------------
Firebase Google girişi ile Google Maps API anahtarı farklı şeylerdir.
Firma/adres arama için Google Maps JavaScript API + Places API anahtarı
Ayarlar ekranından girilebilir. Anahtar yoksa durak konumu seçimi için
OpenStreetMap geri dönüşü çalışır.

Google Maps anahtarını Google Cloud Console'da web sitesi (HTTP referrer)
kısıtlaması ve gerekli API kısıtlamalarıyla sınırlandırmanız önerilir.

YEREL TEST
----------
START_LOCAL.bat bir Python HTTP sunucusu açar:
  http://localhost:8080/

Google girişini localhost'ta test edecekseniz localhost'u Authorized domains
listesine manuel eklemeniz gerekebilir.

GÜVENLİK
--------
Firebase Web App config istemci tarafında görünür olması gereken yapılandırmadır.
Service Account private key veya başka sunucu sırlarını bu klasöre koymayın.
Veri erişim güvenliği Authentication + Firestore Security Rules ile sağlanır.
