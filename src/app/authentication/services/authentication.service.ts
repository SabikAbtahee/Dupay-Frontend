import { Injectable } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public logInForm = this.fb.group({
    email: [''],
    password: ['']
  });
  constructor(private fb: FormBuilder,private util:UtilityService ) { }


  touchAllfields(group:FormGroup){
		this.util.touchAllFieldsOfForm(group);
	}
}
