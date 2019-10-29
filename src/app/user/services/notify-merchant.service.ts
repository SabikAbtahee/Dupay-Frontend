import { Injectable } from '@angular/core';
import {QueryService} from "../../core/query-services/query.service";
import {Observable} from "rxjs";
import {SecurityService} from "../../core/security-services/security.service";
import {api_path} from "../../config/apiRoutes/apiroutes";
import {Merchant} from "../../config/interfaces/dupay.interface";

@Injectable({
  providedIn: 'root'
})
export class NotifyMerchantService {

  constructor(private  queryService:QueryService,
              private securityService:SecurityService

  ) { }
  public getAppovedMerchantList(): Observable<Merchant[]> {
    return new Observable(observer => {
      this.getAllMerchant().subscribe(res => {
        let merchants: Merchant[] = [];
        res.forEach(item => {
          if (!item.pending){
            merchants.push(item);
          }
        });
        observer.next(merchants);

      }, err => {
        observer.error(err);
      });
    })

  }
  getAllMerchant(): Observable<Merchant[]>{
    return new Observable((observer) => {
      let token;
      this.queryService.getToken().subscribe(res =>{
        token = res;
        let httpHeader = this.securityService.getHeader(token);

        this.queryService.httpGet(api_path.merchantList,httpHeader).subscribe(res => {
          console.log('result:');
          console.log(res);
          observer.next(res);
        }, err => {
          console.log('error:');
          console.log(err);
          observer.error(err);
        })
      })

    })
  }
}
