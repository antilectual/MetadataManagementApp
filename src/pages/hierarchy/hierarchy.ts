/**
* @file  hierarchy.ts
* @author  Brianna Blain-Castelli, Christopher Eichstedt, Matthew johnson, Nicholas Jordy
* @brief  main file for dynamic hierarchical navigation
*/
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { ReadPage } from './read/read';
import { HomePage } from '../home/home';
import { EditPage } from './edit/edit';
import { AddPage } from './add/add';
import { Storage } from '@ionic/storage';
//import { File } from '@ionic-native/file';
import { GlobalDataHandlerProvider } from '../../providers/global-data-handler/global-data-handler';
import uuidv4 from 'uuid/v4';


// @IonicPage()
@Component({
  selector: 'page-hierarchy',
  templateUrl: 'hierarchy.html',
})
export class HierarchyPage
{
  // All locations in the Ontology
  public hierarchyTiers: any;
  // Current header from ontology
  public hierarchyTop: any;
  // URL for getting the specific data
  public subURI: string;
  // The data associated with the current hierarchy item (currently ALL data)
  public dataObject: any;
  // Shows the name of the current location in the hierarchy
  public currentDisplayPath: any;
  // Max depth of the hierarchy
  public maxIndex: any;
  // The unique identifier field of the hierarchy item passed to this hierarchy page.
  uniqueIdentifier: any;
  // The key (label) for the unique identifier value.
  previousPathIDName: any;

  // Title for Root of Hierarchy TODO: make this a configuration file value.
  title = "NRDC";
  // Depth of the hierarchy. (Sites-Networks->Sites->Deployments, etc).
  hierarchyDepth = 0;
  //
  loading;
  testValue: any;
  testObject: any;

