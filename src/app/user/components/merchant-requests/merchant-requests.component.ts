import { Component, OnInit, ViewChild } from '@angular/core';
import { Merchant } from 'src/app/config/interfaces/dupay.interface';
import { User } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Status } from 'src/app/config/enums/dupay.enum';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { MerchantDetailsComponent } from '../merchant-details/merchant-details.component';

@Component({
  selector: 'app-merchant-requests',
  templateUrl: './merchant-requests.component.html',
  styleUrls: ['./merchant-requests.component.scss']
})
export class MerchantRequestsComponent implements OnInit {

  dataSource: MatTableDataSource<Merchant>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  merchants = new MatTableDataSource<Merchant>();
  public displayedColumns = ['SI No.', 'username', 'name', 'details', 'approve', 'reject'];


  requests: Merchant[] = []
  APPROVE = "A";
  REJECT = "R";

  filteredRequests: Merchant[]
  private _searchTerm: string;


  get searchTerm(): string {
    return this._searchTerm;
  }

  // set searchTerm(value:string){
  //   this._searchTerm=value;
  //   this.filteredRequests=this.filterRequests(value);
  // }


  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log('ng on init called');
    this.getMerchantList();

  }


  getMerchantList() {
    this.userService.getPendingMerchantList().subscribe(res => {
      this.merchants.data = res as Merchant[];
    });
  }

  applyFilter(filterValue: string) {
    this.merchants.filter = filterValue.trim().toLowerCase();
  }

  public openConfirmationDialog = (id: string, actionType: string) => {
    console.log('has come here');
    let title: string = "";
    if (actionType == this.APPROVE) title = "Approve Merchant!";
    else if (actionType == this.REJECT) title = "Reject Merchant!";

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { message: title, buttons: ["Confirm", "Cancel"],
     }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result after closed:' + result);
      if (result) {

        if (actionType == this.APPROVE) this.approve(id);
        else if (actionType == this.REJECT) this.reject(id);
      }
    });
  }

  public approve = (id: string) => {
    console.log('id:' + id);
    this.userService.approveMerchant(id).subscribe(res => {
      console.log('result in approve:');
      console.log(res);
      this.removeMerchantFromPendingList(id);

    }, err => {
      console.log('error');
      console.log(err);
    })
  }

  public reject = (id: string) => {
    console.log('id:' + id);
    this.userService.rejectMerchant(id).subscribe(res => {
      console.log('result in approve:');
      console.log(res);
      this.removeMerchantFromPendingList(id);

    }, err => {
      console.log('error');
      console.log(err);
    })
  }

  private removeMerchantFromPendingList(id: string) {
    let index;
    console.log('removing merchant from request list');
    for (let i = 0; i < this.merchants.data.length; i++) {
      if (this.merchants.data[i].id == id) {
        index = i;
        break;
      }
    }
    this.merchants.data.splice(index, 1);
    this.merchants._updateChangeSubscription();

  }

  public redirectToDetails = (id: string) => {

    this.userService.getMerchantDetails(id).subscribe(res => {
      console.log('merchant details');
      console.log(res);
      res.nidFile = "data:image/png;base64," + res.nidFile;
      res.tradeInsuranceFile = "data:image/png;base64," + res.tradeInsuranceFile;
      this.dialog.open(MerchantDetailsComponent, {
        data: res,
        autoFocus: false,
        maxHeight: '90vh',
        maxWidth: '80vw !important'
      }).afterClosed().subscribe(result => {
      });
    }, err => {
      console.error(err);
    });
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {
    console.log('in rederectToDelete');

  }




}
