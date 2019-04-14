
//import { BrowserModule } from '@angular/platform-browser';
//import { ErrorHandler, NgModule } from '@angular/core';
//import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
// import { HierarchyPage } from '../pages/hierarchy/hierarchy';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HierarchyControllerPage } from '../pages/hierarchy-controller/hierarchy-controller';
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import { Storage } from '@ionic/storage';
import { HierarchyControllerProvider } from '../providers/hierarchy-controller/hierarchy-controller';
import { Platform } from 'ionic-angular';
//import { ReadPage } from '../pages/hierarchy/read/read';
// import { ExamplePage } from '../pages/example/example';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  //Light/Dark themes
  selectedTheme: String;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public gvars: GlobalvarsProvider, public menuCtrl: MenuController, private storage: Storage, public hierarchyGlobals: HierarchyControllerProvider, public plt: Platform) {
      this.initializeApp();

      this.storage.get('configuration').then( data =>
      {
        // console.log("App Config Data = ");
        // console.log(data);
        if(data != null)
        {
          console.log("data != null");
          this.hierarchyGlobals.setDataSynced(data['isDataSynced']);
        }
      });
      // console.log("Platforms: ");
      // console.log(this.plt.platforms());

      // SET PLATFORM
      if(this.plt.is('ios'))
      {
          this.gvars.setPlatform('IOS');
      }
      else if (this.plt.is('android'))
      {
        this.gvars.setPlatform('android');
      }
      else if (this.plt.is('mobileweb'))
      {
        this.gvars.setPlatform('android');
      }
      else if (this.plt.is('core'))
      {
        this.gvars.setPlatform('web');
      }
      else
      {
        this.gvars.setPlatform('android');
      }

      // TODO: Make this acquired from the device

      // TODO: Get online status from device
      this.gvars.setOnline(true);
      this.gvars.getTheme().subscribe(val => this.selectedTheme = val);

      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'About', component: AboutPage },
        // { title: 'Example', component: ExamplePage},
        { title: 'Metadata Entry', component: HierarchyControllerPage },
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
