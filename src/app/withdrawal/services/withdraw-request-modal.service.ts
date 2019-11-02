import { WithdrawRequestComponent } from './../components/withdraw-request/withdraw-request.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WithdrawRequestModalService {

  constructor(public dialog: MatDialog) { }

  openWithdrawRequestModal(width?: string) {
    const dialogRef = this.dialog.open(WithdrawRequestComponent, {

      minWidth:'450px',
      width: width ? width : '35vw'
      // height:'60vh'
    });
}
}