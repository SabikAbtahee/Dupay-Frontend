import { dupayConst, urlPaths } from './../../config/constants/dupayConstants';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RootService } from '../services/root.service';
import { Roles, Token_Role } from '../../config/enums/dupay.enum';
import { Token } from '@angular/compiler';
import _ from 'lodash';
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
	sidebar = [];
	Username: any = dupayConst.username;
	menuItems = dupayConst.menu;
	selectedRow: number;
	isExpanded: boolean = false;
	isAuthenticated: boolean = false;
	urlPaths = urlPaths;
	userRole: string;
	constructor(
		private breakpointObserver: BreakpointObserver,
		private router: Router,
		private rootService: RootService
	) {}

	ngOnInit() {
		this.initiateVariables();
		this.checkRow();
		this.getUsername();
		this.setRole();
	}
	initiateVariables() {
		this.title = dupayConst.siteName.name;
	}

	route(url) {
		console.log(url);
		this.router.navigate([ url ]).then(res=>{
			this.checkRow();
		});
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

	logout() {
		this.rootService.logout();
		this.route(urlPaths.Authentication.Signin.url);
	}
	doRoute() {
		if (!this.isAuthenticated) {
			this.route(this.urlPaths.Authentication.Signin.url);
		}
	}
	getUsername() {
		this.rootService.getUser().subscribe((res) => {
			if (res) {
				this.Username = res.username;
			} else {
				this.Username = dupayConst.username.name;
			}
		});
	}
	setRole() {
		this.rootService.getTokenRole().pipe(first()).subscribe((res) => {
			if (res) {
				this.userRole = res;
			} else {
				this.userRole = Token_Role.ANNONYMOUS;
			}
			this.makeSideBar();
		});
	}
	makeSideBar() {
		let auth = false;
		if (this.userRole) {
			auth = true;
			_.forEach(dupayConst.sideBar, (res) => {
				let exists = _.includes(res.role, this.userRole);
				if (exists) {
					this.sidebar.push(res);
				}
			});
		}
		if (this.userRole && this.userRole == Token_Role.ANNONYMOUS) {
			auth = false;
		}

		this.checkAuthentication(auth);
		this.checkRow();
	}
}
