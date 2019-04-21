import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { GlobalDataHandlerProvider } from '../../providers/global-data-handler/global-data-handler';
import { HierarchyControllerPage } from '../hierarchy-controller/hierarchy-controller';
import { HierarchyControllerProvider } from '../../providers/hierarchy-controller/hierarchy-controller';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  status: boolean;
  darkTheme: boolean;

  //Light dark themes
  public selectedTheme: String;

  public hierarchyController: HierarchyControllerPage;

  dataRemote = 'http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/';

  selectOptions = {
    title: 'Bar Type',
    mode: 'md'
  };

  constructor(public navCtrl: NavController, public gvars: GlobalvarsProvider, public dataHandler: GlobalDataHandlerProvider, public hierarchyGlobals: HierarchyControllerProvider) {
    this.gvars.getTheme().subscribe(val => this.selectedTheme = val);

    if(this.gvars.getOnline())
    {
      this.status = true;
    }
    else
    {
      this.status = false;
    }
    if(this.selectedTheme == 'dark-theme')
      this.darkTheme = true;
    else
      this.darkTheme = false;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SettingsPage');
  }

  toggleOnline() {
    // DEBUG:
    //console.log("toggle");
    if(this.gvars.getOnline()){
      this.gvars.setOnline(false);
    }
    else{
      this.gvars.setOnline(true);
    }
    // DEBUG:
    // console.log(this.gvars.getOnline());
  }

  toggleTheme() {
    if( this.selectedTheme === 'dark-theme'){
      this.gvars.setTheme('light-theme');
      this.hierarchyGlobals.storeTheme('light-theme');
      this.darkTheme = false;

    }
    else{
      this.gvars.setTheme('dark-theme');
      this.hierarchyGlobals.storeTheme('dark-theme');
      this.darkTheme = true;
    }
  }

  syncData() {

    if(this.hierarchyGlobals.getDataLoaded() && this.hierarchyGlobals.getDataDoneLoading())
    {
      // ----------------- need to ensure remote URIs are loaded.
      // (Can get here without loading them when accessing settings page)
      let dataRemote = this.dataRemote;
      let i = 0;
      let hierarchyTiers = this.dataHandler.getHierarchyTiers();
      for (i; i < hierarchyTiers.length; i++)
      {
        // re-indexing. required to index appropriately due to JS scoping
        let ii = i;
        // Proper viewing name of header
        let subURI = hierarchyTiers[ii].Plural;
        // Create URL for the hierarchyTiers from this header (removing spaces first)
        subURI = subURI.replace(/ +/g, "");
        // e.g. http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/Sites.svc/
        this.dataHandler.subURIPush(dataRemote + subURI + ".svc/", ii);
      }
      // Upload all updated data stored in the app
      this.dataHandler.pushAllData();
      this.dataHandler.setDataObject(null);
      this.hierarchyGlobals.setDataSynced(false);
      this.hierarchyGlobals.setDataSyncedToServer(false);
      // console.log("SyncData");
      // console.log(this.hierarchyGlobals.getDataSynced());
      // console.log("HierarchyUpdateStatus = ");
      // console.log(this.hierarchyGlobals.getHierarchyUpdateStatus());
      this.hierarchyGlobals.setDataLoaded(false);
      this.hierarchyGlobals.setDataDoneLoading(false);
      this.navCtrl.setRoot(HierarchyControllerPage);
    }
    else // Data is not loaded (can't sync an empty dataObject)
    {
      this.dataHandler.presetOnlineAlert(
        "Data not loaded", "Please load the data by navigating to the Metadata Entry page before trying to synchronize."
      );
    }
  }
}
