import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalvarsProvider {

  isOnline: boolean;
  private theme: BehaviorSubject<String>;

  constructor(public http: HttpClient) {
    this.theme = new BehaviorSubject('light-theme');
    console.log('Hello GlobalvarsProvider Provider');
    this.isOnline = false;
  }

  setOnline(val)
  {
    this.isOnline = val;
  }

  getOnline()
  {
    return this.isOnline;
  }

  setTheme(val)
  {
    this.theme.next(val);
  }

  getTheme()
  {
    return this.theme.asObservable();
  }


}
