import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { urlPaths } from '../../config/constants/dupayConstants';

@Injectable({
	providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
	constructor(private securityService: SecurityService, private router: Router) {}

	canActivate(): Observable<boolean> {
		return new Observable((observer) => {
			this.securityService.isMerchant().subscribe((res) => {
				if (res) {
					observer.next(true);
				} else if (!res) {
					observer.next(false);
					this.router.navigate([ urlPaths.Authentication.Signin.url ]);
				}
			});
		});
	}
}
