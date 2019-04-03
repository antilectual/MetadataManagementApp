/**
* @file  formfields.ts
* @author  Brianna Blain-Castelli, Christopher Eichstedt, Matthew johnson, Nicholas Jordy
* @brief  main file for form field validation
*/

import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-formfields-add',
  templateUrl: 'formfields-add.html',
})
export class FormfieldsAddPage implements OnInit{

//Regular expressions for validation checks
 stringValidator: string = '[a-zA-Z0-9 !@#$%^&*()<>,.?/-_]*';
 intValidator: string = '[+-]{0,1}[0-9]*';
 decValidator: string = '^[+-]{0,1}[0-9]+[.]{0,1}[0-9]*$';

//Variables for storing and manipulating data based on characteristics
  @Input() data: any;
  @Input() hierarchy: any;
  @Input() newData: any;
//Create FormBuilder
   metaDataForm: FormGroup;
//Create form FormArray
   items: FormArray;
//String for filtering in html
   uniqueIDCheck = "Unique Identifier";

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder)
  {
  }

  ngOnInit()
  {
    //Initialize Form
    //Debug Logs
    //console.log(this.data);
    //console.log(this.hierarchy);

      this.metaDataForm = this.formBuilder.group(
      {
        items: this.formBuilder.array([])
      });
    //For all instances of data, create a form items
      for( var i = 0 ; i < this.hierarchy.length ; i++ )
      {
        this.items = this.metaDataForm.get('items') as FormArray;
        //Debug Log
        //console.log(this.hierarchy[i]["Label"]);
        this.items.push(this.createItem(this.hierarchy[i]));
      }

  }

  //Create Items based upon Hierarchy characteristic instances
   createItem(characteristic): FormGroup
   {
     let char = characteristic["Label"];

     if(char == "Longitude")
     {
       // console.log(this.characteristicCheck(characteristic));
     }
      return this.formBuilder.group
      ({
//        //Use the hierarchy characteristic label as the item key
//         //The whole characteristic needs to be passed to determine validators based on datatype
//         //Use the data associated with this characteristic as the key's datatype
//           //Placeholder: dataObject[charLabel] - set in HTML
//         //Find datatype
//           //If datatype = string
          // char: new FormControl('', Validators.pattern(this.characteristicCheck(characteristic)) )
          //CURRENT BUG: char records as "char", not its value
         [char]: new FormControl (
           '', [Validators.pattern(this.characteristicCheck(characteristic))]
         )
    });
 }
  characteristicCheck(characteristic)
  {
    if(characteristic.datatype == 'xsd:string')
    {
      return this.stringValidator;
    }
  //If datatype = int
    if(characteristic.datatype == 'xsd:int')
    {
      return this.intValidator;
    }
  //If datatype = decimal
    if(characteristic.datatype == 'xsd:decimal')
    {
      return this.decValidator;
    }
  }
}
