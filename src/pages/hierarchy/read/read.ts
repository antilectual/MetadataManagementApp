import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Base64 } from '@ionic-native/base64/ngx';


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
  base64Data: any;
  image: any;
  //String for filtering in html
  uniqueIDCheck = "Unique Identifier";

  tzOffset: any;

// navParams.data contains the following:
//  [0] - JSON containing:
//    The selected item's Characteristics (Characteristics)
//    The selected items parent (ChildOf)
//    The selected items children (ParentOf)
//    The selected item's pluralization (Plural)
//  [1] - The URI to retrieve the metadata from (dataURI)
//  [2] - JSON Containing the info for the next level [TODO: this is wrong, fix it]
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, private base64: Base64) {
      // DEBUG:
      //console.log(navParams.data);
      this.dataURI = navParams.data[1];
      this.isDataPresent = false;
      // this.dataObject = navParams.data[2];
      this.getData();
      this.item = navParams.data[0];
      // DEBUG:
      //console.log(this.dataURI);
      //If there is a photo, display image
      if(navParams.data[2].Photo != null){
        this.image = "data:image/png;base64,"+ navParams.data[2].Photo;
      }
      //console.log(this.image);
  }

  // DEBUG:
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ReadPage');
  // }
 //Possible async error location (error intermittent)
  getData(){
    let data: Observable<any> = this.http.get(this.dataURI);
    data.subscribe(result => {
      this.dataObject = result;
      this.isDataPresent = true;
    });
  }

}
