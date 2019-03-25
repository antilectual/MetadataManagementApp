/**
* @file  login.ts
* @author  Brianna Blain-Castelli, Christopher Eichstedt, Matthew johnson, Nicholas Jordy
* @brief  main file for login validation
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Base64 } from '@ionic-native/base64/ngx';
import CryptoJS from 'crypto-js';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  //
  slideOneForm: FormGroup;
  //
  submitAttempt: boolean = false;
  isWeb: boolean = false;
  isIOS: boolean = false;
  isAndroid: boolean = false;
  username: string;
  password: string;
  loginCredentials = {};
  // loginCredentials = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public gvars: GlobalvarsProvider, public formBuilder: FormBuilder, public menuCtrl: MenuController, public http: HttpClient, private base64: Base64)
  {
    // Disable the menu on the login page
    this.menuCtrl.enable(false, 'unauthenticated');
    this.menuCtrl.enable(false, 'authenticated');
    this.gvars.setLoggedIn(false); // (Loggout)
    let platform = this.gvars.getPlatform();
    switch(platform)
    {
      case 'IOS':
          this.isIOS = true;
          break;
      case 'android':
          this.isAndroid = true;
          break;
      default:
          this.isWeb = true;
    }

    this.slideOneForm = new FormGroup(
      {
      username: new FormControl('', [
          Validators.maxLength(10),
          Validators.pattern('[a-zA-Z]*'),
          Validators.required]),
      password: new FormControl('', Validators.compose([
          Validators.maxLength(10),
          Validators.pattern('[a-zA-Z]*'),
          Validators.required]))
      },
    {
      //validator: UsernamePage.checkUsername,
      updateOn: 'change'
    });
  }

  /**
* @brief
* @param
* @pre
* @post
*/
  goToHome()
  {
      this.navCtrl.setRoot(HomePage);
  }

  /**
* @brief
* @param
* @pre
* @post
*/
  // TODO: Add error handling and notify user of bad logins.
  attemptLogin()
  {
      this.loginCredentials["User Name"] = this.username;
      this.loginCredentials["Password"] = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);

      // DEBUG
      // console.log("Credentials: ");
      // console.log(JSON.stringify(this.loginCredentials));
      // console.log(btoa(this.loginCredentials["Password"]));
      let remote = 'http://sensor.nevada.edu/Services/nrdc/infrastructure/Services/Login.svc/Authenticate';
      this.http.post(remote, this.loginCredentials, {headers: {"Accept":'application/json', 'Content-Type':'application/json'}}).subscribe(data => {
          this.gvars.setLoggedIn(data['Access']);
          // DEBUG
          // console.log("Web Response:");
          // console.log(data);
          // console.log("Login:");
          // console.log(this.gvars.getLoggedIn());
          this.password = "";
          if(this.gvars.getLoggedIn())      //(!this.slideOneForm.valid)
          {
            // MenuCtrl is disabling the slide menu and re-enabling it once logged in.
            this.gvars.setUserName(this.username);
            this.menuCtrl.enable(true, 'authenticated');
            this.submitAttempt = false;
            this.goToHome();
          }
          else
          {
            this.submitAttempt = true;
          }
       }, error => {
          console.log(error);
      });
  }
}
