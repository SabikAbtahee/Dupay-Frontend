import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Status } from 'src/app/config/enums/dupay.enum';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {

  
  merchants: Merchant[]=[
    {
      email:'asd',
      username:'asd',
      
    },
      
    ]

  constructor() { }

  ngOnInit() {

  }

}
