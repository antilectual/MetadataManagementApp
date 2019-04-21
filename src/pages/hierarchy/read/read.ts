import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { EditPage } from '../edit/edit';
import { GlobalDataHandlerProvider } from '../../../providers/global-data-handler/global-data-handler';
import { HomePage } from '../../home/home';
import { GlobalvarsProvider } from '../../../providers/globalvars/globalvars';

// import { Base64 } from '@ionic-native/base64/ngx';


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
  // base64Data: any;
  image: any;
  //String for filtering in html
  uniqueIDCheck = "Unique Identifier";

  hierarchyDepth: any;
  tzOffset: any;
  currentDisplayPath: any;
  photoLabel: any;
  // displayTime: any;
  public selectedTheme: String;

// navParams.data contains the following:
//  [0] - JSON containing:
//    The selected item's Characteristics (Characteristics)
//    The selected items parent (ChildOf)
//    The selected items children (ParentOf)
//    The selected item's pluralization (Plural)
//  [1] - The URI to retrieve the metadata from (dataURI)
//  [2] - JSON Containing the info for the next level
  //private base64: Base64
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public dataHandler: GlobalDataHandlerProvider, public gvars: GlobalvarsProvider) {

          this.item = navParams.data[0];
          this.dataObject = navParams.data[1];
          this.hierarchyDepth = navParams.data[2];
          this.currentDisplayPath = navParams.data[3];
          this.gvars.getTheme().subscribe(val => this.selectedTheme = val);

          let characteristics = this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Characteristics;
          let i = 0;
          for(i = 0; i < characteristics.length; i++)
          {
            let ii = i;
            if(characteristics[ii].datatype == "xsd:hexBinary")
            {
               this.photoLabel = characteristics[ii].Label;
            }
          }
          // DEBUG:
          //console.log(this.dataURI);
          //If there is a photo, display image
          if(navParams.data[1][this.photoLabel] != null){
            this.image = "data:image/png;base64,"+ navParams.data[1][this.photoLabel];
          }

          else
          {

            if (this.selectedTheme == 'light-theme')
            {
              this.image = "../assets/imgs/nophoto_black.png";
            }

            else
            {
              this.image = "../assets/imgs/nophoto_white.png";
            }

          }
          this.editDateFields();
          //console.log(this.image);

  }

  editDateFields()
  {
    //if item.Characteristics.datatype == 'xsd:datetime'
    //Debug Logs
    //console.log(this.item["Characteristics"].length);
    for( var i = 0 ; i < this.item["Characteristics"].length ; i++ )
   {
      //console.log(this.item["Characteristics"][i]["datatype"]);
     if(this.item["Characteristics"][i]["datatype"] == 'xsd:datetime')
     {
          //Debug logs
          // console.log(this.dataObject);
         this.dataObject[ this.item["Characteristics"][i]["Label"] ] = this.displayTime(this.item["Characteristics"][i], this.dataObject[ this.item["Characteristics"][i]["Label"] ]);
     }

    }

  }

  /**
  * @brief
  * @pre
  * @post
  */
  displayTime(characteristic, dataIndex)
  {
    // var referenceCalculationLabel;
    // if(characteristic["datatype"] == 'xsd:datetime')
    // {
    //   referenceCalculationLabel = characteristic.TimezoneOffsetLabel;
    // }
    // for(var i=0; i<MAX_CHARACTERISTICS ; i++)
    // {
    //   if(hierarchy[i].Label == referenceCalculationLabel)
    //   {
    //     this.tzOffset = this.dataObject[referenceCalculationLabel];
    //   }
    // }

    if(this.tzOffset == null)
    {
      var time = new Date();
      this.tzOffset = time.getTimezoneOffset();
    }

     var displayDate = new Date(dataIndex);
     var displayTime = new Date(displayDate.getTime() + this.tzOffset * 60 * 1000);
     var hourOffset = this.tzOffset/60;
     displayTime.setHours(displayDate.getHours() - hourOffset);
     //Debug Log
     // console.log(displayDate.getMonth());
     var display = this.pad(displayDate.getMonth() + 1)
                    + '/'
                    + this.pad(displayDate.getDate())
                    + '/'
                    + displayDate.getFullYear()
                    + ',   '
                    + this.pad(displayTime.getHours())
                    + ':'
                    + this.pad(displayTime.getMinutes())
                    + ':'
                    + this.pad(displayTime.getSeconds());

     return display;

  }

  /**
  * @brief adds a leading '0' to single digit number dates to make them 2-digit
  * @param n the numerical digit to 'pad'
  * @pre
  * @post
  */
   pad(n){
     if(n<10)
       return '0' + n;
     else
       return n;
   }

   /**
   * @brief adds a leading '0' to single digit number dates to make them 2-digit
   * @pre
   * @post
   */
   // TODO: Fix this link to the read page to pass the correct data
   goToEdit() {
     this.navCtrl.push(EditPage,[this.item, this.dataObject]);
   }
   goHome() {
     this.navCtrl.setRoot(HomePage);
   }
}
