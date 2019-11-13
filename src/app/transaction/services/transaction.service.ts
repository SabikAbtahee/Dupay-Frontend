import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/core/query-services/query.service';
import { api_path } from 'src/app/config/apiRoutes/apiroutes';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
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
}
