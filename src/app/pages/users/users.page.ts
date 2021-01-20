import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: any = [];
  limit: number = 13;
  start: number = 0;

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
    this.start = 0;
    this.users = [];
    this.loadUsers();
  }
  
  async loadUsers(){
    return new Promise(resolve => {
      let body = {
        action: 'load_users',
        start: this.start,
        limit: this.limit
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        for(let data of res.result) {
          this.users.push(data);
        }
        resolve(true);
      });
    });
  }

  async DeleteUser(a){
    return new Promise(resolve => {
      let body = {
        action: 'delete_user',
        id: a
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        if(res.success == true){
          this.presentToast("Kullanıcı başarıyla silindi.");
          this.ionViewDidEnter();
        } else {
          this.presentToast("Kullanıcı silinemedi.");
        }
      });
    });
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
      this.loadUsers().then(() => {
        //event.target.complete();
      });
    }, 500);
  }

  async openCRUD(a){
    this.router.navigate(['/crud/' + a]);
  }

  async presentToast(a){
    const toast = await this.toastctrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

}
