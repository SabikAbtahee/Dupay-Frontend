import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifyMerchantService } from "../../services/notify-merchant.service";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { snackbarMessages } from "../../../config/constants/dupayConstants";
import { SharedService } from "../../../shared/services/shared.service";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


export interface notifyMerchantTable {
  id: string;
  name: string;
  userName: string;
  checked: boolean;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-notify-merchant',
  templateUrl: './notify-merchant.component.html',
  styleUrls: ['./notify-merchant.component.scss']
})
export class NotifyMerchantComponent implements OnInit {
  displayedColumns: string[] = ['name', 'userName', 'select'];
  data: notifyMerchantTable[] = [];
  dataSource = new MatTableDataSource<notifyMerchantTable>(this.data);
  select_All: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  disable: boolean = true;
  constructor(private notifyMerchantService: NotifyMerchantService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.notifyMerchantService.getAppovedMerchantList().subscribe(res => {
      res.forEach(item => {
        this.data.push({
          id: item.id,
          name: item.name,
          userName: item.username,
          checked: false
        })
        this.dataSource.paginator = this.paginator;
      });

      this.userService.merchantIdToNotify.subscribe(id => this.checkSelectedMerchant(id));

    }
    );

  }

  checkSelectedMerchant(merchantId: string) {
    this.data.forEach(item => {
      if (item.id == merchantId) {
        item.checked = true;
        return;
      }
    });

  }

  notify() {
    let merchantIdList: string[] = [];
    this.data.forEach(item => {
      if (item.checked == true) {
        merchantIdList.push(item.id);
      }
    });
    if (merchantIdList.length == 0) {
      this.openSnackBar("Please select merchant", false);

    }
    else {
      this.notifyMerchantService.merchantIdList = merchantIdList;
      this.notifyMerchantService.openDialog();
      // this.data.forEach( item=>{
      //   item.checked =false;
      //
      // });
      // this.select_All = false;
    }
  }

  updateCheckBox() {
    if (this.select_All) {
      this.data.forEach(item => {
        item.checked = false;
      })
    }
    else {
      this.data.forEach(item => {
        item.checked = true;
        this.disable = false;
      })
    }
  }


  openSnackBar(message, isAccepted) {
    this.sharedService.openSnackBar({
      data: { message: message, isAccepted: isAccepted },
      duration: 2,
      panelClass: ['recovery-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
