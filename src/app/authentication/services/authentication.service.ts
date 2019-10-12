import { api_path } from './../../config/apiRoutes/apiroutes';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpOptionsJson, httpOptionsText } from '../../config/constants/dupayConstants';
import { first, catchError } from 'rxjs/operators';
import { otpVerification } from '../../config/interfaces/authentication.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	api_paths = api_path;
	constructor(private fb: FormBuilder, private util: UtilityService, private http: HttpClient) {}

	touchAllfields(group: FormGroup) {
		this.util.touchAllFieldsOfForm(group);
	}

	sendOtpToEmailforSignUp(email: string): Observable<any> {
		return new Observable((observer) => {
			this.http.post(`${api_path.signUpOTPEmail}`, email, httpOptionsText).pipe(first()).subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				},
				() => {
					observer.complete();
				}
			);
		});
	}



	verifyOtpOfEmailForSignUp(otpVerification: otpVerification): Observable<any> {
		return new Observable((observer) => {
			this.http
				.post(`${api_path.signUpOTPVerification}`, otpVerification, httpOptionsJson)
				.pipe(first())
				.subscribe((res) => {
					observer.next(res);
				}),
				(err) => observer.error(err),
				() => observer.complete();
		});
	}

	// signin(signin):Observable<any>{
	//   return new Observable(observer=>{

	//   })

	// }
}
