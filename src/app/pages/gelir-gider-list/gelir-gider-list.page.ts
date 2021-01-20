import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';

@Component({
  selector: 'app-gelir-gider-list',
  templateUrl: './gelir-gider-list.page.html',
  styleUrls: ['./gelir-gider-list.page.scss'],
})
export class GelirGiderListPage implements OnInit {

  list: any = [];
  limit: number = 15;
  start: number = 0;
  islem: string = "";

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private navctrl: NavController,
    private storage: Storage,
    private actRounted: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRounted.params.subscribe((data: any) => {
      //console.log(data);
      this.islem = data.islem;
    });
  }

  ionViewDidEnter(){
    this.start = 0;
    this.list = [];
    this.loadList();
  }
  
  async loadList(){
    return new Promise(resolve => {
      let body = {
        action: 'gelir_gider_listesi',
        islem: this.islem, // gelir veya gider
        start: this.start,
        limit: this.limit
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        
        for(let data of res.result) {
          this.list.push(data);
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

  async openIslem(id){
    this.router.navigate(['/gelir-gider-icerik/' + id]);
  }

  async EditIslem(a){
    this.router.navigate(['/gelir-gider-edit/' + this.islem + '/' + a]);
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

  async loadData(){
    this.start += this.limit;
    setTimeout(() => {
      //this.loadCategory().then(() => {
        //event.target.complete();
      //});
    }, 500);
  }


  async presentToast(a){
    const toast = await this.toastctrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

}
