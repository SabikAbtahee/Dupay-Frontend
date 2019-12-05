import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { SecurityService } from '../../core/security-services/security.service';
import { MutationService } from '../../core/mutation-services/mutation.service';
import { localStorageKeys } from '../../config/constants/dupayConstants';
import { QueryService } from '../../core/query-services/query.service';
import { first } from 'rxjs/operators';
import { UtilityService } from '../../core/utility-services/utility-service.service';

@Injectable({
	providedIn: 'root'
})
export class RootService {

	private source = new BehaviorSubject(0);
	changeRow = this.source.asObservable();
	  
	constructor(
		private securityService: SecurityService,
		private mutateService: MutationService,
		private queryService: QueryService,
		private utilityService:UtilityService,
	) {}

	checkRow(row:number){
		this.source.next(row);
	}

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

	getUser(): Observable<any> {
		return this.securityService.getCurrentUser();
	}

	logout() {
		let keys = localStorageKeys;
		for (let k in keys) {
			this.mutateService.deleteKeyInLocalStorage(k);
		}
	}

	getTokenRole(): Observable<any> {
		return new Observable((observer) => {
			this.queryService.getToken().pipe(first()).subscribe(
				(response) => {
					if (response) {
						let jsonToken=this.utilityService.decodeToken(response);
						if(jsonToken && jsonToken['authorities']&& jsonToken['authorities'][0]){
							observer.next(jsonToken['authorities'][0]);

						}
					}
					else{
						observer.next(null);

					}
				},
				(err) => {
					observer.error(err);
				}
			);
		});
	}
}
