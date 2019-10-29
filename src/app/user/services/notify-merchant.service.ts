import { Injectable } from '@angular/core';
import {QueryService} from "../../core/query-services/query.service";
import {Observable} from "rxjs";
import {SecurityService} from "../../core/security-services/security.service";

@Injectable({
  providedIn: 'root'
})
export class NotifyMerchantService {

  constructor(private  queryService:QueryService,
              private securityService:SecurityService

  ) { }
  getMerchant(){
    return new Observable((observer) => {
      let token;
      this.queryService.getToken().subscribe(res =>{
        token = res;
        let httpHeader = this.securityService.getHeader(token);
        this.queryService.httpGet()
      })

    })
  }
}
