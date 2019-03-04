/**
* @file  username.ts
* @author  Brianna Blain-Castelli, Christopher Eichstedt, Matthew johnson, Nicholas Jordy
* @brief  main file for login validation
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-username',
  templateUrl: 'username.html',
})
export class UsernamePage {

  checkUsername: ValidatorFn = (control: FormControl): ValidationErrors | null => {
     let username = control.get('username').value.toLowerCase();
     let password = control.get('password').value;
     if(username === "admin" || username === "guest"){
       return (null);
    } else {
      return ({checkUsername: true});
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
