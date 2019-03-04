/**
* @file  login.ts
* @author  Brianna Blain-Castelli, Christopher Eichstedt, Matthew johnson, Nicholas Jordy
* @brief  main file for login validation
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernamePage } from '../../app/validators/username/username';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public gvars: GlobalvarsProvider, public formBuilder: FormBuilder)
  {
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
      this.gvars.setOnline(true);
      this.navCtrl.setRoot(HomePage);
  }

  /**
* @brief
* @param
* @pre
* @post
*/
  save()
  {
      if(!this.slideOneForm.valid)
      {
        //
        this.submitAttempt = true;
      }

      else
      {
        this.submitAttempt = false;
        this.goToHome();
      }
  }

}
