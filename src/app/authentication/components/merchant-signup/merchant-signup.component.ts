import { dupayConst, snackbarMessages, localStorageKeys } from './../../../config/constants/dupayConstants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex, authentication_error_messages, urlPaths } from '../../../config/constants/dupayConstants';
import { FieldMatcher, UtilityService } from '../../../core/utility-services/utility-service.service';
import { Merchant_Types } from '../../../config/enums/dupay.enum';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { email, emailOtp, Merchant } from '../../../config/interfaces/dupay.interface';
import { QueryService } from '../../../core/query-services/query.service';
import { MutationService } from '../../../core/mutation-services/mutation.service';
import { SharedService } from '../../../shared/services/shared.service';
import { first } from 'rxjs/operators';
import { authenticationEmailOtp } from '../../../config/interfaces/configurations.interface';

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
		private sharedService: SharedService,
		private util: UtilityService
	) {}

	// Localstorage Object
	authenticationObject: authenticationEmailOtp = {
		key: localStorageKeys.DupaySignUp
	};

	// Progress bar
	isEmailLoading = false;
	isOTPLoading = false;
	isSignUpLoading = false;

	isresendOtp = false;

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
	snackbarMessages=snackbarMessages;
	urlPaths = urlPaths;

	ngOnInit() {
		this.checkForm();
		this.makeEmailForm();
		this.makeOTPForm();
		this.makeSignupFormMerchant();
		this.setCustomValidation();
	}

	checkForm() {
		let check: authenticationEmailOtp = this.coreQuery.readJSONValueFromLocalStorage(this.authenticationObject.key);
		if (check && check.isEmailDone) {
			this.isEmailFormDone = true;
		}
		if (check && check.isOtpDone) {
			this.isOTPFormDone = true;
		}
	}

	// 3 Forms related to signup
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
			username: [ '', [ Validators.required, Validators.maxLength(20), Validators.minLength(5) ] ],
			trade_insurance: [ '' ],
			nid_number: [ '', Validators.required ],
			password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			confirm_password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			merchant_type: [ '', Validators.required ]
		});
	}

	// Matching password and confirm password
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

	sendOTPtoEmail() {
		// If valid save the email in local storage and send email
		this.isEmailLoading = true;
		if (this.emailForm.valid) {
			let email: email = {
				email: this.emailForm.value.email
			};
			this.authService.sendOtpToEmailforSignUp(email).pipe(first()).subscribe(
				(res) => {
					this.isEmailFormDone = true;
					this.authenticationObject = {
						key: this.authenticationObject.key,
						email: this.emailForm.value.email,
						isEmailDone: true,
						isOtpDone: false
					};
					

					this.coreMutate.setJSONDataInLocalStorage(this.authenticationObject.key, this.authenticationObject);
					this.openSnackBar(res.message, true);
					this.isEmailLoading = false;
				},
				(err) => {
					
					let message = this.util.giveErrorMessage(err);
					
					if(typeof(message)=='string'){
						this.openSnackBar(this.util.toCapitalize(message), false);
					}
					else{
						this.openSnackBar(snackbarMessages.try_again, false);

					}
					this.isEmailLoading = false;
				}
			);
		} else {
			this.authService.touchAllfields(this.emailForm);
			this.isEmailLoading = false;
		}
	}

	verifyOTP() {
		this.isOTPLoading = true;
		if (this.OTPForm.valid) {
			let emailOtp: emailOtp = {
				email: this.coreQuery.readJSONValueFromLocalStorage(this.authenticationObject.key).email,
				otpCode: this.OTPForm.value.otp
			};

			this.authService.verifyOtpOfEmailForSignUp(emailOtp).pipe(first()).subscribe(
				(res) => {
					this.isOTPFormDone = true;
					this.authenticationObject = this.coreQuery.readJSONValueFromLocalStorage(
						this.authenticationObject.key
					);
					this.authenticationObject.isOtpDone = true;
					this.coreMutate.setJSONDataInLocalStorage(this.authenticationObject.key, this.authenticationObject);
					this.openSnackBar(snackbarMessages.otp_verified, true);
					this.isOTPLoading = false;
				},
				(err) => {
					this.isresendOtp = true;
					let message = this.util.giveErrorMessage(err);
					this.openSnackBar(this.util.toCapitalize(message), false);
					this.isOTPLoading = false;
				}
			);
		} else {
			this.authService.touchAllfields(this.OTPForm);
			this.isOTPLoading = false;
		}
	}

	resendOtp() {
		this.coreMutate.deleteKeyInLocalStorage(this.authenticationObject.key);
		this.isresendOtp = false;
		this.isEmailFormDone = false;
		this.isOTPFormDone = false;
	}

	onSignupSubmit() {
		this.isSignUpLoading = true;
		// If valid delete localstorage
		if (this.signupform.valid) {
			let merchant: Merchant = {
				username: this.signupform.value.username,
				name: this.signupform.value.name,
				email: this.coreQuery.readJSONValueFromLocalStorage(this.authenticationObject.key).email,
				NID: this.signupform.value.nid_number,
				balance: 0.0,
				password: this.signupform.value.password,
				type: this.signupform.value.merchant_type,
				tradeInsurance: this.signupform.value.trade_insurance
			};
			this.authService.signUpMerchantAccount(merchant).pipe(first()).subscribe(
				(res) => {
					this.coreMutate.deleteKeyInLocalStorage(this.authenticationObject.key);
					this.openSnackBar(snackbarMessages.registration_complete, true);
					this.isSignUpLoading = false;
					this.route(urlPaths.Home.HomeDefault.url);
				},
				(err) => {
					let message = this.util.giveErrorMessage(err);
					this.openSnackBar(this.util.toCapitalize(message), false);
					this.isSignUpLoading = false;
				}
			);
		} else {
			this.authService.touchAllfields(this.signupform);
			this.isSignUpLoading = false;
		}
	}

	route(path) {
		this.router.navigate([ path ]);
	}

	openSnackBar(message, isAccepted) {
		this.sharedService.openSnackBar({
			data: { message: message, isAccepted: isAccepted },
			duration: 2,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}
}
