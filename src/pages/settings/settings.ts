import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  status: boolean;
  constructor(public navCtrl: NavController, public gvars: GlobalvarsProvider) {
    if(this.gvars.getOnline())
    {
      this.status = true;
    }
    else
    {
      this.status = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  toggleOnline()
  {
    console.log("toggle");
    if(this.gvars.getOnline()){
      this.gvars.setOnline(false);
    }
    else{
      this.gvars.setOnline(true);
    }
    console.log(this.gvars.getOnline());
  }

}
