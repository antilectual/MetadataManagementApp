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
  // list of hierarchy levels, each with a list which unique identifier that need to be pushed to remote server'
  uniqueIdentifierUpdateList = {};
  // String that identifies the label for Unique Identifier.
  uniqueIDLabel = "Unique Identifier";

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

  setUpdateUniqueIdentifier(depth, uniqueID)
  {
    if(this.uniqueIdentifierUpdateList[depth] == null)
    {
      this.uniqueIdentifierUpdateList[depth] = [];
    }
    this.uniqueIdentifierUpdateList[depth].push(uniqueID);
    this.hierarchyGlobals.setHierarchyIsUpdatedStatus(false, depth);
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

  getDataObjectFromUniqueID(depth, uniqueID)
  {
    for(var dataObject in this.dataObject[depth])
    {
      let d = dataObject;
      if(d[this.uniqueIDLabel] == uniqueID)
      {
        return d;
      }
    }
  }

  // *********** UPDATE FUNCTIONS ************************
  updateDataObject(object, hierarchyDepth, uniqueID)
  {
    // DEBUG
    // console.log("update HierarchyDepth = " + hierarchyDepth);
    // console.log("Data Object");
    // console.log(object);
    let i = 0;
    for(i = 0; i < this.dataObject[hierarchyDepth].length; i++)
    {

      console.log(this.dataObject[hierarchyDepth][i]);
      if (this.dataObject[hierarchyDepth][i][this.uniqueIDLabel] == uniqueID)
      {
        // DEBUG
        // console.log("object \n" + object);
        // console.log("dataObject \n" + this.dataObject);
        // console.log("dataObject Item \n" + this.dataObject[hierachyDepth][i]);
        this.dataObject[hierarchyDepth][i] = object;
      }
    }

    this.storage.set('localDataObject', this.dataObject).then( data => {
      this.hierarchyGlobals.saveConfiguration();
    });

    this.hierarchyGlobals.setHierarchyIsUpdatedStatus(false, hierarchyDepth);
    this.setUpdateUniqueIdentifier(hierarchyDepth, uniqueID);
    // DEBUG
    // this.storage.set('localDataObject', this.dataObject);
    // this.hierarchyGlobals.setDataSynced(true);
    // this.hierarchyGlobals.saveConfiguration();
  }

  // *********** ADD FUNCTIONS *************************
  addDataObject(object, hierachyDepth)
  {
    this.dataObject[hierachyDepth].push(object);
    this.storage.set('localDataObject', this.dataObject).then( data => {
      this.hierarchyGlobals.saveConfiguration();
    });
    this.hierarchyGlobals.setHierarchyIsUpdatedStatus(false, hierachyDepth);
    this.setUpdateUniqueIdentifier(hierachyDepth, object[this.uniqueIDLabel]);
  }

    // *********** REMOVE FUNCTIONS ********************
  removeUniqueIDFromUpdater(depth, uniqueID)
  {
    for(var key in this.uniqueIdentifierUpdateList[depth])
    {
      let k = key;
      if(this.uniqueIdentifierUpdateList[depth][k] == uniqueID)
      {
        delete this.uniqueIdentifierUpdateList[depth][k];
        if(this.uniqueIdentifierUpdateList[depth].length == 0)
        {
            this.hierarchyGlobals.setHierarchyIsUpdatedStatus(true, depth);
        }
      }
    }
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
  // ******************** REMOTE PUSH FUNCTIONS *************************
  // These Push Functions involve sending data directly to the server for remote storage
  pushSavedData(depth, dataObject)
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
         delete dataObject[characteristics[i].Label];
       }
   }
   // DEBUG
   // console.log("DataObject \n" + JSON.stringify(this.dataObject));
   // console.log("WhereToPost \n" + this.dataHandler.getHierarchyTiers()[this.hierarchyDepth].Name);
   this.http.post(remote, dataObject, {headers: {"Accept":'application/json', 'Content-Type':'application/json'}}).subscribe(data => {
       // DEBUG
       console.log("data = \n " + data);
       this.hierarchyGlobals.setHierarchyIsUpdatedStatus(false, depth);
       this.removeUniqueIDFromUpdater(depth, dataObject[this.uniqueIDLabel]);
       // add update success to udpate message
    }, error => {
       console.log(error);
   });
 }

 pushAllData()
 {
   let i = 0;
   // Must be 0 to length. Starts at top of hierarchy and goes down
   for(i = 0; i < this.hierarchyTiers.length; i++ )
   {
     let depth = i;
     this.pushDataTier(depth);
   }
   this.hierarchyGlobals.setDataSynced(true);
 }

 pushDataTier(depth)
 {

   console.log("Pushing Tier: " + depth + ", Index: " + index);
   // check each identifier against the list of identifiers needing syncronizing
   var dataObjectToPush: any;
   for(var index in this.uniqueIdentifierUpdateList[depth])
   {
     let i = index;
     console.log("Pushing Tier: " + depth + ", Index: " + i);
     dataObjectToPush = this.getDataObjectFromUniqueID(depth, this.uniqueIdentifierUpdateList[depth][i]);
     // <DEBUG>
     // this.removeUniqueIDFromUpdater(depth, dataObject[this.uniqueIDLabel]);
     // <?DEBUG>
     if(dataObjectToPush != null)
     {
       console.log("pushDataObject");
       console.log(dataObjectToPush);
      // pushSavedData(depth, dataObjectToPush);
     }

   }
 }


}
