import { Params } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../../config/interfaces/dupay.interface';
import { Roles } from '../../config/enums/dupay.enum';
import { Observable } from 'rxjs';
import { QueryService } from '../query-services/query.service';
import { localStorageKeys } from '../../config/constants/dupayConstants';
import { first } from "rxjs/operators";
import { UtilityService } from "../utility-services/utility-service.service";
import { HttpHeaders } from "@angular/common/http";
// import {Headers} from '@angular/common/http'
@Injectable({
	providedIn: 'root'
})
export class SecurityService {
	constructor(private queryservice: QueryService,
		private utilityService: UtilityService
	) { }

	checkAuthorization(user: User, isRoleValid: string): boolean {
		if (user && Roles[isRoleValid] != null && user.role == isRoleValid) {
			return true;
		}
		return false;
	}

	matchAdmin(user: User): boolean {
		return this.checkAuthorization(user, Roles.ADMIN);
	}

	matchMerchant(user: User): boolean {
		return this.checkAuthorization(user, Roles.MERCHANT);
	}

	isAdmin(): Observable<boolean> {
		return new Observable((observer) => {
			let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
			if (this.matchAdmin(user)) {
				observer.next(true);
			} else {
				observer.next(false);
			}
		});
	}

	isMerchant(): Observable<boolean> {
		return new Observable((observer) => {
			let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
			if (this.matchMerchant(user)) {
				observer.next(true);
			} else {
				observer.next(false);
			}
		});
	}

	isLoggedIn(): Observable<boolean> {
		return new Observable((observer) => {
			let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
			let token = this.queryservice.readValueFromLocalStorage(localStorageKeys.Token);

			if (user && token) {
				observer.next(true);
			} else {
				observer.next(false);
			}
		});
	}

	getRole(): Observable<any> {
		return new Observable(observer => {
			let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
			let token = this.queryservice.readValueFromLocalStorage(localStorageKeys.Token);
			if (user && token) {
				observer.next(user.role);
			} else {
				observer.next(Roles.anonymousUser);
			}

		})
	}

	getHeader(Token: any): any {
		
		let httpheader=new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization':`Bearer ${Token}`
		});
		
		let httpOptions = {
			headers: httpheader
		}
		
		return httpOptions;
	}
	getHeaderWithQueryParams(Token: any,params): any {
		
		let httpheader=new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization':`Bearer ${Token}`
		});
		
		let httpOptions = {
			headers: httpheader,
			params:params
		}
		
		return httpOptions;
	}

	getTokenRole(): Observable<any> {
		return new Observable((observer) => {
			this.queryservice.getToken().pipe(first()).subscribe(
				(response) => {
					if (response) {
						let jsonToken = this.utilityService.decodeToken(response);
						if (jsonToken && jsonToken['authorities'] && jsonToken['authorities'][0]) {
							observer.next(jsonToken['authorities'][0]);

						}
					}
					else {
						observer.next(null);

					}
				},
				(err) => {
					observer.error(err);
				}
			);
		});
	}

	getCurrentUser(): Observable<any> {
		return new Observable(observer => {
			let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
			if (user) {
				observer.next(user);
			} else {
				observer.next(null);
			}
		})
	}

	getAuthorizedHeader(){
		let token=this.queryservice.getTokenDirect();
		let header=this.getHeader(token);
		return header;
	}
	getAuthorizedQueryParamsHeader(params){
		let token=this.queryservice.getTokenDirect();
		let header=this.getHeaderWithQueryParams(token,params);
		return header;
	}

	getLoggedInUserId(){
		let user=this.queryservice.getLoggedInUser();
		if(user && user.id){
			return user.id;
		}
		return null;
	}
	getLoggedInUserRole(){
		let user=this.queryservice.getLoggedInUser();
		if(user && user.role){
			return user.role;
		}
		return null;
	}
	

	getLoggedinEmail(){
		let user = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
		if(user && user.email){
			return user.email;
		}
		return null;
	}

}
