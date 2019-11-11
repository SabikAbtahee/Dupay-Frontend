import { Injectable } from '@angular/core';
import { QueryService } from '../../core/query-services/query.service';
import { Observable, observable } from 'rxjs';
import { TransferRequest, WithdrawRequest } from '../../config/interfaces/dupay.interface';
import { SecurityService } from '../../core/security-services/security.service';
import { api_path } from '../../config/apiRoutes/apiroutes';
import { MutationService } from '../../core/mutation-services/mutation.service';
import { ObserversModule } from '@angular/cdk/observers';
import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { UtilityService } from '../../core/utility-services/utility-service.service';

@Injectable({
	providedIn: 'root'
})
export class WithdrawalService {
	api_routes = api_path;
	constructor(
		private queryService: QueryService,
		private securityService: SecurityService,
		private mutationService: MutationService,
		private util:UtilityService,
		
	) {}

	getTransferRequestList(): Observable<TransferRequest[]> {
		return new Observable((observer) => {
			this.queryService.getToken().subscribe((res) => {
				let token = res;
				// console.log(' token = ' + token);
				let header = this.securityService.getHeader(token);
				this.queryService.httpGet(api_path.transferRequestList, header).subscribe(
					(response) => {
						// console.log(' transfer request List : ' + response);
						observer.next(response);
					},
					(err) => {
						// console.log('error transfer request List ' + err);
						observer.error(err);
					}
				);
			});
		});
	}

	updateTransferRequestStatus(updateData: any): Observable<TransferRequest> {
		return new Observable((observer) => {
			this.queryService.getToken().subscribe((res) => {
				let token = res;
				// console.log('transfer request update token = ' + token);
				let header = this.securityService.getHeader(token);
				this.mutationService.httpPost(api_path.transferRequestStatusChange, updateData, header).subscribe(
					(response) => {
						// console.log(' transfer request update result = ' + response);
						observer.next(response);
					},
					(err) => {
						// console.log('error  transfer request update status = ' + err);
						observer.error(err);
					}
				);
			});
		});
	}

	getMerchantAccounts(): Observable<any> {
		return new Observable((observer) => {
			let id = this.securityService.getLoggedInUserId();
			let httpheader = this.securityService.getAuthorizedHeader();
			this.queryService
				.httpGet(`${this.api_routes.getMerchantAccounts}/${id}`, httpheader)
				.pipe(first())
				.subscribe(
					(res) => {
						observer.next(res);
					},
					(err) => {
						observer.error(err);
					}
				);
		});
	}

	getMerchantInfo(): Observable<any> {
		return new Observable((observer) => {
			let id = this.securityService.getLoggedInUserId();
			let httpheader = this.securityService.getAuthorizedHeader();
			this.queryService
				.httpGet(`${this.api_routes.getMerchantInfoWithId}/${id}`, httpheader)
				.pipe(first())
				.subscribe(
					(res) => {
						observer.next(res);
					},
					(err) => {
						observer.error(err);
					}
				);
		});
		
	}
	getEmail(){
		return this.securityService.getLoggedinEmail();
	}
	touchAllfields(group: FormGroup) {
		this.util.touchAllFieldsOfForm(group);
	}

	withdrawMoney(payload:WithdrawRequest):Observable<any>{
		let httpHeader = this.securityService.getAuthorizedHeader();
		
		return this.mutationService.httpPost(`${api_path.withdrawRequestByMerchant}`,payload,httpHeader)
	}

	getWithdrawRequestsByMerchant():Observable<any>{
		let id = this.securityService.getLoggedInUserId();
		let httpHeader = this.securityService.getAuthorizedHeader();
		return this.queryService.httpGet(`${api_path.withdrawRequestByMerchant}/${id}`,httpHeader)

	}
}
