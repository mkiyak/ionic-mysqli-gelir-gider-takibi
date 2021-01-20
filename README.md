 <h1><b>Ionic Mysqli Gelir/Gider Takibi</b></h1>


 <h3><code><b>Mehmet KIYAK - 180201135</b></code></h3>

<p style="text-align:justify"><b>Gelir/Gider Takip</b> uygulaması ile market, eğlence, fatura gibi giderleri basit bir şekilde yönetilmesi ve maaş veya prim gibi gelirlerin tutulabileceği basit kullanıma sahiptir.  </p>
<p style="text-align:justify">Proje içerisinde gider eklerken kategori türleri tanımlayarak harcaların nerelere yapıldığı hakkında kayıtlar tutulabilmektedir.</p>


<p></p>
<h3 style="text-align:center">Kurulum İşlemleri</h3>

Bu projemizin altyapısında Ionic, Angular, Typescript kullanılmaktadır. Projenin temel yapısını oluşturmak için gerekli aşamalar aşağıdaki gibidir:

<ul>
  <li>NodeJs indirme</li>
  <li>Ionic/Angular Kurulumu</li>
  <li>Database Bağlantıları / Sayfa Kurulumları</li>
</ul>

<h3><code>1- NodeJs İndirme</code></h3>
Bu projeyi gerçekleştirebilmeniz için öncelikle NodeJs'i indirmeniz gerekmektedir. Çünkü projemizin alt yapısında angular, ionic ve typescript kullanılıyor. Bu sistemlerin çalışabilmesi için <a href="https://nodejs.org/tr/download/">buraya tıklayarak</a> NodeJs'i bilgisayarınıza indirin.
<br></br>
<p>Kullandığınız sisteme bağlı olarak linux ya da windows için gerekli projeleri indirin. Bu işlem tamamlandıktan sonra aşağıda yapmanız gereken adımlar şunlardır:
</p>

<ul>
<li>Terminal ekranından gereken komutları yazabilmeniz için <b>ortam değişkenlerine</b> kullanacağınız sistemin pathini yazmalısınız. </li>
<li>Bunun için indirdiğiniz NodeJs klasörünün içinde bulunan <b>node_modules</b> klasörünün içindeki <b>npm</b> dosyasının pathini eklemelisiniz.</li>
<li>Böylelikle ionic, angular ya da gerekli komutları sorunsuz çalıştıracaktır.</li>

</ul>
<code>Node.js kurulumu için şu komutu çalıştırın.</code>

		npm install


<h3><code>2- Ionic/Angular Kurulumu</code></h3>

Projemiz ionic ve angular son sürümleri ile yazılmıştır. Bu yüzden gerekli ionic altyapılarının yüklenmesi gerekmektedir. Öncelikle angular kurulumu için;


		npm install -g @angular/cli

daha sonra Ionic CLI'yi npm ile kurun:

		npm install -g @ionic/cli
        
Ionic CLI'nin daha önce kurulumu varsa, paket adındaki değişiklik nedeniyle kaldırılması gerekecektir.

		npm uninstall -g ionic
		npm install -g @ionic/cli
        
Önceden hazırlanmış uygulama şablonlarından birini kullanarak bir Ionic uygulaması oluşturulabilir fakat biz projemiz de yeni bir başlangıç ​​yapmak için boş bir uygulama oluşturduk. En yaygın üç blank, tabs, sidemenu şablonları mevcuttur. Biz blabk kullanarak boş bir şanlon oluşturarak projemizi geliştirdik. Şu ionic start komutla başlayın :

		ionic start proje_adi blank
        
ve projemiz oluşturulmuş oldu.


<h3><code>3- Database Bağlantıları / Sayfa Kurulumları</code></h3>

<p  style="text-align:justify"> Projeyi oluştururken mysql veri tabanını kullanmayı tercih ettim çünkü php programlama dili yazılımlarımı mysql kullanarak geliştirdiğimden dolayı ionic ve php yi birleştirerek böyle bir proje geliştirirken mysql ile zorlanmayacağımdan mysql veri tabanını kullanarak bu projeyi geliştirdim.</p>
<p>Database işlemlerini gerçekleştirimek için depolama yapacağımız için <b>storage service</b> yapısını kullandım. Bunun çalışması için öncelikle projenize storage için kullanılacak olan ayarlanmaların yapılması gerekmektedir. Bunun için komut satırında şu komutu çalıştırıyoruz;


		npm install @ionic/storage --save
        
 Ayrıca typescript ile yazılmış (.ts uzantılı) modül sayfanıza sayfanızın başına <code><b>import { Storage } from '@ionic/storage';</b></code> ekleyip, constructor kısmına <code><b>private storage: Storage</b></code> yazmalıyız. Daha sonra  bu işlem tamamlandıktan sonra işlemlerimize geçmeden önce php kullanacağımızdan dolayı xampp kontrol panelinin kurulması gerekmektedir. XAMPP'ı <a href="https://www.apachefriends.org/tr/download.html" target="_blank">buradan</a> işletim sisteminize göre indirip kurabilirsiniz.</p>

<p style="text-align:justify">Kurulumdan sonra xampp çalıştırın, kontrol paneli açıldıktan sonra apache, mysql modüllerini çalıştırın aksi durumda xampp tam olarak çalışmadığından php komutlarını çalıştırmamıza izin vermeyecektir.

ionic/ionic-api klasöründe yer alan config.php dosyası içerisinde veri tabanı bağlantı işlemleri yapılmaktadır. Bu klasör içerisinde yer alan .sql uzantılı dosyayı phpmyadmin üzerinden kurulum yapabilirsiniz. api.php sayfasında ise veritabanı işlemlerimiz yer almaktadır.

<p>Artık projemiz deki sayfalarımızı oluşturabiliriz. Sayfalarımızı oluşturmak için komut ekranına geliyoruz.</p>

		ng generate page (component_adi)

<p>component_adi alanına sayfalarınızın isimlerini girerek çalıştırabilirsiniz. Kendi projemiz de aşağıdaki sayfaların oluşturulması için şu komutları kulladım.</p>

Anasayfa sayfası için pages klasörü içerisine eklenecek şekilde şu komutu çalıştırdım.

		ng generate page pages/home

Giriş sayfası için,

		ng generate page pages/login

Kayıt Ol sayfası için,

		ng generate page pages/registration

Crud sayfası (kullanıcıları düzenlediğimiz sayfa) için, 

		ng generate page pages/crud

Kategori (Masraf Kalemleri) sayfası için,

		ng generate page pages/category

Kategori Düzenleme sayfası için,

		ng generate page pages/category-edit

Gelir/Gider Listesi sayfası için,

		ng generate page pages/gelir-gider-list

Gelir/Gider Kayıt İçeriği sayfası için,

		ng generate page pages/gelir-gider-icerik

Gelir/Gider Kayıt Ekleme/Düzenleme sayfası için,

		ng generate page pages/gelir-gider-edit

<p>komutlarını çalıştırarak kurulumları gerçekleştirdim.</p>

<p>providers/ klasörü içerisinde php ile bağlantı kurulumları yapmak için access-providers.ts sayfasını oluşturdum ve işlemlerimi orada gerçekleştirdim. 


<h4>Karşılaştığım Sorunlar</h4>

 - ionic back problemi 
 - bazen uygulamayı kapatıp tekrar açtığımda dosya bulunamadı hatası aldım 

<h4> Uygulama </h4>

<img src="http://mavilion.com/github/gelir-gider-takibi.gif" />