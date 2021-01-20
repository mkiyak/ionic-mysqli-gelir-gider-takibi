import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';

@Component({
  selector: 'app-gelir-gider-edit',
  templateUrl: './gelir-gider-edit.page.html',
  styleUrls: ['./gelir-gider-edit.page.scss'],
})
export class GelirGiderEditPage implements OnInit {
  datastorage: any;
  islem: string;
  id: number;
  categories: any = [];
  islem_tarihi : string = "";
  aciklama : string = "";
  tutar : string = "";
  category_id : string = "";
  user_id: number;
  disabledbutton;

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private actRounted: ActivatedRoute,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.actRounted.params.subscribe((data: any) => {
      //console.log(data);
      this.id = data.id;
      this.islem = data.islem;
      if(this.id!=0){
        this.loadIslem();
      } 
    });
  }

  ionViewDidEnter(){
    this.storage.get('storage_session').then((res) => {
      //console.log(res);
      this.datastorage = res;
      this.user_id = this.datastorage.user_id;
    });
    this.categories = [];
    this.loadCategory();
    this.disabledbutton = false;
  }
  

  async loadIslem(){
    return new Promise(resolve => {
      let body = {
        action: 'islem_bilgileri',
        id: this.id
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        //console.log(res.result);
        this.aciklama = res.result[0].aciklama;
        this.tutar = res.result[0].tutar;
        this.islem_tarihi = res.result[0].islem_tarihi;
        this.category_id = res.result[0].category_id;
      });
    });
  }

  async loadCategory(){
    return new Promise(resolve => {
      let body = {
        action: 'kategori_listesi'
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        for(let data of res.result) {
          this.categories.push(data);
        }
        resolve(true);
      });
    });
  }

  async Edit(a){
      if(this.islem_tarihi == ""){
        this.presentToast("İşlem tarihi seçiniz.");
      } else if(this.aciklama == ""){
        this.presentToast("Açıklama giriniz.");
      } else if(this.tutar == ""){
        this.presentToast("Tutar giriniz");
      } else if(this.category_id == "" && this.islem == 'gider'){
        this.presentToast("Şifre giriniz.");
      } else {
        this.disabledbutton = true;
        const loading = await this.loadingctrl.create({
          message : "Kayıt işlemi"
        });
        await loading.present();

        return new Promise(resolve => {
          let body = {
            id: this.id,
            islem: this.islem,
            action: 'islem_edit',
            islem_tarihi: this.islem_tarihi,
            aciklama: this.aciklama,
            tutar: this.tutar,
            category_id: this.category_id,
            user_id: this.user_id,
            crudAct: a
          }
          this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
            if(res.success = true){
              loading.dismiss();
              this.disabledbutton = false;
              this.presentToast(res.msg);
              console.log(res.msg);
              this.router.navigate(['/home']);
            } else {
              loading.dismiss();
              this.disabledbutton = false;
              this.presentAlertConfirm(res.msg, a);
            }
          }, (err) => {
            loading.dismiss();
            this.disabledbutton = false;
            this.presentAlertConfirm('Zaman aşımı', a);
          });
        });
      }
  }

  async presentToast(a){
    const toast = await this.toastctrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  async presentAlertConfirm(a, b) {
    const alert = await this.alertctrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'İptal et',
          handler: (blah) => {
            console.log('İptali onayla: blah');
          }
        }, {
          text: 'Tekrar dene',
          handler: () => {
            this.Edit(b);
          }
        }
      ]
    });

    await alert.present();
  }

}
