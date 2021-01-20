import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public navctrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    /*this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });*/


    this.storage.get('storage_session').then((res) => {
      if(res == null){
        this.navctrl.navigateRoot('/login');
      } else {
        this.navctrl.navigateRoot('/home');
      }
    });
  }
}
