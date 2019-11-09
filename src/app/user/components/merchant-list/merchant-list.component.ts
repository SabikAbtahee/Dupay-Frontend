import { MerchantDetailsComponent } from './../merchant-details/merchant-details.component';
import { Component, OnInit } from '@angular/core';
import { Merchant, DialogData } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Types } from 'src/app/config/enums/dupay.enum';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  input;


  merchants = new MatTableDataSource<Merchant>();
  public displayedColumns = ['name','type', 'tradeInsurance', 'balance', 'details', 'notify'];

  constructor(private userService:UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    console.log('ng on init called');
    this.getMerchantList();
  }

  public getMerchantList = () => {

    this.userService.getAppovedMerchantList().subscribe(res=>{
      this.merchants.data = res as Merchant[];
      console.log('after refactored:');
      console.log(this.merchants.data);
    });

  }

  public openNotifyDialog(merchantId:string){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {message:"message",buttons:["Ok","No thanks"],input:true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result after closed:'+result);
    });
  }

  applyFilter(filterValue: string) {
    this.merchants.filter = filterValue.trim().toLowerCase();
  }

  public redirectToDetails = (id: string) => {
    let specificMerchant: Merchant;

    for(let i=0; i<this.merchants.data.length; i++){
      if (this.merchants.data[i].id === id) {
        specificMerchant = this.merchants.data[i];
      }
    }

    this.dialog.open(MerchantDetailsComponent, {
      data: specificMerchant
    }).afterClosed().subscribe(result => {
        console.log(result);
    });
  }

  public redirectToUpdate = (id: string) => {

  }

  public redirectToDelete = (id: string) => {

  }

}
