import { QueryService } from '../../core/query-services/query.service';
import { api_path } from '../../config/apiRoutes/apiroutes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from '../../core/security-services/security.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private data = "http://103.221.253.163:8080/api/payment";

  constructor(private http: HttpClient,private securityService:SecurityService,private queryService:QueryService) { }

  getChartData():Observable<any>{
    return this.http.get(this.data);
  }
  public getAllTransactions(merchantId,pageNumber,pagesize): Observable<any> {
		return new Observable((observer) => {
			let params = new HttpParams().set('merchantId', merchantId).set('pageNumber', pageNumber).set('pageSize',pagesize );

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
}
