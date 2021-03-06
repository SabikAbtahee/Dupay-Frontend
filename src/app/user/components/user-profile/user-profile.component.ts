import { Component, OnInit } from '@angular/core';
import {PasswordModalService} from "../../services/password-modal.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProfileService} from "../../services/user-profile.service";
import {Merchant, MerchantAccount} from "../../../config/interfaces/dupay.interface";
import {SecurityService} from "../../../core/security-services/security.service";
import {Token_Role} from "../../../config/enums/dupay.enum";
import {QueryService} from "../../../core/query-services/query.service";
import {api_path} from "../../../config/apiRoutes/apiroutes";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileform: FormGroup;
  merchantAccount:MerchantAccount;
  user ;
  info ;
  role;
  balance;
  isMarchent = false ;
  constructor(private passwordmodal: PasswordModalService,private fb: FormBuilder,
              private userProfileService: UserProfileService,
              private queryService:QueryService,
              private securityService:SecurityService
              ) { }

  ngOnInit() {
    this.makeProfileForm();
    this.checkRole();
    this.setProfileInformation();
  }
  checkRole(){
    this.securityService.getTokenRole().subscribe(result =>{
      this.role = result;
    });
  }
  setProfileInformation() {
    this.user = this.userProfileService.getProfileInformation();
    this.setProfileForm();
  }
  setProfileForm() {
    var obj = JSON.parse(this.user);
    this.info = obj;
    console.log(obj);
    this.profileform.controls.name.patchValue(obj.name);
    this.profileform.controls.username.patchValue(obj.username);
    this.profileform.controls.email.patchValue(obj.email);
    if(this.role == Token_Role.ROLE_MERCHANT){
      this.isMarchent = true;
      let header = this.securityService.getAuthorizedHeader();
      let id = this.securityService.getLoggedInUserId();
      this.queryService.httpGet(`${api_path.getMerchantInfoWithId}/${id}`, header).subscribe(res =>{
        console.log(res);
        this.balance = res.balance;
      });
      this.queryService.httpGet(`${api_path.getMerchantAccounts}/${id}`,header).subscribe(res=>{
        this.merchantAccount={
          accountName:res.accountName,
          bankName:res.bankName,
          accountNumber:res.accountNumber,
          branch:res.branch
        }
      });
      this.profileform.controls.tradeInsurance.patchValue(obj.tradeInsurance);
      this.profileform.controls.balance.patchValue(obj.balance);
    }


    // this.profileform.controls.phoneNumber.patchValue(user.phoneNumber);
    // // this.profileform.controls.role.patchValue(user.role);
    // this.profileform.controls.homeAddress.patchValue(user.homeAddress);
    // this.profileform.controls.shopAddress.patchValue(user.shopAddress);
  }

  makeProfileForm() {
    this.profileform = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      // role: [ '', Validators.required ],
      email: [''],
      balance: [''],
      tradeInsurance: ['']
    });
  }
  // openChangePasswordModal() {
  //   this.passwordmodal.openPasswordChangeModal();
  // }

  openNIDModal() {
    this.userProfileService.openNID();
  }

  openTradeInsuranceModal() {
    this.userProfileService.openTradeInsurance();
  }

  // copyId(){
  //   const selBox = document.createElement('textarea');
  //   selBox.value = this.info.id;
  //   document.body.appendChild(selBox);
  //   selBox.focus();
  //   selBox.select();
  //   document.execCommand('copy');
  // }
}
