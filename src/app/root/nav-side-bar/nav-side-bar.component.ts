import { dupayConst } from './../../config/constants/dupayConstants';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
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
	Username: any=dupayConst.username;
	menuItems;
	selectedRow: number;

	constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

	ngOnInit() {
		this.initiateVariables();
		this.selectedRow = 0;
		// this.route(dupayConst.sidebar[0].url);
	}
	initiateVariables() {
		this.title = dupayConst.siteName.name;

		this.makeSideBar();
	}
	
	makeSideBar() { 
		this.sidebar = dupayConst.DefaultSideBar;
		// this.sidebar = dupayConst.AdminSidebar;
		// this.sidebar = dupayConst.MerchantSidebar;
	}

	route(url) {
		this.router.navigateByUrl(url);
	}
	selectRow(index) {
		this.selectedRow = index;
	}
}
