import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/core/query-services/query.service';
import { api_path } from 'src/app/config/apiRoutes/apiroutes';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private securityService: SecurityService,
              private queryService: QueryService) { }

  public getAllTransactionsByUserId(): Observable<any> {

    return new Observable((observer) => {
      this.securityService.getCurrentUser().subscribe(res => {
        let httpHeader = this.securityService.getHeader(res.token);
        this.queryService.httpGet(api_path.payment, httpHeader).subscribe( res => {
          // console.log('result:');
          // console.log(res);
          observer.next(res);
        }, err => {
          console.log('error:');
          console.log(err);
          observer.error(err);
        });

      });

    });
  }
}