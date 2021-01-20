import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {


  categories: any = [];

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
    this.categories = [];
    this.loadCategory();
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

  async categoyCrud(a){
    this.router.navigate(['/category-edit/' + a]);
  }

}
