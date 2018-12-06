
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

  public items: any;
  public hierarchyTop: any;
  public subURI: string;
  public dataObject: any;

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
    this.getData(this.i);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HierarchyPage');
  }


  getData(i){
    let online = this.gvars.getOnline();
    if(online)
    {
      let local = '../../assets/data/db.json';
      let remote = 'http://sensor.nevada.edu/GS/Services/Ragnarok/';
      let dataRemote = 'http://sensor.nevada.edu/Services/NRDC/Infrastructure/Services/';
      let data: Observable<any> = this.http.get(remote);
      data.subscribe(result => {
        this.items = result;
        this.hierarchyTop = result[i];
        this.i = i + 1;
        this.subURI = this.hierarchyTop.Plural;
        this.subURI = this.subURI.replace(/ +/g, "");
        this.subURI = dataRemote + this.subURI + ".svc/Get";
        this.getNextData();
      });
    }
  }

  getNextData(){
    console.log(this.subURI);
    let data: Observable<any> = this.http.get(this.subURI);
    data.subscribe(result => {
      this.dataObject = result;
      console.log(this.dataObject);
    });
  }

  push()
  {
    let locali = {i:this.i};
    this.navCtrl.push(HierarchyPage,locali);
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
