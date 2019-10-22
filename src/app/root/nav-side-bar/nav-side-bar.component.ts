import { dupayConst, urlPaths } from './../../config/constants/dupayConstants';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RootService } from '../services/root.service';
import { Roles } from 'src/app/config/enums/dupay.enum';

@Component({
	selector: 'app-nav-side-bar',
	templateUrl: './nav-side-bar.component.html',
	styleUrls: [ './nav-side-bar.component.scss' ]
})
export class NavSideBarComponent implements OnInit {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map((result) => result.matches), shareReplay());

	title: string;
	sidebar;
	Username: any = dupayConst.username;
	menuItems=dupayConst.menu;
	selectedRow: number;
	isExpanded: boolean = false;
	isAuthenticated: boolean = false;
	urlPaths = urlPaths;
	
	constructor(
		private breakpointObserver: BreakpointObserver,
		private router: Router,
		private rootService: RootService
	) {}

	ngOnInit() {
		this.initiateVariables();
		this.checkRow();
		this.getUsername();
		
	}
	initiateVariables() {
		this.title = dupayConst.siteName.name;
		this.makeSideBar();
	}

	makeSideBar() {
		this.rootService.checkRole().subscribe((res) => {
			let auth = false;
			if (res == Roles.ADMIN) {
				this.sidebar = dupayConst.AdminSidebar;
				auth = true;
			} else if (res == Roles.MERCHANT) {
				this.sidebar = dupayConst.MerchantSidebar;
				auth = true;
			} else if (res == Roles.anonymousUser) {
				this.sidebar = dupayConst.DefaultSideBar;
				auth = false;
			}
			this.checkAuthentication(auth);

			this.checkRow();
		});
	}

	route(url) {
		console.log(url);
		this.router.navigate([ url ]);
	}
	selectRow(index) {
		this.selectedRow = index;
	}
	checkRow() {
		let currentUrl = this.router.url;
		let count = 0;
		for (let i of this.sidebar) {
			if (currentUrl == `/${i.url}`) {
				this.selectedRow = count;
				break;
			}
			count += 1;
		}
	}
	checkAuthentication(res: boolean) {
		this.isAuthenticated = res;
	}

	logout(){
		this.rootService.logout();
		this.route(urlPaths.Authentication.Signin.url);
	}
	doRoute(){
		if(!this.isAuthenticated){
			this.route(this.urlPaths.Authentication.Signin.url);
		}
	}
	getUsername(){
		this.rootService.getUser().subscribe(res=>{
			if(res){
				this.Username=res.username;
			}
			else{
				this.Username=dupayConst.username.name;
			}
		});
	}
}
