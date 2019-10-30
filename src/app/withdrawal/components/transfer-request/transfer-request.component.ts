import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TransferRequest } from 'src/app/config/interfaces/dupay.interface';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.scss']
})
export class TransferRequestComponent implements OnInit {

  displayedColumns: string[] = ["id", "time", "amount", "status" ];
  statusList: string[] = ["Accept","Pending","Complete"];
  transferRequests = new MatTableDataSource<TransferRequest>();

  constructor() { }

  ngOnInit() {
    this.getTransferRequestList();
  }

  getTransferRequestList(){

    let data: TransferRequest[] = [
      {id: '1', time: 1.10, amount: 120.50, status: 'Accept'},
      {id: '2', time: 0.10, amount: 50.50, status: 'Complete'},
      {id: '3', time: 1.10, amount: 110.50, status: 'Accept'},
      {id: '4', time: 18.10, amount: 20.54, status: 'Complete'},
      {id: '5', time: 15.10, amount: 12.50, status: 'Pending'}
    ];

    // using service get data and link with datasource

    this.transferRequests.data = data as TransferRequest[];
  }


}
