import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { resolve } from 'dns';

@Component({
  selector: 'app-gelir-gider-icerik',
  templateUrl: './gelir-gider-icerik.page.html',
  styleUrls: ['./gelir-gider-icerik.page.scss'],
})
export class GelirGiderIcerikPage implements OnInit {
  id: number;
  islem_tarihi: string;
  aciklama: string;
  tutar: string;
  kategori_adi: string;
  kullanici_adi: string;
  islem: number;
  datastorage: any;

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
        this.Bilgiler();
      } 
    });
  }

  async Bilgiler(){
    return new Promise(resolve => {
      let body = {
        action: 'islem_bilgileri',
        id: this.id
      }
      this.accessproviders.postData(body, 'api.php').subscribe((res: any) => {
        console.log(res.result);
        this.islem_tarihi = res.result[0].islem_tarihi;
        this.aciklama = res.result[0].aciklama;
        this.tutar = res.result[0].tutar;
        this.kategori_adi = res.result[0].kategori_adi;
        this.kullanici_adi = res.result[0].kullanici_adi;
        this.islem = res.result[0].islem;
      });
    });
  }

}
