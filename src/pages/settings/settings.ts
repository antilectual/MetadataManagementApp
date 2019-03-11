import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
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
  darkTheme: boolean;

  //Light dark themes
  public selectedTheme: String;

  constructor(public navCtrl: NavController, public gvars: GlobalvarsProvider) {
    this.gvars.getTheme().subscribe(val => this.selectedTheme = val);

    if(this.gvars.getOnline())
    {
      this.status = true;
    }
    else
    {
      this.status = false;
    }

    if(this.selectedTheme == 'dark-theme')
      this.darkTheme = true;
    else
      this.darkTheme = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  toggleOnline()
  {
    // DEBUG:
    //console.log("toggle");
    if(this.gvars.getOnline()){
      this.gvars.setOnline(false);
    }
    else{
      this.gvars.setOnline(true);
    }
    // DEBUG:
    // console.log(this.gvars.getOnline());
  }

  toggleTheme()
  {
    if( this.selectedTheme === 'dark-theme'){
      this.gvars.setTheme('light-theme');
      this.darkTheme = false;

    }
    else{
      this.gvars.setTheme('dark-theme');
      this.darkTheme = true;
    }
  }

}
