import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarsProvider {

  //flag for online
  isOnline: boolean;

  platform: string;


  constructor(public http: HttpClient) {
    // console.log('Hello GlobalvarsProvider Provider');
    this.isOnline = false;
  }

  //SET FUNCTIONS
  setOnline(val)
  {
    this.isOnline = val;
  }

  setPlatform(val)
  {
      this.platform = val;
  }



  //GET FUNCTIONS
  getOnline()
  {
    return this.isOnline;
  }

  getPlatform()
  {
    return this.platform;
  }

}
