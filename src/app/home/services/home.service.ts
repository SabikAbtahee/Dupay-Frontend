import { Injectable } from '@angular/core';
import { QueryService } from '../../core/query-services/query.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	constructor(private query: QueryService) {}

	checkConnectionStatus(): Observable<any> {
		return new Observable((observer) => {
			this.query.checkConnectionStatus().subscribe((res) => {
				observer.next(res);
			}),
				(err) => {
					observer.error(err);
				},
				() => {
					observer.complete();
				};
		});

		
	}
}
