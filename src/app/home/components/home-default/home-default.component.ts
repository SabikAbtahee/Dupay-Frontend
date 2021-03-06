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

	role:string;
	isMerchant:boolean=false;
	ngOnInit() {
		this.getRole();
		
	}
	getRole(){
		this.homeService.getRole().subscribe(res=>{
			if(res=='ROLE_MERCHANT'){
				this.role='merchant';
				this.isMerchant=true;
			}
			else{
				this.role=res;
			}
		},
		err=>{
			console.log('Cannot get role');
		})
	}

}
