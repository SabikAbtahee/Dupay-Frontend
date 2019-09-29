import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Status } from 'src/app/config/enums/dupay.enum';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {

  merchants: Merchant[] = [{
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 3498,
    Merchant_status: Merchant_Status.Active,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  },
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 3498,
    Merchant_status: Merchant_Status.Active,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  },
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 3498,
    Merchant_status: Merchant_Status.Active,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  },
  {
    Merchant_NID: "3452394839843948(NID)",
    Merchant_balance: 3498,
    Merchant_status: Merchant_Status.Active,
    Merchant_trade_inc:"Merchant_trade_inc",
    Merchant_type:"Merchant Type",
    code:"merchantcode"
  }];

  constructor() { }

  ngOnInit() {

  }

}
