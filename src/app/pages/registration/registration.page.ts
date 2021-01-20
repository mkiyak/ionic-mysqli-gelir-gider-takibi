import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { HAMMER_LOADER } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

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
    private accessproviders: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledbutton = false;
  }

  async tryRegistration(){
    if(this.fullname == ""){
      this.presentToast("Ad soyad giriniz.");
    } else if(this.gender == ""){
      this.presentToast("Cinsiyet seçiniz.");
    } else if(this.datebirth == ""){
      this.presentToast("Doğum tarihi seçiniz.");
    } else if(this.email == ""){
      this.presentToast("E-Posta adresi giriniz.");
    } else if(this.password == ""){
      this.presentToast("Şifre giriniz.");
    } else if(this.password != this.passwordconfirm){
      this.presentToast("Şifreler eşleşmiyor.");
    } else {
      this.disabledbutton = true;
      const loading = await this.loadingctrl.create({
        message : "Giriş"
      });
      await loading.present();

      return new Promise(resolve => {
        let body = {
          action: 'registration_progress',
          fullname: this.fullname,
          gender: this.gender,
          datebirth: this.datebirth,
          email: this.email,
          password: this.password
        }
        this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
          if(res.success = true){
            loading.dismiss();
            this.disabledbutton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);
            //console.log("skladjklsa");
          } else {
            loading.dismiss();
            this.disabledbutton = false;
            this.presentToast(res.msg);
          }
        }, (err) => {
          loading.dismiss();
          this.presentToast('Başarılı Kayıt');
          this.router.navigate(['/login']);
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

  async presentAlertConfirm(a) {
    const alert = await this.alertctrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'İptal etmek',
          handler: (blah) => {
            console.log('İptali onayla: blah');
          }
        }, {
          text: 'Tekrar deneyin',
          handler: () => {
            this.tryRegistration();
          }
        }
      ]
    });

    await alert.present();
  }

}
