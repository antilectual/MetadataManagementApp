import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, RequestOptions } from '@angular/common/http';
import { GlobalDataHandlerProvider } from '../../../providers/global-data-handler/global-data-handler';
import { GlobalvarsProvider } from '../../../providers/globalvars/globalvars';

// import { Observable } from 'rxjs/Observable';

//import { Base64 } from '@ionic-native/base64/ngx';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  item: any;
  dataObject: any;
  dataURI: any;
  isDataPresent: boolean;
  base64Data: any;
  image: any;
  hierarchyDepth: any;
  //String for filtering in html
  uniqueIDCheck = "Unique Identifier";
  uniqueIdentifier: any;

  tzOffset: any;

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
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public dataHandler: GlobalDataHandlerProvider, public gvars: GlobalvarsProvider) {

      this.item = navParams.data[0];
      this.dataObject = navParams.data[1];
      this.hierarchyDepth = navParams.data[2];
      console.log("nav Params \n" + navParams.data[3]);
      this.uniqueIdentifier = navParams.data[3];
      // DEBUG:
      //console.log(this.dataURI);
      //If there is a photo, display image
      if(navParams.data[1].Photo != null){
        this.image = "data:image/png;base64,"+ navParams.data[1].Photo;
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

   saveEditedData()
   {
     // console.log("UniqueID \n" + this.uniqueIdentifier);
     // if()
     this.dataHandler.updateDataObject(this.dataObject, this.hierarchyDepth, this.uniqueIdentifier);


     console.log("Data Object \n" + JSON.stringify(this.dataHandler.getDataObjects()[this.hierarchyDepth][0]));
     if(this.gvars.getOnline())
     {
       this.pushSavedData();
     }
   }

   // addHero (hero: Hero): Observable<Hero> {
   //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
   //     .pipe(
   //       catchError(this.handleError('addHero', hero))
   //     );
   // }

   pushSavedData()
   {

    // console.log("URL(S) \n" + this.dataHandler.getSubUris());
     let remote = this.dataHandler.getSubUris();
     remote = remote[this.hierarchyDepth];
     // remote = remote + "POST/" + this.uniqueIdentifier;
     remote = remote + "POST";
      console.log("URL \n" + remote);
      console.log("DataObject \n" + this.dataObject);
      console.log("WhereToPost \n" + this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Name);
     //return this.http.post(remote, this.dataObject);
     let dataJSON =
        {
        	'Component':8,
        	'Deployment_ID':"a4ef96d6-6a3c-4586-89df-7ce0bce42f8c",
        	'Name':"A coffee cup",
        	'Manufacturer':"Wall Matt",
        	'Installation_Date':"2019-12-31T08:00:00Z"
        };
     //return this.http.post(remote, this.dataHandler.getDataObjects()[this.hierarchyDepth]);
      this.http.post(remote, dataJSON, {headers: {"Accept":'application/json', 'Content-Type':'application/json'}}).subscribe(data => {
        console.log("data = \n " + data['_body']);
       }, error => {
        console.log(error);
      });
  }
}
