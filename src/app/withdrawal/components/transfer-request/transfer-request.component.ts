import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { TransferRequest, TransferStatus } from 'src/app/config/interfaces/dupay.interface';
import { TransferState } from '@angular/platform-browser';
import { WithdrawalService } from '../../services/withdrawal.service';
import { element } from 'protractor';

@Component({
  selector: 'app-transfer-request',
  templateUrl: './transfer-request.component.html',
  styleUrls: ['./transfer-request.component.scss']
})
export class TransferRequestComponent implements OnInit {

  dummyData: TransferRequest[];
  displayedColumns: string[];
  statusList: TransferStatus[];
  transferRequests = new MatTableDataSource<TransferRequest>();

  @ViewChild(MatPaginator,  { static: true } ) paginator: MatPaginator;

  constructor(private withdrawalService:WithdrawalService) { }

  ngOnInit() {
    this.initialize();
    this.getTransferRequestList();
    this.transferRequests.paginator = this.paginator;
  }

  initialize(){
    this.displayedColumns = ["id", "time", "amount", "status" ];
    this.statusList = [
      {value: 'PENDING',viewValue:'Pending' },
      {value: 'IN_PROGRESS',viewValue:'In Progress' },
      {value: 'DONE',viewValue:'Complete' },
    ];
  }

  getTransferRequestList(){

    this.withdrawalService.getTransferRequestList().subscribe( res =>{
      this.transferRequests.data = res as TransferRequest[];
    });
  }

  onStatusChange(element: TransferRequest){

    if(element.status == "DONE"){
      console.log(element);
      // open dialog
    }
    else{

      // status not reversable
      let updateRequest = {
        id: element.id,
        transactionId: element.transactionId,
        status: element.status,
        systemAccount: null
      };
      this.withdrawalService.updateTransferRequestStatus(updateRequest).subscribe( res =>{
        console.log("updated result = " +res);
      });
    }

  }

}
