import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Types } from 'src/app/config/enums/dupay.enum';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { environment } from 'src/environments/environment';
import { QueryService } from 'src/app/core/query-services/query.service';
import { httpHeader } from 'src/app/config/constants/dupayConstants';
import { SecurityService } from 'src/app/core/security-services/security.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {


  merchants = new MatTableDataSource<Merchant>();
  public displayedColumns = ['name', 'tradeInsurance', 'balance', 'details', 'update', 'delete'];

  constructor(private userService:UserService, private queryService:QueryService,
    private securityService:SecurityService) { }

  ngOnInit() {
    console.log('ng on init called');
    this.getMerchantList();
    this.merchants.data = [{
      NID: "3452394839843948(NID)",
      balance: 3498,
      pending: false,
      email: "bsse0811@iit.du.ac.bd",
      approved: true,
      code: "merchantcode",
      username: "tulshidas",
      name: "tulshi das",
      id: "thisisaid",
      password: "thisisapassword",
      tradeInsurance: "thisistradeinsurance",
      type: Merchant_Types.TYPE_A
    },
    {
      NID: "3452394839843948(NID)",
      balance: 3498,
      pending: false,
      email: "bsse0811@iit.du.ac.bd",
      approved: true,
      code: "merchantcode",
      username: "tulshidas",
      name: "tulshi das",
      id: "thisisaid",
      password: "thisisapassword",
      tradeInsurance: "thisistradeinsurance",
      type: Merchant_Types.TYPE_A
    },
    {
      NID: "3452394839843948(NID)",
      balance: 3498,
      pending: false,
      email: "bsse0811@iit.du.ac.bd",
      approved: true,
      code: "merchantcode",
      username: "tulshidas",
      name: "tulshi das",
      id: "thisisaid",
      password: "thisisapassword",
      tradeInsurance: "thisistradeinsurance",
      type: Merchant_Types.TYPE_A
    },
    {
      NID: "3452394839843948(NID)",
      balance: 3498,
      pending: false,
      email: "bsse0811@iit.du.ac.bd",
      approved: true,
      code: "merchantcode",
      username: "tulshidas",
      name: "tulshi das",
      id: "thisisaid",
      password: "thisisapassword",
      tradeInsurance: "thisistradeinsurance",
      type: Merchant_Types.TYPE_A
    }];
  }

  public getMerchantList = async() => {
    
    this.queryService.getToken().subscribe(res =>{
     let  token = res;
     console.log('token:'+token);
     let header = this.securityService.getHeader(token);
     this.queryService.httpGet(environment.baseurl+"/api/admin/merchant",header).subscribe(res=>{
       console.log('result:');
       console.log(res);
     },err=>{
       console.log('error:');
       console.log(err);
     });

    });
    
    //console.log('token:'+token);
    // let merchantList = await fetch(environment.baseurl+ "/api/admin/merchant");
    // console.log('merchant list1');
    // console.log(merchantList);
    // let merchantlistJson = await  merchantList.json();
    // console.log('merchant list json:');
    // console.log(merchantlistJson);
    // return merchantlistJson;
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
