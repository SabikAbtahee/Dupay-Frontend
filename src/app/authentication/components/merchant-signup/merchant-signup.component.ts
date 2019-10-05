import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex, authentication_error_messages, urlPaths } from '../../../config/constants/dupayConstants';
import { FieldMatcher } from '../../../core/utility-services/utility-service.service';
import { Merchant_Types } from '../../../config/enums/dupay.enum';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-merchant-signup',
	templateUrl: './merchant-signup.component.html',
	styleUrls: [ './merchant-signup.component.scss' ]
})
export class MerchantSignupComponent implements OnInit {
	constructor(private fb: FormBuilder,private authService:AuthenticationService,private router:Router) {}

	signupform: FormGroup;
  matcher;
  merchant_types=Merchant_Types;
  error_messages = authentication_error_messages;
	ngOnInit() {
		this.makeSignupFormMerchant();
		this.setCustomValidation();
	}

	makeSignupFormMerchant() {
		this.signupform = this.fb.group({
			name: [ '', Validators.required ],
			phone_number: [ '', [ Validators.required] ],
			nid_number: [ '', Validators.required ],
			password: [ '', [Validators.required, Validators.pattern(passwordRegex)] ],
			confirm_password: [ '', [Validators.required, Validators.pattern(passwordRegex) ]],
			merchant_type: [ '', Validators.required ]
		});
	}
	passwordMatchValidator(group: FormGroup): any {
		if (group) {
			if (group.get('password').value !== group.get('confirm_password').value) {
				return { not_matching: true };
			}
		}

		return null;
	}
	setCustomValidation() {
		this.signupform.setValidators(this.passwordMatchValidator);
		this.signupform.updateValueAndValidity();
		this.matcher = new FieldMatcher();
  }
  onSignupSubmit(){
    if(this.signupform.valid){
			let x = {
        name:this.signupform.value.name,
        email: this.signupform.value.email,
        nid_number:this.signupform.value.nid_number,
        password: this.signupform.value.password,
        confirm_password: this.signupform.value.confirm_password,
        merchant_type: this.signupform.value.merchant_type
        
      };
      console.log(x);
    }
    else{
      this.authService.touchAllfields(this.signupform);
    }
  }

  routeToLogin(){
    this.router.navigate([ urlPaths.Authentication.Signin.url ]);
  }
}
