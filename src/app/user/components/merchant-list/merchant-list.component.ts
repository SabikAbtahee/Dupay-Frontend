import { MerchantDetailsComponent } from './../merchant-details/merchant-details.component';
import { Component, OnInit } from '@angular/core';
import { Merchant, DialogData } from 'src/app/config/interfaces/dupay.interface';
import { Merchant_Types } from 'src/app/config/enums/dupay.enum';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
	selector: 'app-merchant-list',
	templateUrl: './merchant-list.component.html',
	styleUrls: [ './merchant-list.component.scss' ]
})
export class MerchantListComponent implements OnInit {
	input;

	merchants = new MatTableDataSource<Merchant>();
	public displayedColumns = [ 'name', 'balance', 'details', 'notify' ];

	constructor(private userService: UserService, private route: Router, public dialog: MatDialog) {}

	ngOnInit() {
		this.getMerchantList();
	}

	public getMerchantList = () => {
		this.userService.getAppovedMerchantList().subscribe((res) => {
			this.merchants.data = res as Merchant[];
			console.log(this.merchants.data);
		});
	};

	public openNotifyDialog(merchantId: string) {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '500px',
			data: { message: 'message', buttons: [ 'Ok', 'No thanks' ], input: true }
		});

		dialogRef.afterClosed().subscribe((result) => {});
	}

	applyFilter(filterValue: string) {
		this.merchants.filter = filterValue.trim().toLowerCase();
	}

	public redirectToDetails = (id: string) => {
		let specificMerchant: Merchant;

		this.userService.getMerchantDetails(id).subscribe(
			(res) => {
				this.userService.getMerchantAccountDetails(id).subscribe(
					(res2) => {
            console.log('merchant details');
            console.log('res:'+JSON.stringify(res));
						console.log('res2:'+JSON.stringify(res2));
						res.nidFile = 'data:image/png;base64,' + res.nidFile;
						res.tradeInsuranceFile = 'data:image/png;base64,' + res.tradeInsuranceFile;
						this.dialog
							.open(MerchantDetailsComponent, {
								data: res,
								autoFocus: false,
								maxHeight: '90vh',
								maxWidth: '80vw !important'
							})
							.afterClosed()
							.subscribe((result) => {});
					},
					(err) => {
						console.log(err);
					}
				);
			},
			(err) => {
				console.error(err);
			}
		);
	};

	public redirectToUpdate = (id: string) => {};

	public redirectToDelete = (id: string) => {};

	public redirectToNotifyMerchant(id: string) {
		this.userService.setMerchantIdToNotify(id);
		this.route.navigate([ 'user', 'notify-merchant' ]);
	}
}
