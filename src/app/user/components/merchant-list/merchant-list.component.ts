import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {

  marchants = ['DESCO','TITAS'];

  constructor() { }

  ngOnInit() {
  }

}
