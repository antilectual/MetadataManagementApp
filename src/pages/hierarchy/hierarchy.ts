
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReadPage } from './read/read';



// @IonicPage()
@Component({
  selector: 'page-hierarchy',
  templateUrl: 'hierarchy.html',
})
export class HierarchyPage {

  public items: any;
  public hierarchyTop: any;
  i = 0;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams) {
    if(navParams.get('i') == null)
    {
      this.i = 0;
    }
    else
    {
      this.i = navParams.get('i');
    }

    this.getData(this.i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HierarchyPage');
  }


  getData(i){
    let local = '../../assets/data/db.json';
    let data: Observable<any> = this.http.get(local);
    data.subscribe(result => {
      this.items = result;
      this.hierarchyTop = result[i];
      this.i = i + 1;
      console.log(this.hierarchyTop);
      console.log(result);
    });
  }

  push()
  {
    let locali = {i:this.i};
    this.navCtrl.push(HierarchyPage,locali);
  }
}
