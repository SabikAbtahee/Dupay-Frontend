import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Observable } from 'rxjs';
import { QueryService } from '../../core/query-services/query.service';
import { api_path } from '../../config/apiRoutes/apiroutes';
import { httpHeader } from '../../config/constants/dupayConstants';
import { first } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	api_path=api_path;
	constructor(private securityService: SecurityService, private queryService: QueryService) {}

	public getAllTransactionsByUserId(): Observable<any> {
		return new Observable((observer) => {
			let httpHeader = this.securityService.getAuthorizedHeader();
			this.queryService.httpGet(api_path.payment, httpHeader).subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				},() => {
					observer.complete();
				}
			);
		});
	}


	queryTransaction(id):Observable<any>{
		let key= 'transactionId'
		return new Observable(observer=>{
			this.queryService.httpGet(`${api_path.payment}/?${key}=${id}`,httpHeader).pipe(first()).subscribe(res=>{
				observer.next(res);
			},
			err=>{
				observer.next(err);
			})
		})
	}
}
