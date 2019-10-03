import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  
  getFormControlsValueFromFormGroup(fg: FormGroup) {
		let controls = [];
		_.forEach(Object.keys(fg.controls), function(value: string, key: string) {
			controls = [ ...controls, value ];
		});
		return controls;
  }
  
  touchAllFieldsOfForm(formgroup:FormGroup){
		let fields=this.getFormControlsValueFromFormGroup(formgroup);
		_.forEach(fields, (value, key) => {
      formgroup.controls[value].markAsTouched();
      debugger;
		});
	}
}
export class FieldMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return (form.hasError('not_matching') && control.touched)
			? form.hasError('not_matching')
			: control && control.invalid && control.touched ? control.invalid : false;
	}
}