import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HierarchyControllerProvider } from '../hierarchy-controller/hierarchy-controller';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

/*
  Generated class for the GlobalDataHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalDataHandlerProvider {

  // All locations in the Ontology
  hierarchyTiers: any;
  // The data associated with the current hierarchy item (currently ALL data)
  dataObject: any;
  // URL for getting the specific data
  subURIs: any;

  public testObject: any;

  constructor(public http: HttpClient, public storage: Storage, private hierarchyGlobals: HierarchyControllerProvider, public gvars: GlobalvarsProvider) {
    // console.log('Hello GlobalDataHandlerProvider Provider');
  }

  // *********** SET FUNCTIONS ************************
  setHierarchyTiers(val)
  {
    this.hierarchyTiers = val;
  }

  setDataObject(val)
  {
    this.dataObject = val;
  }

  setSubUris(val)
  {
    this.subURIs = val;
  }

  // *********** GET FUNCTIONS ************************
  getHierarchyTiers()
  {
    return this.hierarchyTiers;
  }

  getDataObjects()
  {
    return this.dataObject;
  }

  getSubUris()
  {
    return this.subURIs;
  }

  // *********** UPDATE FUNCTIONS ************************
  updateDataObject(object, hierachyDepth, uniqueID)
  {

    let i = 0;
    for(i = 0; i < this.dataObject[hierachyDepth].length; i++)
    {
      if (this.dataObject[hierachyDepth][i] == uniqueID)
      {
        // console.log("object \n" + object);
        // console.log("dataObject \n" + this.dataObject);
        // console.log("dataObject Item \n" + this.dataObject[hierachyDepth][i]);
        this.dataObject[hierachyDepth][i] = object;
      }
    }

    this.storage.set('localDataObject', this.dataObject).then( data => {
      this.hierarchyGlobals.saveConfiguration();
      this.storage.get('localDataObject').then( data => {this.testObject = data; console.log(this.testObject);});
    });

    this.gvars.setHierarchyUpdateStatus(false, depth);

    // this.storage.set('localDataObject', this.dataObject);
    // this.hierarchyGlobals.setDataSynced(true);
    // this.hierarchyGlobals.saveConfiguration();
  }

  addDataObject(object, hierachyDepth, uniqueID)
  {
    let newDataObjectLength = this.dataObject[hierachyDepth].length + 1;
    this.dataObject[hierachyDepth][newDataObjectLength] = object;

    this.storage.set('localDataObject', this.dataObject).then( data => {
      this.hierarchyGlobals.saveConfiguration();
      this.storage.get('localDataObject').then( data => {this.testObject = data; console.log(this.testObject);});
    });
  }

  // *********** PUSH FUNCTIONS ************************
  dataObjectPush(val,i)
  {
    if(this.dataObject == null)
    {
      this.dataObject = [];
      this.dataObject[i] = val;
    }
    else
    {
      this.dataObject[i] = val;
    }
  }

  subURIPush(val, i)
  {

    if(this.subURIs == null)
    {
      this.subURIs = [];
      this.subURIs[i] = val;
    }
    else
    {
      this.subURIs[i] = val;
    }
  }

  pushSavedData(depth)
  {

   // DEBUG
   // console.log("URL(S) \n" + this.dataHandler.getSubUris());
   let remote = this.getSubUris();
   remote = remote[depth];
       // remote = remote + "POST/" + this.uniqueIdentifier; // Doesn't exist
   remote = remote + "Post";
   let i = 0;
   // DEBUG
   // console.log("URL \n" + remote);
   // console.log("dataobjectlength = " + Object.keys(this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Characteristics).length);
   // console.log("dataObjectLengh2 = " + Object.keys(this.dataObject).length);

   // This loop removes any hexBinary (Photos) from the json object before submitting it because they make the json object too large to push to the server.
   let characteristics = this.hierarchyTiers[depth].Characteristics;
   for(i = 0; i < Object.keys(characteristics).length; i++)
   {
     // DEBUG
     // console.log("data type = \n" + JSON.stringify(this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Characteristics[i].datatype));
     // console.log("hiearachyCharName = \n" + this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Characteristics[i].Label);
     // console.log("dataObjectName = \n" + this.dataObject[this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Characteristics[i].Label]);
       if(characteristics[i].datatype == "xsd:hexBinary")
       {
         delete this.dataObject[characteristics[i].Label];
       }
   }
   // DEBUG
   // console.log("DataObject \n" + JSON.stringify(this.dataObject));
   // console.log("WhereToPost \n" + this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Name);
   this.http.post(remote, this.dataObject[depth], {headers: {"Accept":'application/json', 'Content-Type':'application/json'}}).subscribe(data => {
       // DEBUG
       console.log("data = \n " + data);
       this.gvars.setHierarchyUpdateStatus(false, depth);
    }, error => {
       console.log(error);
   });
 }

 pushAllData()
 {
   let i = 0;
   for(i = 0; i < this.hierarchyTiers.length; i++ )
   {
     let ii = i;
     this.pushSavedData(ii);
   }
   this.hierarchyGlobals.setDataSynced(true);
 }
}