  /**
* @brief
* @param
* @pre
* @post
*/
//private loadingCtrl: LoadingController
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public gvars: GlobalvarsProvider, public dataHandler: GlobalDataHandlerProvider)//, private file: File)
  {

    //test json copy
    // this.file.writeFile(this.file.assets.data, 'test.json', 'hello, world', {replace: true}).then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
    //
    if(navParams.get('hierarchydepth') == null)
    {
      this.hierarchyDepth = 0;
    }
    else
    {
      this.hierarchyDepth = navParams.get('hierarchydepth');
    }

    //Save current page data information if available (for edit and read page)
    if(this.dataHandler.getDataObjects() != null)
    {
      // this.dataObject = navParams.get('pageData');
      this.dataObject = this.dataHandler.getDataObjects();
    }

    //Save current page data information if available (for edit and read page)
    if(this.dataHandler.getHierarchyTiers() != null)
    {
      // this.hierarchyTiers = navParams.get('hierarchyData');
      this.hierarchyTiers = this.dataHandler.getHierarchyTiers();
    }

    // uniqueIdentifier and previousPathIDName are used for filtering the values displayed in the hierarchy.
    this.uniqueIdentifier = navParams.get('identifier');
    this.currentDisplayPath = navParams.get('name');

    // Find max length of navigation (for bug catching)
    this.maxIndex = this.hierarchyTiers.length - 1;
    // console.log(this.uniqueIdentifier);
    if(this.hierarchyDepth <= this.maxIndex)
    {
      //Get the previous ID name
      this.previousPathIDName = this.hierarchyTiers[this.hierarchyDepth].referentialCharacteristic + " ID";
    }
    else
    {
      this.previousPathIDName = this.hierarchyTiers[this.hierarchyDepth - 1].referentialCharacteristic + " ID";
      // this.currentPathIDName = this.hierarchyTiers[this.hierarchyDepth].referentialCharacteristic + " ID";
    }

  }

  // DEBUG:
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HierarchyPage');
  // }

  /**
* @brief
* @param
* @pre
* @post
*/
  push(item)
  {

    /* Hierarchy requires the following values:
    * hierarchydepth - HierchyDepth describes the initial tier index of the ontology/hierarchy. It is also the initial index of the location of data in dataObject
    * name - Name is the name used as a label on the hierarchy (metadata management) page.
    * pageData - This object is the full set of data pulled from the database which contains the actual metadata for all hierarchy tiers
    * hierarchyData -  This object is the full set of hierarchyData tiers
    * indentifier - This should be the unique identifier value for the previous page in the hierarchy.  null for the initial push.
    * pathName - this string is the pluralization of the Name which will be used for finding the URI and show the name of the hierarchy level.
    */

    // let localValues = {hierarchydepth:this.hierarchyDepth +1, name:item.Name, pageData:this.dataObject, hierarchyData:this.hierarchyTiers, identifier:item["Unique Identifier"], pathName:this.hierarchyTiers[this.hierarchyDepth].Plural};
    let localValues = {hierarchydepth:this.hierarchyDepth +1, name:item.Name, identifier:item["Unique Identifier"], pathName:this.hierarchyTiers[this.hierarchyDepth].Plural};
    this.navCtrl.push(HierarchyPage,localValues);
  }

  /**
* @brief
* @param
* @pre
* @post
*/
  goHome()
  {
    this.navCtrl.setRoot(HomePage);
  }

  /**
* @brief
* @param
* @pre
* @post
*/
// Goes to the edit page
  editCharacteristics(page)
  {
    let filteredObject: any;
    let i = 0;
    for(i = 0; i < this.dataObject[this.hierarchyDepth - 1].length; i++)
    {
      if( this.dataObject[this.hierarchyDepth - 1][i]["Unique Identifier"] == this.uniqueIdentifier)
      {
        filteredObject = (this.dataObject[this.hierarchyDepth - 1][i]);
      }
    }

    // DEBUG
    // console.log(filteredObject);
    if(page == 'edit')
    {
      // console.log("uniqueID \n" + this.uniqueIdentifier);
      // this.navCtrl.push(EditPage,[this.hierarchyTiers[this.hierarchyDepth - 1], filteredObject]);
      this.navCtrl.push(EditPage,[(this.dataHandler.getHierarchyTiers())[this.hierarchyDepth - 1], filteredObject, this.hierarchyDepth - 1, this.uniqueIdentifier]);
    }
    // else if(page == 'add')
    // {
    //   this.navCtrl.push(AddPage,[(this.dataHandler.getHierarchyTiers())[this.hierarchyDepth - 1], filteredObject, this.hierarchyDepth - 1, this.uniqueIdentifier]);
    //   // this.navCtrl.push(AddPage);
    // }
    else
    {
      // this.navCtrl.push(ReadPage,[this.hierarchyTiers[this.hierarchyDepth - 1], filteredObject, this.currentDisplayPath]);
      this.navCtrl.push(ReadPage,[(this.dataHandler.getHierarchyTiers())[this.hierarchyDepth - 1], filteredObject, this.hierarchyDepth - 1, this.currentDisplayPath]);
    }

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
   * @brief Converts a date in UTC time to Local time
   * @param date The date to be converted, in UTC
   * @pre
   * @post
   */

   convertUTCtoLocal(date){
     var tzOffset = -480;
     //get actual tzOffset
     var newTime = new Date(date.getTime() + tzOffset * 60 * 1000);

     var hourOffset = tzOffset/60;

     newTime.setHours(date.getHours() - hourOffset);

     return newTime;
   }

   addItem()
   {
     //need depth,

     let pushItem = {};

     pushItem[this.previousPathIDName] = this.uniqueIdentifier;

     console.log(pushItem);
   }

   createAddPage()
   {
     let filteredObject: any;
     let i = 0;

     if(this.hierarchyDepth - 1 < 0)
     {
       //do nothing
     }
     else
     {
       for(i = 0; i < this.dataObject[this.hierarchyDepth - 1].length; i++)
       {
         if( this.dataObject[this.hierarchyDepth - 1][i]["Unique Identifier"] == this.uniqueIdentifier)
         {
           filteredObject = (this.dataObject[this.hierarchyDepth][i]);
         }
       }
       this.navCtrl.push(AddPage,[(this.dataHandler.getHierarchyTiers())[this.hierarchyDepth], filteredObject, this.hierarchyDepth);
      }
    }


}
