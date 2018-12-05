
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HierarchyPage');
  }


  getData(){
    let local = '../../assets/data/db.json';
    let data: Observable<any> = this.http.get(local);
    data.subscribe(result => {
      this.items = result;
      console.log(result);
    });
  }

  push()
  {
    this.navCtrl.push(ReadPage);
  }
}
