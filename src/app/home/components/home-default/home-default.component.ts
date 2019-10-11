import { Component, OnInit } from '@angular/core';
// import { QueryService } from 'src/app/core/query-services/query.service';
import { HomeService } from '../../services/home.service';

@Component({
	selector: 'app-home-default',
	templateUrl: './home-default.component.html',
	styleUrls: [ './home-default.component.scss' ]
})
export class HomeDefaultComponent implements OnInit {
	constructor(private homeService:HomeService) {}

	ngOnInit() {
		// this.homeService.checkConnectionStatus().subscribe(res=>{
		// 	console.log(res);
		// })
		
	}
}
