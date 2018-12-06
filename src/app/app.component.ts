
//import { BrowserModule } from '@angular/platform-browser';
//import { ErrorHandler, NgModule } from '@angular/core';
//import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { HierarchyPage } from '../pages/hierarchy/hierarchy';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
//import { ReadPage } from '../pages/hierarchy/read/read';
import { ExamplePage } from '../pages/example/example';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
      this.initializeApp();

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'About', component: AboutPage },
        { title: 'Example', component: ExamplePage},
        { title: 'Hierarchy Navigation', component: HierarchyPage },
        { title: 'Settings', component: SettingsPage },
        { title: 'Logout', component: LoginPage},
      ];
    }

    initializeApp() {
          this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
      });
    }

    openPage(page) {
      this.nav.setRoot(page.component);
    }
}
