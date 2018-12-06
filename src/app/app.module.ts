import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { HierarchyPage } from '../pages/hierarchy/hierarchy';
import { SettingsPage } from '../pages/settings/settings';
import { ReadPage } from '../pages/hierarchy/read/read';
import { ExamplePage } from '../pages/example/example';
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HierarchyPage,
    AboutPage,
    SettingsPage,
    ReadPage,
    ExamplePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    HierarchyPage,
    AboutPage,
    SettingsPage,
    ReadPage,
    ExamplePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalvarsProvider
  ]
})
export class AppModule {}