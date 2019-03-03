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

      this.item = navParams.data[0];
      this.dataObject = navParams.data[1];
      // DEBUG:
      //console.log(this.dataURI);
      //If there is a photo, display image
      if(navParams.data[1].Photo != null){
        this.image = "data:image/png;base64,"+ navParams.data[1].Photo;
      }
      //console.log(this.image);
  }


}
