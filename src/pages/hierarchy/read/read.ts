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

  item: any;
  dataObject: any;
  dataURI: any;
  isDataPresent: boolean;

  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams) {
      this.dataURI = navParams.data[1].dataURI;
      this.isDataPresent = false;
      // this.dataObject = navParams.data[2];
      this.getData();
      this.item = navParams.data[0];
      console.log(this.item);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadPage');
  }

  getData(){
    let data: Observable<any> = this.http.get(this.dataURI);
    data.subscribe(result => {
      this.dataObject = result;
      this.isDataPresent = true;

      console.log(this.dataObject);
    });
  }
}
