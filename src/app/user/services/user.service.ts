import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_path } from 'src/app/config/apiRoutes/apiroutes';
import { QueryService } from 'src/app/core/query-services/query.service';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private queryService: QueryService,
    private securityService: SecurityService) { }

  public getAllMerchant(): Observable<Merchant[]> {

    return new Observable((observer) => {
      this.queryService.getToken().subscribe(res => {
        let token = res;
        console.log('token:' + token);
        let header = this.securityService.getHeader(token);
        this.queryService.httpGet(api_path.merchantList, header).subscribe(res => {
          console.log('result:');
          console.log(res);
          observer.next(res);
        }, err => {
          console.log('error:');
          console.log(err);
          observer.error(err);
        });

      });

    });
  }

  public getAppovedMerchantList(): Observable<Merchant[]> {
    return new Observable(observer => {
      this.getAllMerchant().subscribe(res => {
        let merchants: Merchant[] = [];
        res.forEach(item => {
          if (!item.pending) merchants.push(item);
        });
        observer.next(merchants);

      }, err => {
        observer.error(err);
      });
    })

  }

  public getPendingMerchantList(): Observable<Merchant[]> {
    return new Observable(observer => {
      this.getAllMerchant().subscribe(res => {
        let merchants: Merchant[] = [];
        res.forEach(item => {
          if (item.pending) merchants.push(item);
        });
        observer.next(merchants);

      }, err => {
        observer.error(err);
      });
    })

  }

}