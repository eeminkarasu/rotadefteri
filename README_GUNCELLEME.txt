ROTADEFTERİ v5 — GÜNCELLEME PAKETİ
=================================

Bu sürüm v4 dosyasındaki Firebase kullanıcı ayrımını ve Firestore veri yollarını
koruyarak kararlılık, mobil kullanım ve senkronizasyon sorunlarını düzeltir.

ÖNE ÇIKANLAR
------------
- Google/Firebase giriş hata mesajları iyileştirildi.
- Kullanıcı UID bazlı veri izolasyonu korundu.
- Hesap değişiminde kullanıcı verisi karışma riski giderildi.
- Senkronizasyon artık yalnızca değişen kayıtları yazar.
- Durağı Düzenle ve durak haritası sorunları düzeltildi.
- Mobil üst alan / safe-area / dokunmatik buton erişimi düzeltildi.
- Yeni rota ekranı gerçek durak seçimi ve sıralama kazandı.
- Büyük rotalar OSRM servisine parçalara ayrılarak gönderilir.
- Navigasyon durak durumları, 100 m otomatik tamamlama ve aktif/pasif durak
  davranışı birlikte çalışacak şekilde düzenlendi.
- PWA manifest, service worker ve ikonlar eklendi.
- Firebase Hosting dağıtım yapılandırması eklendi.

Tüm ayrıntılar: CHANGELOG_V5.txt
Kurulum: README_FIREBASE_KURULUM.txt

---
V5 GÖRSEL YENİLEME NOTU
- index.html ve rotadefteri.html dosyalarına yeni koyu/neon mavi arayüz stili eklendi.
- Üst bar, ana sayfa, rotalar, duraklar, ayarlar, rota kartları ve giriş ekranı görsel olarak yenilendi.
- icons klasörüne yeni logo ve ikonlar eklendi:
  brand-mark.svg, app-icon.svg, nav-home.svg, nav-routes.svg, nav-stops.svg, nav-settings.svg, nav-navigation.svg
- icon-180.png, icon-192.png ve icon-512.png dosyaları yeni tasarımla güncellendi.


GOOGLE MAPS ENTEGRASYONU
- Görsel yenilenmiş sürüm korunmuştur.
- Google Maps API anahtarı index.html ve rotadefteri.html içine bağlanmıştır.
- Service worker önbellek sürümü yenilenmiştir; GitHub Pages güncellemesinde eski görünüm/API ayarının takılı kalması engellenir.
