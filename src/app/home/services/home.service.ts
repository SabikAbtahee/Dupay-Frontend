import { Injectable } from '@angular/core';
import { QueryService } from '../../core/query-services/query.service';
import { Observable } from 'rxjs';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class HomeService {
	constructor(private query: QueryService,private security:SecurityService,private shared:SharedService) {}

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

	getRole():Observable<any>{
		return new Observable(observer=>{
			this.security.getTokenRole().pipe(first()).subscribe(res=>{
				observer.next(res);
			},err=>{
				observer.error(err);
			})
		})
	}


}
