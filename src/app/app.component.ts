import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private storage: Storage) {
    platform.ready().then(() => {
      this.storage.get('user')
      .then((resolve) => {
        if (resolve.length >0) {
          this.rootPage = StartPage
        } else {
          this.rootPage = HomePage;
        }
      })
      .catch((error) => {
        this.rootPage = HomePage;
      })
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

