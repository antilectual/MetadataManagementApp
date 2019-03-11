import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  constructor(public http: HttpClient) {
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
        console.log("object \n" + object);
        console.log("dataObject \n" + this.dataObject);
        console.log("dataObject Item \n" + this.dataObject[hierachyDepth][i]);
        this.dataObject[hierachyDepth][i] = object;
      }
    }

  }

  // *********** PUSH FUNCTIONS ************************
  dataObjectPush(val)
  {
    if(this.dataObject == null)
    {
      this.dataObject = [];
      this.dataObject.push(val);
    }
    else
    {
      this.dataObject.push(val);
    }
  }

  subURIPush(val)
  {

    if(this.subURIs == null)
    {
      this.subURIs = [];
      this.subURIs.push(val);
    }
    else
    {
      this.subURIs.push(val);
    }
  }
}
