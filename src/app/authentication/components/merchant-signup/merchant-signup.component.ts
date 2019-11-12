import { dupayConst, snackbarMessages, localStorageKeys } from './../../../config/constants/dupayConstants';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordRegex, authentication_error_messages, urlPaths } from '../../../config/constants/dupayConstants';
import { FieldMatcher, UtilityService } from '../../../core/utility-services/utility-service.service';
import { Merchant_Types } from '../../../config/enums/dupay.enum';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { email, emailOtp, Merchant, MerchantAccount } from '../../../config/interfaces/dupay.interface';
import { QueryService } from '../../../core/query-services/query.service';
import { MutationService } from '../../../core/mutation-services/mutation.service';
import { SharedService } from '../../../shared/services/shared.service';
import { first } from 'rxjs/operators';
import { authenticationEmailOtp } from '../../../config/interfaces/configurations.interface';
import { Observable } from 'rxjs';
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

	// Page format
	isEmailFormDone = false;
	isOTPFormDone = false;

	// Forms
	emailForm: FormGroup;
	OTPForm: FormGroup;
	signupform: FormGroup;
	merchantAccountForm: FormGroup;
	matcher;
	merchant_types = Merchant_Types;
	error_messages = authentication_error_messages;
	snackbarMessages = snackbarMessages;
	urlPaths = urlPaths;

	trade_insurance_filename = null;
	nid_filename = null;

	ngOnInit() {
		this.checkForm();
		this.makeEmailForm();
		this.makeOTPForm();
		this.makeSignupFormMerchant();
		this.makeMerchantAccountForm();
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
		if (!this.isEmailFormDone) {
			this.makeEmailForm();
		}
		if (!this.isOTPFormDone) {
			this.makeOTPForm();
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
			name: [ '', [ Validators.required, Validators.maxLength(20), Validators.minLength(5) ] ],
			username: [ '', [ Validators.required, Validators.maxLength(20), Validators.minLength(5) ] ],
			trade_insurance_file: [ null, [ Validators.required ] ],
			nid_file: [ null, [ Validators.required ] ],
			password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			confirm_password: [ '', [ Validators.required, Validators.pattern(passwordRegex) ] ],
			merchant_type: [ '', [ Validators.required ] ]
		});
	}
	makeMerchantAccountForm() {
		this.merchantAccountForm = this.fb.group({
			accountName: [ '', [ Validators.required, Validators.maxLength(70) ] ],
			accountNumber: [ '', [ Validators.required, Validators.maxLength(70) ] ],
			bankName: [ '', [ Validators.required, Validators.maxLength(70) ] ],
			branch: [ '', [ Validators.required, Validators.maxLength(70) ] ]
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

					if (typeof message == 'string') {
						this.openSnackBar(this.util.toCapitalize(message), false);
					} else {
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
		this.isEmailFormDone = false;
		this.isOTPFormDone = false;
		this.checkForm();
	}

	onSignupSubmit() {
		this.isSignUpLoading = true;
		if (this.signupform.valid && this.merchantAccountForm.valid) {
			let payloadOfMerchant = new FormData();
			let merchant: Merchant = {
				username: this.signupform.value.username,
				name: this.signupform.value.name,
				email: this.coreQuery.readJSONValueFromLocalStorage(this.authenticationObject.key).email,
				balance: 0.0,
				password: this.signupform.value.password,
				type: this.signupform.value.merchant_type
			};
			let merchantstringified = JSON.stringify(merchant);
			payloadOfMerchant.append('nidFile', this.signupform.value.nid_file);
			payloadOfMerchant.append('tradeInsuranceFile', this.signupform.value.trade_insurance_file);
			payloadOfMerchant.append('merchantInfo', merchantstringified);
			this.authService.signUpMerchantAccount(payloadOfMerchant).pipe(first()).subscribe(
				(res) => {
					debugger;
					this.merchantAccountSubmit(res.id).pipe(first()).subscribe(response=>{
						debugger;

						this.coreMutate.deleteKeyInLocalStorage(this.authenticationObject.key);
						this.openSnackBar(snackbarMessages.registration_complete, true);
						this.isSignUpLoading = false;
						this.route(urlPaths.Authentication.Signin.url);
					},
					err=>{
						debugger;

						let message = this.util.giveErrorMessage(err);
						this.openSnackBar(this.util.toCapitalize(message), false);
						this.isSignUpLoading = false;
					});
					
				},
				(err) => {
					debugger;

					let message = this.util.giveErrorMessage(err);
					this.openSnackBar(this.util.toCapitalize(message), false);
					this.isSignUpLoading = false;
				}
			);
		} else {
			this.authService.touchAllfields(this.signupform);
			this.authService.touchAllfields(this.merchantAccountForm);

			if (this.signupform.value.nid_file == null || this.signupform.value.trade_insurance_file == null) {
				this.openSnackBar('Please upload files', false);
			}
			this.isSignUpLoading = false;
		}
	}

	merchantAccountSubmit(mer_id):Observable<any>{
		return new Observable(observer=>{
			debugger;
			let payload={
				accountName: this.merchantAccountForm.value.accountName,
				accountNumber: this.merchantAccountForm.value.accountNumber,
				bankName: this.merchantAccountForm.value.bankName,
				branch: this.merchantAccountForm.value.branch,
				merchant:{
					id:mer_id
				}
			}
			debugger;

			this.authService.registerMerchantBankAccount(payload).pipe(first()).subscribe(res=>{
			debugger;
				
				observer.next(res);
			},
			err=>{
				observer.error(err);
			})
		})
	}

	onNIDFileSelect(event) {
		if (event && event.target && event.target.files.length > 0) {
			if (this.util.ifFileImage(event.target.files[0])) {
				// this.imageblob = event.target.files[0];
				this.signupform.patchValue({
					nid_file: event.target.files[0]
				});
				this.nid_filename = event.target.files[0].name;
			}
		}
	}

	onTradeInsuranceFileSelect(event) {
		if (event && event.target && event.target.files.length > 0) {
			if (this.util.ifFileImage(event.target.files[0])) {
				// this.imageblob = event.target.files[0];
				this.signupform.patchValue({
					trade_insurance_file: event.target.files[0]
				});

				this.trade_insurance_filename = event.target.files[0].name;
			}
		}
	}

	route(path) {
		this.coreMutate.deleteKeyInLocalStorage(this.authenticationObject.key);
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
