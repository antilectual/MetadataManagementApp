
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { ReadPage } from './read/read';
import { HomePage } from '../home/home';
import { File } from '@ionic-native/file';


// @IonicPage()
@Component({
  selector: 'page-hierarchy',
  templateUrl: 'hierarchy.html',
})
export class HierarchyPage
{
  // All locations in the Ontology
  public items: any;
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
  // Data on the current display page
  public currentData: any;
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
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public gvars: GlobalvarsProvider, private loadingCtrl: LoadingController)//, private file: File)
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
    if(navParams.get('currentPageData') != null)
    {
      this.currentData = navParams.get('currentPageData');
    }

    this.currentDisplayPath = navParams.get('name');

    // uniqueIdentifier and previousPathIDName are used for filtering the values displayed in the hierarchy.
    this.uniqueIdentifier = navParams.get('identifier');
    this.previousPathIDName = navParams.get('pathName');

    if(this.previousPathIDName != null)
    {
      // TEMPROARY hack to ignore data inconsistencies in the database when pulling sites.
      this.previousPathIDName = this.previousPathIDName.replace(/Site Networks/g, "Networks");
      // TEMPORARY
      // Replace the S in the pluralization value in the anme and add ID.  This is used to find the ID used to filter the objects displayed.
      this.previousPathIDName = this.previousPathIDName.substring(0, this.previousPathIDName.length - 1)  + " ID";
    }

    this.getHierarchyData(this.hierarchyDepth);
  }

  // DEBUG:
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HierarchyPage');
  // }

// Doesn't actually get the data. It gets the hierarchy/ontology! (RAGNAROK)
  getHierarchyData(depth)
  {
    // this.loading = this.loadingCtrl.create({
    //   message: 'Loading...'
    // });
    // this.loading.present();
    let online = this.gvars.getOnline();
    // TODO: Create a confi setting for this
    // Local location containing the Ontology
    let local = '../../assets/data/test.json';
    // TODO: Create a confi setting for this
    // Remote service containing the ontology
    //let remote = 'http://sensor.nevada.edu/GS/Services/Ragnarok/';
    let remote = '../../assets/data/ontology.json';
    // TODO: Create a confi setting for this
    // Remote database service containing the metadata
    let dataRemote = 'http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/';
    if(online)
    {
      let data: Observable<any> = this.http.get(remote);
      data.subscribe(result => {

        // Find max length of navigation (for bug catching)
        this.maxIndex = result.length;

        // Grab the json results from Ragnarok (hierarchy)
        // (i.e. Site-Networks, Sites, Systems, Deployments, Components
        if( depth < this.maxIndex){
        this.items = result;
        // Get the current header item
        this.hierarchyTop = result[depth];
        // increases to next header item
        this.hierarchyDepth = depth + 1;
        // Proper viewing name of header
          this.subURI = this.hierarchyTop.Plural;
        // Create URL for the items from this header (removing spaces first)
        this.subURI = this.subURI.replace(/ +/g, "");
        this.subURI = dataRemote + this.subURI + ".svc/Get";
        //DEBUG
        //console.log("SubURI is:");
        //console.log(this.subURI);

        this.getNextData();
        }
        else{
          this.items = result;
          // Get the current header item
          this.hierarchyTop = result[depth - 1];
          // increases to next header item
          this.hierarchyDepth = depth + 1;
          // Proper viewing name of header
            this.subURI = this.hierarchyTop.Plural;
          // Create URL for the items from this header (removing spaces first)
          this.subURI = this.subURI.replace(/ +/g, "");
          this.subURI = dataRemote + this.subURI + ".svc/Get";
          //DEBUG
          //console.log("SubURI is:");
          //console.log(this.subURI);

          this.getNextData();
        }

      });
    }
    else
    {
      let data: Observable<any> = this.http.get(local);
      data.subscribe(result => {
        this.hierarchyTop = result[depth];
        // Find max length of navigation (for bug catching)
        this.maxIndex = result.length;
        this.hierarchyDepth = depth + 1;
        this.items = result;});
    }
    // this.loading.dismiss();
  }

// This function actually gets the data from the URI accessing the database.
  getNextData()
  {
    //DEBUG
    //console.log(this.subURI);
    let data: Observable<any> = this.http.get(this.subURI);
    data.subscribe(result => {
      this.dataObject = result;
      //DEBUG
      console.log(this.dataObject);
    });
  }

  // push()
  // {
  //   let localValues = {hierarchydepth:this.hierarchyDepth};
  //   this.navCtrl.push(HierarchyPage,localValues);
  // }

  push(item)
  {
    if(this.hierarchyDepth <= this.maxIndex - 1)
    {
      let localValues = {hierarchydepth:this.hierarchyDepth, name:item.Name, currentPageData:item, identifier:item["Unique Identifier"], pathName:this.hierarchyTop.Plural};
      this.navCtrl.push(HierarchyPage,localValues);
    }
    else if(this.hierarchyDepth = this.maxIndex)
    {
      let localValues = {hierarchydepth:this.hierarchyDepth, name:item.Name, currentPageData:item, identifier:item["Unique Identifier"], pathName:this.hierarchyTop.Plural};
      this.navCtrl.push(HierarchyPage,localValues);
    }

  }

  goHome()
  {
    this.navCtrl.setRoot(HomePage);
  }

// Goes to the edit page
  editCharacteristics()
  {

    // EXPERIMENTAL
    // Depth was increment +1 so revert it, and -1 more to go to item above it
    let dataDepth = this.hierarchyDepth-2;
    let hierarchyTop: any;
    // Out of bounds checking
    if(dataDepth >= 0)
    {
          hierarchyTop = this.items[dataDepth];
    }
    else
    {
        return;
    }

    // TODO: Update from config file
    // Remote database service containing the metadata
    let dataRemote = 'http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/';
    // Proper viewing name of header
    let subURI = hierarchyTop.Plural;
    // Create URL for the items from this header (removing spaces first)
    subURI = subURI.replace(/ +/g, "");
    //Add unique ID to gather specific page data
    subURI = dataRemote + subURI + ".svc/Get/" + this.currentData["Unique Identifier"];
    // END EXPERIMENTAL

    //// DEBUG:
    //  console.log(subURI);
    //  console.log(hierarchyTop);

    let online = this.gvars.getOnline();
    if(online)//console.log(ReadPage, this.hierarchyTop, this.subURI);
    {
      this.navCtrl.push(ReadPage,[hierarchyTop, subURI, this.currentData]);
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
       return n
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
}
