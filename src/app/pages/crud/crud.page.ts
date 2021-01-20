import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { resolve } from 'dns';
import { runInThisContext } from 'vm';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  id: number;
  fullname : string = "";
  gender : string = "";
  datebirth : string = "";
  email : string = "";
  password : string = "";
  passwordconfirm : string = "";
  disabledbutton;

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private actRounted: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRounted.params.subscribe((data: any) => {
      //console.log(data);
      this.id = data.id;

      if(this.id!=0){
        this.loadUser();
      } 
    });
  }

  async loadUser(){
    return new Promise(resolve => {
      let body = {
        action: 'kullanici_bilgileri',
        id: this.id
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        //console.log(res.result);
        this.fullname = res.result[0].fullname;
        this.gender = res.result[0].gender;
        this.datebirth = res.result[0].datebirth;
        this.email = res.result[0].email;
      });
    });
  }

  ionViewDidEnter() {
    this.disabledbutton = false;
  }

  async crudAction(a){
      if(this.fullname == ""){
        this.presentToast("Ad soyad giriniz.");
      } else if(this.gender == ""){
        this.presentToast("Cinsiyet seçiniz.");
      } else if(this.datebirth == ""){
        this.presentToast("Doğum tarihi seçiniz.");
      } else if(this.email == ""){
        this.presentToast("E-Posta adresi giriniz.");
      } else if(this.password == "" && this.id == 0){
        this.presentToast("Şifre giriniz.");
      } else if((this.password != this.passwordconfirm) && this.id == 0){
        this.presentToast("Şifreler eşleşmiyor.");
      } else {
        this.disabledbutton = true;
        const loading = await this.loadingctrl.create({
          message : "Giriş"
        });
        await loading.present();

        return new Promise(resolve => {
          let body = {
            id: this.id,
            action: 'crud_progress',
            fullname: this.fullname,
            gender: this.gender,
            datebirth: this.datebirth,
            email: this.email,
            password: this.password,
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
            this.crudAction(b);
          }
        }
      ]
    });

    await alert.present();
  }

}
