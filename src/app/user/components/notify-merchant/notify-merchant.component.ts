import { Component, OnInit } from '@angular/core';
import {NotifyMerchantService} from "../../services/notify-merchant.service";


export interface notifyMerchantTable {
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
  displayedColumns: string[] = [ 'name', 'userName','select'];
  data : notifyMerchantTable []=[];
  dataSource;
  select_All: boolean = false;
  constructor(private notifyMerchantService:NotifyMerchantService) { }

  ngOnInit() {


    this.notifyMerchantService.getAppovedMerchantList().subscribe(res=>{
        res.forEach(item => {
            this.data.push({
              name: item.name,
              userName: item.username,
              checked: false
            })

        });
        this.dataSource = this.data;
        }
      );
  }

  notify() {
    this.data.forEach( item=>{
      if(item.checked == true){
        console.log(item);
      }
    });


  }

  updateCheckBox() {
    if(this.select_All){
      this.data.forEach( item=>{
        item.checked =true;
      })
    }
    else{
      this.data.forEach( item=>{
        item.checked =false;
      })
    }
  }
}
