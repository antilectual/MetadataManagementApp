
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { ReadPage } from './read/read';



// @IonicPage()
@Component({
  selector: 'page-hierarchy',
  templateUrl: 'hierarchy.html',
})
export class HierarchyPage {

  // Ontology Items
  public items: any;
  // Current header from ontology
  public hierarchyTop: any;
  // URL for getting the specific data
  public subURI: string;
  public dataObject: any;
  public currentDisplayPath: any;
  public testObject = [{"Network":1,"Principal Investigator ID":"ae486fb0-749f-4e6e-98b4-eae9b5d7ff61","Name":"Walker Basin Hydroclimate","Alias":"ProtoNRDC","Institution Name":"University of Nevada, Reno","Original Funding Agency":"NSF","Grant Number String":"Grant No. 1230329","Started Date":"2012-06-01T00:00:00Z","Unique Identifier":"8f6fdbef-094e-42b0-96c8-70c2e801b889","Creation Date":"2016-03-31T17:21:25Z","Modification Date":"2016-03-31T17:21:25Z","Delete":false}];

  i = 0;
  constructor(public navCtrl: NavController, public http: HttpClient, public navParams: NavParams, public gvars: GlobalvarsProvider) {
    if(navParams.get('i') == null)
    {
      this.i = 0;
    }
    else
    {
      this.i = navParams.get('i');
    }
    this.currentDisplayPath = navParams.get('name');
    this.getData(this.i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HierarchyPage');
  }


  getData(i){
    let online = this.gvars.getOnline();
    let local = '../../assets/data/db.json';
    //let remote = 'http://sensor.nevada.edu/GS/Services/Ragnarok/';
    let dataRemote = 'http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/';
    if(online)
    {
      let data: Observable<any> = this.http.get(local);
      data.subscribe(result => {
        // Grab the json results from Ragnarok (Headers)
        // i.e.
        //  Site-Networks
        //  Sites
        //  Systems
        //  Deployments
        //  Components

        this.items = result;
        // Get the current header item
        this.hierarchyTop = result[i];
        // increases to next header item
        this.i = i + 1;
        // Proper viewing name of header
        this.subURI = this.hierarchyTop.Plural;
        // Create URL for the items from this header
        this.subURI = this.subURI.replace(/ +/g, "");
        this.subURI = dataRemote + this.subURI + ".svc/Get";

        this.getNextData();
      });
    }
    else
    {
      let data: Observable<any> = this.http.get(local);
      data.subscribe(result => {
        this.hierarchyTop = result[i];
        this.i = i + 1;
        this.items = result;});
    }

  }

  getNextData(){
    //DEBUG
    //console.log(this.subURI);
    let data: Observable<any> = this.http.get(this.subURI);
    data.subscribe(result => {
      this.dataObject = result;
      //DEBUG
      //console.log(this.dataObject);
    });
  }

  push()
  {
    let localValues = {i:this.i};
    this.navCtrl.push(HierarchyPage,localValues);
  }

  push(item)
  {
    let localValues = {i:this.i, name:item.Name + " - "};
    this.navCtrl.push(HierarchyPage,localValues);
  }

  viewCharacteristics()
  {
    let online = this.gvars.getOnline();
    if(online)//console.log(ReadPage, this.hierarchyTop, this.subURI);
    {
      this.navCtrl.push(ReadPage,[this.hierarchyTop,{dataURI:this.subURI}, this.dataObject]);
    }
  }
}
