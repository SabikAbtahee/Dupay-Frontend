import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { api_path } from 'src/app/config/apiRoutes/apiroutes';
import { QueryService } from 'src/app/core/query-services/query.service';
import { SecurityService } from 'src/app/core/security-services/security.service';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { MutationService } from 'src/app/core/mutation-services/mutation.service';
import { Merchant_Status } from 'src/app/config/enums/dupay.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private source = new BehaviorSubject('');
  merchantIdToNotify = this.source.asObservable();

  constructor(private queryService: QueryService,
    private securityService: SecurityService, private mutationService: MutationService) { }

  setMerchantIdToNotify(message: string) {
    this.source.next(message);
  }

  public getAllMerchant(): Observable<Merchant[]> {

    return new Observable((observer) => {
      this.queryService.getToken().subscribe(res => {
        let token = res;
        // console.log('token:' + token);
        let header = this.securityService.getHeader(token);
        this.queryService.httpGet(api_path.merchantList, header).subscribe(res => {
          // console.log('result:');
          // console.log(res);
          observer.next(res);
        }, err => {
          // console.log('error:');
          // console.log(err);
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
          if (item.status == Merchant_Status.Approved) merchants.push(item);
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
          if (item.status == Merchant_Status.Pending) merchants.push(item);
        });
        observer.next(merchants);

      }, err => {
        observer.error(err);
      });
    })

  }

  public approveMerchant(id: string): Observable<Merchant[]> {

    return new Observable((observer) => {
      let header = this.securityService.getAuthorizedHeader();
      this.mutationService.httpPut(api_path.approveMerchant + "/" + id, {}, header).subscribe(res => {
        observer.next(res);
      },
        err => {
          observer.error(err);
        })

    });

  }


  public rejectMerchant(id: string): Observable<any> {
    return new Observable((observer) => {
      let header = this.securityService.getAuthorizedHeader();
      this.mutationService.httpPut(api_path.rejectMerchant + id, {}, header).subscribe(res => {
        observer.next(res);
      },
        err => {
          observer.error(err);
        })

    });

  }

  public getMerchantDetails(id: string): Observable<Merchant> {
    return new Observable((observer) => {
      let header = this.securityService.getAuthorizedHeader();
      this.queryService.httpGet(api_path.merchantDetails + id, header).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      })
    })
  }

  public getMerchantAccountDetails(MerchantId:string):Observable<Merchant>{
    return new Observable(obs=>{
      let header = this.securityService.getAuthorizedHeader();
      this.queryService.httpGet(api_path.getMerchantAccountsAdmin,header).subscribe(res=>{
        // var result = res.filter(obj => {
        //   return obj.id === MerchantId
        // })
        obs.next(res);
      },err=>{
        obs.error(err);
      })
    })
  }


}