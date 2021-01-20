import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { resolve } from 'dns';
import { runInThisContext } from 'vm';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  id: number;
  category_name : string = "";
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
        this.loadCategory();
      } 
    });
  }

  ionViewDidEnter() {
    this.disabledbutton = false;
  }

  async loadCategory(){
    return new Promise(resolve => {
      let body = {
        action: 'kategori_bilgileri',
        id: this.id
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        console.log(res.result);
        this.category_name = res.result[0].category_name;
      });
    });
  }
  
  async CategoryAction(a){
    if(this.category_name == ""){
      this.presentToast("Kategori adı giriniz..");
    } else {
      this.disabledbutton = true;
      const loading = await this.loadingctrl.create({
        message : "kategori editleniyor."
      });
      await loading.present();

      return new Promise(resolve => {
        let body = {
          id: this.id,
          action: 'kategori_edit',
          category_name: this.category_name,
          crudAct: a
        }
        this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
          if(res.success = true){
            loading.dismiss();
            this.disabledbutton = false;
            this.presentToast(res.msg);
            console.log(res.msg);
            this.router.navigate(['/category']);
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
            this.CategoryAction(b);
          }
        }
      ]
    });

    await alert.present();
  }

}
