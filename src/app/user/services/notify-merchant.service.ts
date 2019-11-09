import { Injectable } from '@angular/core';
import {QueryService} from "../../core/query-services/query.service";
import {Observable} from "rxjs";
import {SecurityService} from "../../core/security-services/security.service";
import {api_path} from "../../config/apiRoutes/apiroutes";
import {Merchant, merchantNotification, passwordChange} from "../../config/interfaces/dupay.interface";
import {MatDialog} from "@angular/material";
import {PasswordChangeComponent} from "../components/password-change/password-change.component";
import {MerchantNotificationComponent} from "../components/merchant-notification/merchant-notification.component";
import {MutationService} from "../../core/mutation-services/mutation.service";
import {SharedService} from "../../shared/services/shared.service";
import {NotificationComponent} from "../components/notification/notification.component";

@Injectable({
  providedIn: 'root'
})
export class NotifyMerchantService {
  data : merchantNotification ;
  merchantIdList : string[] = [];
  message:string = null;
  constructor(private  queryService:QueryService,
              private securityService:SecurityService,
              public dialog: MatDialog,
              private mutationService:MutationService,
              private sharedService: SharedService

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

  openDialog(width?: string) {
    const dialogRef = this.dialog.open(NotificationComponent, {
      height: '20vw',
      minWidth:'450px',
      width: width ? width : '35vw'
      // height:'60vh'
    });
  }
  close(){
    this.dialog.closeAll();
  }
  sendNotification():Observable<any> {
    this.data = {
      message : this.message,
      merchantIds : this.merchantIdList
    };
    let token;
    let httpHeader;


    return new Observable(observer=>{
      this.queryService.getToken().subscribe(res => {
        token = res;
        httpHeader = this.securityService.getHeader(token);
        this.mutationService.httpPost(`${api_path.notifyMerchant}`,
          this.data, httpHeader).subscribe(res2 => {
          observer.next(res2);
          console.log(res2);
        },
          (err) => {
            observer.error(err);
            console.log(err);
          },
          () => {
            observer.complete();
          }
        );

      });
    });



  }

}
