import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { urlPaths, snackbarMessages } from '../../config/constants/dupayConstants';
import { SecurityService } from './security.service';
import { SharedService } from '../../shared/services/shared.service';

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor(
		private securityService: SecurityService,
		private router: Router,
		private sharedService: SharedService
	) {}

	canActivate(): Observable<boolean> {
		return new Observable((observer) => {
			this.securityService.isAdmin().subscribe((res) => {
				if (res) {
					observer.next(true);
				} else if (!res) {
					observer.next(false);
					this.openSnackBar(snackbarMessages.access_denied, false);
					this.router.navigate([ urlPaths.Home.HomeDefault.url ]);
				}
			});
		});
	}
	openSnackBar(message, isAccepted) {
		this.sharedService.openSnackBar({
			data: { message: message, isAccepted: isAccepted },
			duration: 2,
			panelClass: [ 'recovery-snackbar' ],
			horizontalPosition: 'right',
			verticalPosition: 'top'
		});
	}
}
