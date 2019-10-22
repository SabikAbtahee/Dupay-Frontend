import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from '../../core/security-services/security.service';
import { MutationService } from '../../core/mutation-services/mutation.service';
import { localStorageKeys } from '../../config/constants/dupayConstants';

@Injectable({
	providedIn: 'root'
})
export class RootService {
	constructor(private securityService: SecurityService, private mutateService: MutationService) {}

	checkRole(): Observable<any> {
		return new Observable((observer) => {
			this.securityService.getRole().subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				}
			);
		});
	}

	getUser():Observable<any>{
		return this.securityService.getCurrentUser();
	}

	logout() {
		let keys = localStorageKeys;
		for (let k in keys) {
			
			this.mutateService.deleteKeyInLocalStorage(k);
		}
	}
}
