ROTADEFTERİ v6.5 — E-POSTA/ŞİFRE + MİSAFİR GİRİŞİ
====================================================

Bu paket Firebase projesi "rotadefteri-1a9d1" için hazırlanmıştır.
Firebase Web App yapılandırması firebase-config.js içindedir.

1) FIREBASE AUTHENTICATION
--------------------------
Firebase Console > Authentication > Sign-in method bölümüne girin.

Açılması gereken sağlayıcı:
  Email/Password (E-posta/Şifre) -> ENABLED

Google sağlayıcısı bu sürümde zorunlu değildir. İsterseniz kapalı bırakabilirsiniz.

Uygulamadaki giriş seçenekleri:
- E-posta + şifre ile giriş
- Hesap oluştur
- Şifremi unuttum
- Misafir olarak devam et
- Beni hatırla

2) MİSAFİR MODU
---------------
Misafir kullanıcı Firebase/Firestore'a veri göndermez.
Duraklar, rotalar ve ayarlar yalnızca cihazın tarayıcı localStorage alanında tutulur.

Önemli:
- Uygulama her yeni açılışta, hesapla oturum açılmamışsa giriş ekranını tekrar gösterir.
- Misafir verileri tarayıcı/site verileri temizlenirse veya uygulama kaldırılırsa kaybolabilir.
- Hesap oluştururken "Bu cihazdaki misafir durak ve rotalarımı hesabıma aktar" seçeneği ile
  mevcut misafir verileri yeni hesaba kopyalanabilir.

3) FIRESTORE
------------
Firestore Standard edition ve (default) veritabanı kullanılabilir.
firestore.rules dosyası yalnızca giriş yapan kullanıcının kendi UID alanına erişmesine izin verir:

users/{uid}
users/{uid}/stops/{stopId}
users/{uid}/routes/{routeId}
users/{uid}/settings/app

Misafir kullanıcı Firestore kullanmadığı için kurallar ona hiçbir erişim vermez.

4) GITHUB PAGES
---------------
Repo kökünde index.html bulunmalıdır.
Settings > Pages:
  Source: Deploy from a branch
  Branch: main
  Folder: /(root)

Site örneği:
  https://eeminkarasu.github.io/rotadefteri/

Email/Password girişinde OAuth origin veya redirect URI gerekmez.
Firebase Authorized domains ayarının Email/Password için zorunlu bir OAuth görevi yoktur,
ancak proje ayarlarında eeminkarasu.github.io kaydının kalmasında sakınca yoktur.

5) YEDEK / GERİ YÜKLEME DÜZELTMESİ
------------------------------------
Yeni yedek formatı sürüm 2'dir.
Eski yedek geri yüklenirken:
- Duraklar ve rotalar geri yüklenir.
- Mevcut tema korunur.
- Mevcut harita/görünüm ve güzergah renk/kalınlık ayarları korunur.
- Google Maps API anahtarı mevcut cihazdaki değer olarak korunur.
- Eski yedek içindeki tema ayarı uygulamayı beyaz/uyumsuz görünüme çeviremez.

6) GÜVENLİK
-----------
Firebase Web App config istemci tarafında görülebilir; bu normaldir.
Service Account private key, OAuth client secret veya başka sunucu sırlarını HTML/JS içine koymayın.
Veri güvenliği Authentication + Firestore Security Rules ile sağlanır.
