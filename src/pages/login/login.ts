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

  constructor(public navCtrl: NavController, public navParams: NavParams, public gvars: GlobalvarsProvider, public formBuilder: FormBuilder, public menuCtrl: MenuController)
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
  }

}
