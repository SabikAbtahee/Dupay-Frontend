import { dupayConst, snackbarMessages } from './../../../config/constants/dupayConstants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex, authentication_error_messages, urlPaths } from '../../../config/constants/dupayConstants';
import { FieldMatcher } from '../../../core/utility-services/utility-service.service';
import { Merchant_Types } from '../../../config/enums/dupay.enum';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { authenticationEmailOtp } from '../../../config/interfaces/dupay.interface';
import { QueryService } from '../../../core/query-services/query.service';
import { MutationService } from '../../../core/mutation-services/mutation.service';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
	selector: 'app-merchant-signup',
	templateUrl: './merchant-signup.component.html',
	styleUrls: [ './merchant-signup.component.scss' ]
})
export class MerchantSignupComponent implements OnInit {
	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private router: Router,
		private coreQuery: QueryService,
		private coreMutate: MutationService,
		private sharedService:SharedService
	) {}

	// Localstorage Object
	authenticationObject: authenticationEmailOtp = {
		key: 'Dupay'
	};

	// Progress bar
	isEmailLoading = false;
	isOTPLoading = false;
	isSignUpLoading = false;

	// Page format
	isEmailFormDone = false;
	isOTPFormDone = false;

	// Forms
	emailForm: FormGroup;
	OTPForm: FormGroup;
	signupform: FormGroup;

	matcher;
	merchant_types = Merchant_Types;
	error_messages = authentication_error_messages;

	ngOnInit() {
		this.checkForm();
		this.makeEmailForm();
		this.makeOTPForm();
		this.makeSignupFormMerchant();
		this.setCustomValidation();
	}

	// Check if email and otp is already done setting
	checkForm() {
		let check: authenticationEmailOtp = this.coreQuery.readJSONValueFromLocalStorage(this.authenticationObject.key);
		if (check && check.isEmailDone) {
			this.isEmailFormDone = true;
		}
		if (check && check.isOtpDone) {
			this.isOTPFormDone = true;
		}
	}

	makeEmailForm() {
		this.emailForm = this.fb.group({
			email: [ '', [ Validators.required, Validators.email ] ]
		});
	}
	makeOTPForm() {
		this.OTPForm = this.fb.group({
			otp: [ '', [ Validators.required ] ]
		});
	}

	makeSignupFormMerchant() {
		this.signupform = this.fb.group({
			name: [ '', Validators.required ],
			phone_number: [ '', [ Validators.required ] ],
			nid_number: [ '', Validators.required ],
			password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			confirm_password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
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
	onSignupSubmit() {
		this.isSignUpLoading = true;
		// If valid delete localstorage
		if (this.signupform.valid) {
			this.coreMutate.deleteKeyInLocalStorage(this.authenticationObject.key);
			let x = {
				name: this.signupform.value.name,
				email: this.signupform.value.email,
				nid_number: this.signupform.value.nid_number,
				password: this.signupform.value.password,
				confirm_password: this.signupform.value.confirm_password,
				merchant_type: this.signupform.value.merchant_type
			};
			console.log(x);
			this.isSignUpLoading = false;
		} else {
			this.authService.touchAllfields(this.signupform);
			this.isSignUpLoading = false;
		}
	}

	sendOTPtoEmail() {
		// If valid save the email in local storage and send email
		this.isEmailLoading = true;
		if (this.emailForm.valid) {
			this.authService.sendOtpToEmail(this.emailForm.value.email);
			// this.isEmailFormDone = true;
			// this.authenticationObject = {
			// 	key: this.authenticationObject.key,
			// 	isEmailDone: true,
			// 	isOtpDone: false
			// };
			// this.coreMutate.setJSONDataInLocalStorage(this.authenticationObject.key, this.authenticationObject);
			// this.openSnackBar(snackbarMessages.email_sent,true);
			// this.isEmailLoading = false;
		} else {
			this.authService.touchAllfields(this.emailForm);
			this.isEmailLoading = false;
		}
	}

	verifyOTP() {
		// If valid save the otpdone in localstorage
		this.isOTPLoading = true;
		if (this.OTPForm.valid) {
			this.isOTPFormDone = true;
			this.authenticationObject = {
				key: this.authenticationObject.key,
				isEmailDone: true,
				isOtpDone: true
			};
			this.coreMutate.setJSONDataInLocalStorage(this.authenticationObject.key, this.authenticationObject);
			this.openSnackBar(snackbarMessages.otp_verified,true);
			this.isOTPLoading = false;
		} else {
			this.authService.touchAllfields(this.OTPForm);
			this.isOTPLoading = false;
		}
	}

	routeToLogin() {
		this.router.navigate([ urlPaths.Authentication.Signin.url ]);
	}

	openSnackBar(message,isAccepted) {
		this.sharedService.openSnackBar({
			data: { message: message, isAccepted: isAccepted },
			duration: 2,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}
}
