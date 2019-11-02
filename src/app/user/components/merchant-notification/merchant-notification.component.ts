import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {trigger,state,style,animate,transition}from '@angular/animations';
import { element } from 'protractor';

@Component({
  selector: 'app-merchant-notification',
  templateUrl: './merchant-notification.component.html',
  styleUrls: ['./merchant-notification.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  
})
export class MerchantNotificationComponent implements OnInit {

  dataSource = new MatTableDataSource(NOTIFICATION_DATA);
  columnsToDisplay = ['date', 'id', 'message'];
  expandedElement: MerchantNotification | null;

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeNotificationStatus(element,isRead:boolean){
   
       element.isRead=true;
  }
   
  constructor() { }

  ngOnInit() {
  }

}

export interface MerchantNotification {
  date: string;
  id: string;
  message: string;
  description: string;
  isRead: boolean;
}

const NOTIFICATION_DATA: MerchantNotification[] = [
  {
    date: '1',
    id: 'abc',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`,
    isRead:false
  }, {
   date: '2',
    id: 'bcd',
    message: 'Dummy transaction of 5.00 BDT',
    description: `At 10 pm GMT+6, transaction of 5 BDT took place`,
    isRead:true
  }, {
    date: '3',
    id: 'cde',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`,
    isRead:true
      }, {
    date: '4',
    id: 'def',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`,
    isRead:true
  }, {
    date: '5',
    id: 'efg',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`,
    isRead:true
      }, {
     date: '6',
    id: 'fgh',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`
    ,isRead:true
  }, {
   date: '7',
    id: 'ghi',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`,
        isRead:true
  }, {
    date: '1',
    id: '123456789',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`
    ,isRead:true
  }, {
    date: '1',
    id: '123456789',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`
  ,isRead:true
      }, {
  
    date: '1',
    id: '123456789',
    message: 'Dummy transaction of 5.00 BDT',
    description:`At 10 pm GMT+6, transaction of 5 BDT took place`
        ,isRead:true
      }

];