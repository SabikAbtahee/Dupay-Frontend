import { api_path } from './../../config/apiRoutes/apiroutes';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpOptionsJson, httpOptionsText, httpHeader, httpHeaderLogin, localStorageKeys } from '../../config/constants/dupayConstants';
import { first, catchError } from 'rxjs/operators';
import { otpVerification, loginCredentials } from '../../config/interfaces/configurations.interface';
import { email, Merchant, User ,emailPasswordConfirmPassword} from '../../config/interfaces/dupay.interface';
import { MutationService } from '../../core/mutation-services/mutation.service';
import { SecurityService } from '../../core/security-services/security.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	api_paths = api_path;
	constructor(
		private fb: FormBuilder,
		private util: UtilityService,
		private http: HttpClient,
		private coreMutate: MutationService,
		private sec: SecurityService
	) { }

	touchAllfields(group: FormGroup) {
		this.util.touchAllFieldsOfForm(group);
	}

	sendOtpToEmailforSignUp(email: email): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.signUpOTPEmail}`, email, httpHeader);
	}

	verifyOtpOfEmailForSignUp(otpVerification: otpVerification): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.signUpOTPVerification}`, otpVerification, httpHeader);
	}

	signUpMerchantAccount(merchant: Merchant): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.registerMerchantAccount}`, merchant, httpHeader);
	}


	sendOtpToEmailforAccountRecovery(email: email): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.forgotPasswordOTPEmail}`, email, httpHeader);
	}

	verifyOtpOfEmailForAccountRecovery(otpVerification: otpVerification): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.forgotPasswordOTPVerification}`, otpVerification, httpHeader);
	}

	recoverMerchantAccount(emailPasswordConfirmPassword: emailPasswordConfirmPassword): Observable<any> {
		debugger;
		return this.coreMutate.httpPost(`${api_path.resetPassword}`, emailPasswordConfirmPassword, httpHeader);
	}




	signInAccount(login: loginCredentials): Observable<any> {

		// this.sec.isAdmin().subscribe(res=>console.log(res));
		return this.coreMutate.httpPost(`${api_path.loginWithUsernamePassword}`, login, httpHeaderLogin);
	}

	setSession(user: User) {
		this.coreMutate.setJSONDataInLocalStorage(localStorageKeys.User, user);
		this.coreMutate.setDataInLocalStorage(localStorageKeys.Token, user.token);
	}
}
