import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the HierarchyControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HierarchyControllerProvider {

  // boolean that stores whether ontology is synced
  isOntologySynced: any;
  // boolean that stores whether ontology is ontology laded
  isOntologyLoaded: any;
  // boolean that stores whether data is synced
  isDataSynced: any;
  // boolean that stores whether data is loaded (so we don't keep reloading it unnecessarily)
  isDataLoaded: any;
  // boolean that stores whether the ontology is done loading (so we don't keep reloading it unnecessarily)
  isOntologyDoneLoading = false;
  // boolean that stores whether the data is done loading
  isDataDoneLoading = false;
  // Data sync status for each level of hierarchy.
  // True means is updated
  updateStatusHierarhcy = [];
  public configuration = {};

  public appDefaultName = "NRDC";

  constructor(public http: HttpClient, public storage: Storage) {
    // console.log('Hello HierarchyControllerProvider Provider');
  }

  saveConfiguration()
  {
    //this.configuration['isOntologySynced'] = this.isOntologySynced;
    // this.configuration['isDataSynced'] = this.getDataSynced();
    // previous Online/Offline statuses
    // platform

    this.storage.set('configuration', this.configuration);
  }
  //SET FUNCTIONS
  setOntologySynced(val)
  {
    this.isOntologySynced = val;
  }

  setOntologyLoaded(val)
  {
      this.isOntologyLoaded = val;
  }

  setDataSynced(val)
  {
      this.isDataSynced = val;
  }

  setDataLoaded(val)
  {
      this.isDataLoaded = val;
  }

  setOntologyDoneLoading(val)
  {
      this.isOntologyDoneLoading = val;
  }

  setDataDoneLoading(val)
  {
      this.isDataDoneLoading = val;
  }

  setHierarchyIsUpdatedStatus(val, index)
  {
      this.updateStatusHierarhcy[index] = val;
  }

  //GET FUNCTIONS
  getOntologySynced()
  {
      return this.isOntologySynced;
  }

  getOntologyLoaded()
  {
      return this.isOntologyLoaded;
  }

  getDataSynced()
  {
    if(this.updateStatusHierarhcy.length > 0)
    {
      return (this.isDataSynced || this.isDataSyncedToServer());
      // return this.isDataSynced;
    }
    else
    {
      return this.isDataSynced;
    }

  }

  getDataLoaded()
  {
      return this.isDataLoaded;
  }

  getOntologyDoneLoading()
  {
      return this.isOntologyDoneLoading;
  }

  getDataDoneLoading()
  {
      return this.isDataDoneLoading;
  }

  getHierarchyUpdateStatus()
  {
    return this.updateStatusHierarhcy;
  }

  // Returns if ALL hierarchy levels have been updated
  isDataSyncedToServer()
  {
    let dataSynced = true;
    let i = 0;
    for(i = 0; i < this.updateStatusHierarhcy.length; i++)
    {
      let ii = i;
      dataSynced = dataSynced && this.updateStatusHierarhcy[ii];
    }
    return dataSynced;
  }

  setDataSyncedToServer(val)
  {
    let i = 0;
    for(i = 0; i < this.updateStatusHierarhcy.length; i++)
    {
      let ii = i;
      this.updateStatusHierarhcy[ii] = val;
    }
  }

  setConfigLoginPassword(user, password)
  {
    this.configuration['username'] = user;
    this.configuration['userpassword'] = password;
    this.saveConfiguration();
  }

  clearConfigLoginPassword()
  {
    if(this.configuration['username'] != null)
    {
      delete this.configuration['userpassword'];
    }
    if(this.configuration['userpassword'] != null)
    {
      delete this.configuration['userpassword'];
    }
    this.saveConfiguration();
  }

  confirmLocalPassword(val)
  {
    return (val == this.configuration['userpassword']);
  }

  confirmLocalUsername(val)
  {
    return (val == this.configuration['username']);
  }

  setLocalUsername(val)
  {
    this.configuration['username'] = val;
    this.saveConfiguration();
  }

  setLocalPassword(val)
  {
    this.configuration['userpassword'] = val;
    this.saveConfiguration();
  }

  storeUniqueIdentifiers(val)
  {
    this.configuration['uniqueIdentifierUpdateList'] = Object.assign({}, val);
    this.configuration['unsyncedHierachyTiers'] = this.updateStatusHierarhcy;
    this.saveConfiguration();
  }

  storeMenuChoice(val)
  {
    this.configuration['menuchoice'] = val;
    this.saveConfiguration();
  }

  storeTheme(val)
  {
    this.configuration['theme'] = val;
    this.saveConfiguration();
  }


  saveAsConfiguration(val)
  {
    this.configuration = val;
  }
}
