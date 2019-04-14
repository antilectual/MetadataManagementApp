import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GlobalDataHandlerProvider } from '../../../providers/global-data-handler/global-data-handler';
import { GlobalvarsProvider } from '../../../providers/globalvars/globalvars';
import { HierarchyControllerProvider } from '../../../providers/hierarchy-controller/hierarchy-controller';
import uuidv4 from 'uuid/v4';

// import { Observable } from 'rxjs/Observable';

//import { Base64 } from '@ionic-native/base64/ngx';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  item: any;
  hierarchyDepth: any;
  uniqueIdentifier: any;

  //String for filtering in html
  uniqueIDCheck = "Unique Identifier";
  newDataObject = {};
  tzOffset: any;
  referredItemName: any;

// navParams.data contains the following:
//  [0] - JSON containing:
//    The selected item's Characteristics (Characteristics)
//    The selected items parent (ChildOf)
//    The selected items children (ParentOf)
//    The selected item's pluralization (Plural)
//  [1] - JSON Containing the fields on the edit page
//  [2] - The depth of the Hierarchy the edit page is reading from
//  [3] - The unique identifier of the specific object being edited
// private base64: Base64
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public dataHandler: GlobalDataHandlerProvider, public gvars: GlobalvarsProvider, public hierarchyGlobals: HierarchyControllerProvider) {
      this.item = navParams.data[0];
      this.hierarchyDepth = navParams.data[1];
      this.uniqueIdentifier = uuidv4();
      let idName = navParams.data[2];
      let idValue = navParams.data[3];
      this. referredItemName = navParams.data[4];
      this.newDataObject[idName] = idValue;
      this.newDataObject[this.uniqueIDCheck] = this.uniqueIdentifier;

      // DEBUG:

      // console.log("ADD PAGE:");
      // console.log(this.uniqueIdentifier);
      // console.log(navParams.data[2]);
      // console.log(navParams.data[3]);
  }

   /**
   * @brief
   * @param
   * @pre
   * @post
   */
   saveEditedData()
   {
     // DEBUG
     // console.log("UniqueID \n" + this.uniqueIdentifier);
     // console.log(this.newDataObject);
     this.dataHandler.addDataObject(this.newDataObject, this.hierarchyDepth);
     this.hierarchyGlobals.setHierarchyIsUpdatedStatus(false, this.hierarchyDepth);
   }

   /**
   * @brief
   * @param
   * @pre
   * @post
   */
   uploadEditedData()
   {
     this.saveEditedData();
     this.dataHandler.pushSavedData(this.hierarchyDepth, this.newDataObject);
   }

  camelize(str) {
    return str.replace(/(\w+)|/g, function(match, p1, p2) {
      if (p1) {return p1.charAt(0).toUpperCase() + p1.substring(1)};
      if (p2) {return p2 = ''};
  });
}
}
