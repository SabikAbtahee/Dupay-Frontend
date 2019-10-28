import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Types } from 'src/app/config/enums/dupay.enum';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {


  merchants = new MatTableDataSource<Merchant>();
  public displayedColumns = ['name', 'tradeInsurance', 'balance', 'details', 'update', 'delete'];

  constructor(private userService:UserService) { }

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

  public getMerchantList = () => {

    this.userService.getAppovedMerchantList().subscribe(res=>{
      this.merchants.data = res as Merchant[];
    });
    
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
