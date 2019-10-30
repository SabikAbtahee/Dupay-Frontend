import { Injectable } from '@angular/core';
import { QueryService } from 'src/app/core/query-services/query.service';
import { Observable } from 'rxjs';
import { TransferRequest } from 'src/app/config/interfaces/dupay.interface';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { api_path } from 'src/app/config/apiRoutes/apiroutes';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(private queryService:QueryService, private securityService: SecurityService) { }


  getTransferRequestList(): Observable<TransferRequest[]>{

    return new Observable( (observer) => {
      this.queryService.getToken().subscribe( res =>{
        let token = res;
        console.log(" token = " + token);
        let header = this.securityService.getHeader(token);
        this.queryService.httpGet(api_path.transferRequestList,header).subscribe( response=> {
          console.log(" transfer request List : "+ response);
          observer.next(response);
        },
        err=>{
          console.log( "error transfer request List "+ err);
          observer.error(err);
        });
      });
    });

  }



}
