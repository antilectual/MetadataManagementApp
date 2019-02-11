import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  status: any
  currentDate = new Date("2016-07-27T06:45:00Z");
  
  constructor(public navCtrl: NavController, public gvars: GlobalvarsProvider) {
     if(this.gvars.getOnline())
     {
       this.status = 'y';
     }
     else
     {
       this.status = 'n';
     }
  }


}
