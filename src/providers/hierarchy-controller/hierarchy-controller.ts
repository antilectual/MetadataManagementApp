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
  // boolean that stores whether data is loaded
  isDataLoaded: any;
  // boolean that stores whether the ontology is done loading
  isOntologyDoneLoading = false;
  // boolean that stores whether the data is done loading
  isDataDoneLoading = false;

  configuration = {};

  constructor(public http: HttpClient, public storage: Storage) {
    // console.log('Hello HierarchyControllerProvider Provider');
  }

  saveConfiguration()
  {
    // this.configuration['isOntologySynced'] = this.isOntologySynced;
    this.configuration['isDataSynced'] = this.isDataSynced;
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
      return this.isDataSynced;
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



}
