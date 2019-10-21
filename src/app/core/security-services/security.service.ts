import { Injectable } from '@angular/core';
import { User } from '../../config/interfaces/dupay.interface';
import { Roles } from '../../config/enums/dupay.enum';
import { Observable } from 'rxjs';
import { QueryService } from '../query-services/query.service';
import { localStorageKeys } from '../../config/constants/dupayConstants';

@Injectable({
	providedIn: 'root'
})
export class SecurityService {
	constructor(private queryservice: QueryService) {}

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
  
  getRole():Observable<any>{
    return new Observable(observer=>{
      let user: User = this.queryservice.readJSONValueFromLocalStorage(localStorageKeys.User);
      let token = this.queryservice.readValueFromLocalStorage(localStorageKeys.Token);
      if (user && token) {
				observer.next(user.role);
			} else {
				observer.next(Roles.anonymousUser);
			}

    })
  }
}
