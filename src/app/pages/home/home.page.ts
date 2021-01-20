import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage: any;
  name: string;
  users: any = [];
  limit: number = 13;
  start: number = 0;
  giderlist: any = [];
  gelirlist: any = [];
  toplam_kazanc: string;

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private navctrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_session').then((res) => {
      //console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.fullname;
    });
    
    this.start = 0;
    this.giderlist = [];
    this.gelirlist = [];
    this.GiderListesi();
    this.GelirListesi();
    this.ToplamKazanc();
  }

  async openIslem(id){
    this.router.navigate(['/gelir-gider-icerik/' + id]);
  }

  async tryLogout(){
    this.storage.clear();
    this.navctrl.navigateRoot('/login');
    const toast = await this.toastctrl.create({
      message: 'Çıkış Yapılıyor..',
      duration: 1500
    });
    toast.present();
  }

  async presentToast(a){
    const toast = await this.toastctrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async GelirListesi(){
    return new Promise(resolve => {
      let body = {
        action: 'gelir_gider_listesi',
        islem: "gelir", 
        start: 0,
        limit: 4
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        for(let data of res.result) {
          this.gelirlist.push(data);
        }
        resolve(true);
      });
    });
  }

  async GelirGiderDelete(a){
    return new Promise(resolve => {
      let body = {
        action: 'islem_delete',
        id: a
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        if(res.success == true){
          this.presentToast("Kayıt başarıyla silindi.");
          this.ionViewDidEnter();
        } else {
          this.presentToast("Kullanıcı silinemedi.");
        }
      });
    });
  }

  async EditIslem(a, islem){
    this.router.navigate(['/gelir-gider-edit/' + islem + '/' + a]);
  }
  

  async ToplamKazanc(){
    return new Promise(resolve => {
      let body = {
        action: 'kazanc_hesabi'
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        //console.log(res);
        this.toplam_kazanc = res.result[0].toplam_kazanc;
      });
    });
  }

  async GiderListesi(){
    return new Promise(resolve => {
      let body = {
        action: 'gelir_gider_listesi',
        islem: "gider", 
        start: 0,
        limit: 4
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        for(let data of res.result) {
          this.giderlist.push(data);
        }
        resolve(true);
      });
    });
  }
  
  userPage(){
    this.router.navigate(['/users']);
  }
  
  categoryPage(){
    this.router.navigate(['/category']);
  }

  GelirGiderList(a){
    this.router.navigate(['/gelir-gider-list/' + a]);
  }

  async doRefresh(event){
    const loading = await this.loadingctrl.create({
      message : 'Sayfa güncelleniyor..',
    });

    await loading.present();

    this.ionViewDidEnter();
    event.target.complete();
    loading.dismiss();
  }
  
}
