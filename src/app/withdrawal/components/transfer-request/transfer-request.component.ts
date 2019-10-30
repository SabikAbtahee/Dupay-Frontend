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
  statusIndexMap : any;
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
    let i=0;
    this.statusIndexMap = new Map(this.statusList.map( element => [element.value, i++])) ;
  }

  getTransferRequestList(){
    this.withdrawalService.getTransferRequestList().subscribe( res =>{
      this.transferRequests.data = res as TransferRequest[];
    });
  }

  getStatusList(status:string): TransferStatus[]{
    return Object.assign([], this.statusList).splice(this.statusIndexMap.get(status),this.statusList.length);
  }

  onStatusChange(element: TransferRequest){

    if(element.status == "DONE"){
      console.log(element);
      // open dialog
    }
    else{
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
