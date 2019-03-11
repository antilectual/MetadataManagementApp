import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  darkTheme: boolean;
  selectedTheme: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gvars: GlobalvarsProvider) {
    this.gvars.getTheme().subscribe(val => this.selectedTheme = val);

    if(this.selectedTheme === 'dark-theme')
      this.darkTheme = true;
    else
      this.darkTheme = false;

  }

}
