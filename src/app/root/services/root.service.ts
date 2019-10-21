import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecurityService } from '../../core/security-services/security.service';

@Injectable({
	providedIn: 'root'
})
export class RootService {
	constructor(private securityService: SecurityService) {}

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
}
