import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {QueryService} from "../../core/query-services/query.service";
import {FormGroup} from "@angular/forms";
import {UtilityService} from "../../core/utility-services/utility-service.service";
import {api_path} from "../../config/apiRoutes/apiroutes";
import {passwordChange} from "../../config/interfaces/dupay.interface";
import {MutationService} from "../../core/mutation-services/mutation.service";
import {SecurityService} from "../../core/security-services/security.service";
import {PasswordChangeComponent} from "../components/password-change/password-change.component";
import {TradeInsurancePhotoComponent} from "../components/trade-insurance-photo/trade-insurance-photo.component";
import {NIDPhotoComponent} from "../components/nid-photo/nid-photo.component";
import {MatDialog} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private queryService: QueryService,
              private coreMutate: MutationService,
              private securityService: SecurityService,
              public dialog: MatDialog,
  private util: UtilityService) { }
  user;
  getProfileInformation() {
    // this.queryService.httpGet();
    this.queryService.getUser().subscribe(result => {
        this.user = result;
    });
    return this.user;
    // console.log("tt    "+token);
    // let data = this.queryService.getSingleDataAsMerchant('/'+token);
    // console.log("kk    "+data);


  }

  openNID(width?: string) {
    const dialogRef = this.dialog.open(NIDPhotoComponent, {

      minWidth: '450px',
      width: width ? width : '35vw'
      // height:'60vh'
    });
  }
  openTradeInsurance(width?: string) {
    const dialogRef = this.dialog.open(TradeInsurancePhotoComponent, {

      minWidth: '450px',
      width: width ? width : '35vw'
      // height:'60vh'
    });
  }

  touchAllfields(formgroup: FormGroup) {
    this.util.touchAllFieldsOfForm(formgroup);
  }
  updatePassword(passwordChange:passwordChange):Observable<any> {
    let token;
    let httpHeader;

    return new Observable(observer=>{
      this.queryService.getToken().subscribe(res => {
        token = res;
        httpHeader = this.securityService.getHeader(token);
        this.coreMutate.httpPut(`${api_path.changePassword}`,
          passwordChange, httpHeader).subscribe(res2=>{
          observer.next(res2);
        })

      });
    })



  }
}
