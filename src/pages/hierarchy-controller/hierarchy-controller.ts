/**
* @file  hierarchy.ts
* @author  Brianna Blain-Castelli, Christopher Eichstedt, Matthew johnson, Nicholas Jordy
* @brief  controller file for hierarchichy
*/

import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { HomePage } from '../home/home';
import { File } from '@ionic-native/file';
import { HierarchyPage } from '../hierarchy/hierarchy';

@IonicPage()
@Component({
  selector: 'page-hierarchy-controller',
  templateUrl: 'hierarchy-controller.html',
})

export class HierarchyControllerPage {

// boolean that stores whether ontology is synced
isOntologySynced: any;
// boolean that stores whether ontology is ontology laded
isOntologyLoaded: any;
// boolean that stores whether data is synced
isDataSynced: any;
// boolean that stores whether data is loaded
isDataLoaded: any;
// boolean that stores whether the data is done loading
isOntologyDoneLoading: any;
// All locations in the Ontology
public items: any;
// URL for getting the specific data
public subURI: string;
// The data associated with the current hierarchy item (currently ALL data)
public dataObject: any;
// Shows the name of the current location in the hierarchy
public currentDisplayPath: any;
// Data on the current display page
public currentData: any;
// The unique identifier field of the hierarchy item passed to this hierarchy page.
uniqueIdentifier: any;
// The key (label) for the unique identifier value.
previousPathIDName: any;

  /**
* @brief
* @param
* @pre
* @post
*/
  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public gvars: GlobalvarsProvider) {
    //put a pin in it
    this.getOntology();
    this.getAllData();
    this.loadData();

  }

  /**
* @brief
* @param
* @pre
* @post
*/
  goHierachyPage(){
      this.navCtrl.push(HierarchyPage);
  }

/**
* @brief
* @param
* @pre
* @post
*/
  async getOntology(){
    if(!this.isOntologySynced){
      if(!this.isOntologyLoaded){
        // BEWARE: possibly volatile and could not save actual data
        this.getHierarchyData(0); // zero means to grab the full hierarchy
        this.isOntologySynced = this.isOntologyLoaded = true;
      }
    }
  }

/**
* @brief
* @param
* @pre
* @post
*/
  async getAllData(){
    if(!this.isDataSynced){
      if(!this.isDataLoaded){
        this.getData();
        this.isDataSynced = this.isDataLoaded = true;
      }
      else{
        // ask user to confirm sync
      }
    }
  }

  /**
* @brief
* @param
* @pre
* @post
*/
// Doesn't actually get the data. It gets the hierarchy/ontology! (RAGNAROK)
  async getHierarchyData()
  {
    let online = this.gvars.getOnline();
    // TODO: Create a config setting for this
    // Local location containing the Ontology
    let local = '../../assets/data/test.json';
    // TODO: Create a config setting for this
    // Remote service containing the ontology
    //let remote = 'http://sensor.nevada.edu/GS/Services/Ragnarok/';
    let remote = '../../assets/data/ontology.json';
    if(online)
    {
      let data: Observable<any> = this.http.get(remote);
      let isOntologyDoneLoading = false;
      data.subscribe(result => {
        // Grab the json results from Ragnarok (hierarchy)
        // (i.e. Site-Networks, Sites, Systems, Deployments, Components
        this.items = result;
        this.isOntologyDoneLoading = true;
      });
    }
    else
    {
      // THROW AN EXCEPTION ERROR
    }
  }

  async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

/**
* @brief
* @param
* @pre
* @post
*/
  async loadData()
    {
        // the fun synchronous asynchronous code block -----------
        let loading = this.loadingController.create({
          spinner: null,
          message: 'Please wait...',
          translucent: true,
          cssClass: 'custom-class custom-loading'
        });
        loading.present();
        while(!this.isOntologyDoneLoading){await this.delay(1);}
        loading.dismiss();
        // -----------
      }

  /**
* @brief
* @param
* @pre
* @post
*/
// This function actually gets the data from the URI accessing the database.
  async getData()
  {
    // TODO: Create a confi setting for this
    // Remote database service containing the metadata
    let dataRemote = 'http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/';
    // the fun synchronous asynchronous code block -----------
    let loading = this.loadingController.create({
      spinner: null,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    while(!this.isOntologyDoneLoading){await this.delay(1);}
    loading.dismiss();
    // -----------
    let i = 0;
    for (i; i < this.items.length; i++)
    {
        // Proper viewing name of header
        this.subURI = this.items[i].Plural;
        // Create URL for the items from this header (removing spaces first)
        this.subURI = this.subURI.replace(/ +/g, "");
        this.subURI = dataRemote + this.subURI + ".svc/Get";

        //TODO: Update to add data for each level of hierarchy.
        //DEBUG
        //console.log(this.subURI);
        let data: Observable<any> = this.http.get(this.subURI);
        let result = null;
                // console.log(this.subURI);
        await data.subscribe(result => {

          if(this.dataObject == null)
          {
            this.dataObject = result;
          }
          else
          {
            this.dataObject.push(result);
          }

         console.log(this.dataObject);
        });
    }
  }
}
