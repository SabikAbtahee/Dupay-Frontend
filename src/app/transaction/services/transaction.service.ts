import { Injectable } from '@angular/core';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Observable } from 'rxjs';
import { QueryService } from 'src/app/core/query-services/query.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private securityService: SecurityService,
              private queryService: QueryService) { }

  public getAllTransactionsByUserId(): Observable<any> {

    return new Observable((observer) => {
      this.securityService.getCurrentUser().subscribe(res => {
        this.queryService.httpGet(res.id, res.token).subscribe( res => {
          
          observer.next(res);
        }, err => {
          
          observer.error(err);
        });

      });

    });
  }
}