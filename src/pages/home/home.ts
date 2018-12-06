import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public gvars: GlobalvarsProvider) {

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
