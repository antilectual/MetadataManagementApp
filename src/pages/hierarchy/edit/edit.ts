import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { GlobalDataHandlerProvider } from '../../../providers/global-data-handler/global-data-handler';
import { GlobalvarsProvider } from '../../../providers/globalvars/globalvars';
import { HierarchyControllerProvider } from '../../../providers/hierarchy-controller/hierarchy-controller';
import { HomePage } from '../../home/home';
//import { Base64 } from '@ionic-native/base64/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  item: any;
  isImage: boolean;//for displaying the add photo button
  dataObject: any;
  dataURI: any;
  isDataPresent: boolean;
  base64Data: any;
  image: any;
  hierarchyDepth: any;
  //String for filtering in html
  uniqueIDCheck = "Unique Identifier";
  uniqueIdentifier: any;
  photoLabel:any;
  tzOffset: any;
  public selectedTheme: String;
  dateLabel: any;

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
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public dataHandler: GlobalDataHandlerProvider, public gvars: GlobalvarsProvider, public hierarchyGlobals: HierarchyControllerProvider, public camera: Camera) {
      this.item = navParams.data[0];
      this.dataObject = Object.assign({}, navParams.data[1]);
      // this.dataObject = navParams.data[1];
      this.hierarchyDepth = navParams.data[2];
      this.uniqueIdentifier = navParams.data[3];
      this.gvars.getTheme().subscribe(val => this.selectedTheme = val);
      // DEBUG:
      //console.log("nav Params \n" + navParams.data[3]);
      //console.log(this.dataURI);
      //If there is a photo, display image
      this.isImage = false;
      let i = 0;
      let characteristics = this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Characteristics;
      for(i = 0; i < characteristics.length; i++)
      {
        let ii = i;
        if(characteristics[ii].datatype == "xsd:hexBinary")
        {
           this.photoLabel = characteristics[ii].Label;
           this.isImage = true;
        }

        else if(characteristics[ii].datatype == "xsd:datetime")
        {
          this.dateLabel = characteristics[ii].Label;
          // console.log(this.newDataObject[this.dateLabel]);

        }
      }

      if(navParams.data[1][this.photoLabel] != null){
        this.image = "data:image/png;base64,"+ navParams.data[1][this.photoLabel];
        // this.isImage = true;
      }

      else if(this.isImage)
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

      // console.log(this.gvars.getPlatform());
      if(this.gvars.getPlatform() == "web")
      {
        this.isImage = false;
      }

      this.editDateFields();
      //DEBUG
      // this.dataObject["Name"] = "It's all WHACK!";
      //console.log(this.image);
  }

  /**
  * @brief
  * @param
  * @pre
  * @post
  */
  editDateFields() {
    //if item.Characteristics.datatype == 'xsd:datetime'
    //Debug Logs
    //console.log(this.item["Charact"].length);
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
  displayTime(characteristic, dataIndex) {
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
   * @brief
   * @param
   * @pre
   * @post
   */
   saveEditedData() {
     if(this.base64Data != null) { this.dataObject[this.photoLabel] = this.base64Data; }
     this.dataHandler.updateDataObject(this.dataObject, this.hierarchyDepth, this.uniqueIdentifier);
     this.hierarchyGlobals.setHierarchyIsUpdatedStatus(false, this.hierarchyDepth);
     this.dataHandler.presetOnlineAlert("Save", "Data saved to device.");

     console.log(this.dateLabel);
   }

   /**
   * @brief Unused - use global-data-handler for uploading data.
   * @param
   * @pre
   * @post
   */
   uploadEditedData() {
     if(this.base64Data != null) { this.dataObject[this.photoLabel] = this.base64Data; }
     this.saveEditedData();
     this.dataHandler.pushSavedData(this.hierarchyDepth, this.dataObject).then(() => {
          this.dataHandler.presetOnlineAlert("Upload", "Data saved to server.");
     });
   }

   goHome() {
     this.navCtrl.setRoot(HomePage);
   }

   takePicture() {
       const camOptions: CameraOptions = {
         quality: 50,
         destinationType: this.camera.DestinationType.DATA_URL,
         sourceType: this.camera.PictureSourceType.CAMERA,
         encodingType: this.camera.EncodingType.JPEG,
         cameraDirection: this.camera.Direction.BACK,
         mediaType: this.camera.MediaType.PICTURE,
         targetWidth: 700,
         targetHeight: 700,
         correctOrientation: true
       };

       this.camera.getPicture(camOptions).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64 (DATA_URL):
        // this.base64Data = 'data:image/png;base64,' + imageData;
        this.base64Data = imageData;
        this.image = "data:image/png;base64,"+ imageData;
      }, (err) => {
          console.log("Camera issue:" + err);
    });
   }

}
