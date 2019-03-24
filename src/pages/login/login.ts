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
      updateOn: 'blur'
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
  attemptLogin()
  {

      if(!this.slideOneForm.valid)
      {
        //
        this.submitAttempt = true;
      }
      else
      {
        // TODO: Menu enable based on login authenticated
        this.menuCtrl.enable(true, 'authenticated');
        this.submitAttempt = false;
        this.goToHome();
      }
      this.loginCredentials["User Name"] = this.username;
      this.loginCredentials["Password"] = btoa(CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex));

      console.log("Credentials: ");
      console.log(JSON.stringify(this.loginCredentials));
      // console.log(btoa(this.loginCredentials["Password"]));
      let remote = 'http://sensor.nevada.edu/Services/nrdc/infrastructure/Services/Login.svc/Authenticate';
      this.http.post(remote, this.loginCredentials, {headers: {"Accept":'application/json', 'Content-Type':'application/json'}}).subscribe(data => {
          // DEBUG
          console.log("data = ");
          console.log(data);
       }, error => {
          console.log(error);
      });

      this.password = "";

  }

}
