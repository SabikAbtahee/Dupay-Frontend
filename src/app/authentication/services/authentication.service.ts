import { api_path } from './../../config/apiRoutes/apiroutes';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpOptionsJson, httpOptionsText, httpHeader } from '../../config/constants/dupayConstants';
import { first, catchError } from 'rxjs/operators';
import { otpVerification } from '../../config/interfaces/configurations.interface';
import { email, Merchant } from '../../config/interfaces/dupay.interface';
import { MutationService } from 'src/app/core/mutation-services/mutation.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	api_paths = api_path;
	constructor(private fb: FormBuilder, private util: UtilityService, private http: HttpClient,private coreMutate:MutationService) {}

	touchAllfields(group: FormGroup) {
		this.util.touchAllFieldsOfForm(group);
	}

	sendOtpToEmailforSignUp(email: email): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.signUpOTPEmail}`,email,httpHeader);
	}

	verifyOtpOfEmailForSignUp(otpVerification: otpVerification): Observable<any> {
		return this.coreMutate.httpPost(`${api_path.signUpOTPVerification}`,otpVerification,httpHeader);
	}

	signUpMerchantAccount(merchant: Merchant): Observable<any> {
		debugger;
		return this.coreMutate.httpPost(`${api_path.registerMerchantAccount}`,merchant,httpHeader);
	}
		// return new Observable((observer) => {
		// 	this.http.post(`${api_path.registerMerchantAccount}`, merchant, httpHeader).pipe(first()).subscribe(
		// 		(res) => {
		// 			observer.next(res);
		// 		},
		// 		(err) => {
		// 			observer.error(err);
		// 		},
		// 		() => {
		// 			observer.complete();
		// 		}
		// 	);
		// });


		// return new Observable((observer) => {
		// 	this.http.post(`${api_path.signUpOTPVerification}`, otpVerification, httpHeader).pipe(first()).subscribe(
		// 		(res) => {
		// 			observer.next(res);
		// 		},
		// 		(err) => {
		// 			observer.error(err);
		// 		},
		// 		() => {
		// 			observer.complete();
		// 		}
		// 	);
		// });
	
		// return new Observable((observer) => {
		// 	this.http.post(`${api_path.signUpOTPEmail}`, email, httpHeader).pipe(first()).subscribe(
		// 		(res) => {
		// 			observer.next(res);
		// 		},
		// 		(err) => {
		// 			observer.error(err);
		// 		},
		// 		() => {
		// 			observer.complete();
		// 		}
		// 	);
		// });
}
