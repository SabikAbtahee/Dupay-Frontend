import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Observable } from 'rxjs';
import { QueryService } from '../../core/query-services/query.service';
import { api_path } from '../../config/apiRoutes/apiroutes';
import { httpHeader } from '../../config/constants/dupayConstants';
import { first, concatMap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class TransactionService {
	api_path=api_path;
	constructor(private securityService: SecurityService, private queryService: QueryService) {}

	public getAllTransactionsByUserId(merchantId): Observable<any> {
		return new Observable((observer) => {
			let params = new HttpParams().set('merchantId', merchantId).set('pageNumber', '0');

			let httpHeader = this.securityService.getAuthorizedQueryParamsHeader(params);
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
	public getAllTransactionsUntilEnd(merchantId,pageNumber): Observable<any> {
		return new Observable((observer) => {
			let params = new HttpParams().set('merchantId', merchantId).set('pageNumber', pageNumber).set('pageSize','10' );

			let httpHeader = this.securityService.getAuthorizedQueryParamsHeader(params);
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

	public getTransactionGivenMerchantIdPageSizePageIndex(merchantId,size,index): Observable<any>{
		return new Observable((observer) => {
			let params = new HttpParams().set('merchantId', merchantId).set('pageNumber', index).set('pageSize',size );
			let httpHeader = this.securityService.getAuthorizedQueryParamsHeader(params);
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

	getCurrentUserID(){
		return this.securityService.getLoggedInUserId();
	}
	getLoggedInUserRole(){
		return this.securityService.getLoggedInUserRole();
	}
}
