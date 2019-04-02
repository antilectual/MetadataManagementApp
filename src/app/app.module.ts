import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { Base64 } from '@ionic-native/base64/ngx';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { HierarchyPage } from '../pages/hierarchy/hierarchy';
import { SettingsPage } from '../pages/settings/settings';
import { ReadPage } from '../pages/hierarchy/read/read';
import { EditPage } from '../pages/hierarchy/edit/edit';
import { AddPage } from '../pages/hierarchy/add/add';
import { HierarchyControllerPage } from '../pages/hierarchy-controller/hierarchy-controller';
import { FormfieldsPage } from '../app/validators/formfields/formfields';
import { FormfieldsAddPage } from '../app/validators/formfields-add/formfields-add';
// import { ExamplePage } from '../pages/example/example';
import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import { GlobalDataHandlerProvider } from '../providers/global-data-handler/global-data-handler';
import { HierarchyControllerProvider } from '../providers/hierarchy-controller/hierarchy-controller';
import { ScrollIndicatorDirective } from '../directives/scroll-indicator/scroll-indicator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    HierarchyPage,
    AboutPage,
    SettingsPage,
    ReadPage,
    EditPage,
    AddPage,
    HierarchyControllerPage,
    FormfieldsPage,
    FormfieldsAddPage,
    ScrollIndicatorDirective
    // ExamplePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    AddPage,
    HierarchyControllerPage,
    EditPage,
    FormfieldsPage,
    FormfieldsAddPage
    // ExamplePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalvarsProvider,
    Base64,
    GlobalDataHandlerProvider,
    HierarchyControllerProvider
  ]
})
export class AppModule {}
