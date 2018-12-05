import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-read',
  templateUrl: 'read.html',
})
export class ReadPage {

<<<<<<< HEAD
  item: any;
  hierarchyTop: any;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams) {
      this.item = navParams.data;
=======
  items: any;
  hierarchyTop: any;
  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.getData();
>>>>>>> origin/chris
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadPage');
  }

  getData(){
    let local = '../../assets/data/db.json';
    let data: Observable<any> = this.http.get(local);
    data.subscribe(result => {
<<<<<<< HEAD
      this.item = result;
      this.hierarchyTop = items[0];
=======
      this.items = result;
      this.hierarchyTop = this.items[0];
      console.log(result);
>>>>>>> origin/chris
    });
  }

}
