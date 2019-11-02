import { Injectable } from '@angular/core';
import { QueryService } from 'src/app/core/query-services/query.service';
import { Observable, observable } from 'rxjs';
import { TransferRequest } from 'src/app/config/interfaces/dupay.interface';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { api_path } from 'src/app/config/apiRoutes/apiroutes';
import { MutationService } from 'src/app/core/mutation-services/mutation.service';
import { ObserversModule } from '@angular/cdk/observers';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(private queryService:QueryService, private securityService: SecurityService,
    private mutationService:MutationService) { }


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

  updateTransferRequestStatus(updateData: any): Observable<TransferRequest>{

    return new Observable( (observer) => {
      this.queryService.getToken().subscribe( res =>{
        let token = res;
        console.log("transfer request update token = "+ token);
        let header = this.securityService.getHeader(token);
        this.mutationService.httpPost(api_path.transferRequestStatusChange,updateData,header).subscribe( response =>{
            console.log(" transfer request update result = "+ response);
            observer.next(response);
        },err=>{
          console.log( "error  transfer request update status = "+ err );
          observer.error(err);
        });
      });
    });

  }


}
