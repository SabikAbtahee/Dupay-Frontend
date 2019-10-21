import { BlankComponent } from './blank/blank.component';
import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { AuthGuard } from '../core/security-services/auth.guard';
import { AdminGuard } from '../core/security-services/admin.guard';

export const routes: Routes = [
    {
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: '',
		component: NavSideBarComponent,
		children: [
			{
				path: 'home',
				loadChildren: '../home/home.module#HomeModule',
			},
			{
				path:'user',
				loadChildren:'../user/user.module#UserModule',
				canActivate: [AuthGuard]

			},
			{
				path:'transaction',
				loadChildren:'../transaction/transaction.module#TransactionModule',
			},
			{
				path:'withdrawal',
				loadChildren:'../withdrawal/withdrawal.module#WithdrawalModule',
			}
			
		]
	},
    {
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'authentication',
				loadChildren: '../authentication/authentication.module#AuthenticationModule',
				
			}
		]
	},
	
    {
		path: '**',
		component: NotFoundComponent
	}
];