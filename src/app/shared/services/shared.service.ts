import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { snackbar } from '../../config/interfaces/configurations.interface';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private snackbar: MatSnackBar,public dialog: MatDialog,private spinner: NgxSpinnerService) { }

  openSnackBar(configuration: snackbar) {
		this.snackbar.openFromComponent(SnackbarComponent, {
			duration: (configuration.duration ? configuration.duration : 1) * 1000,
			data: configuration.data,
			horizontalPosition: configuration.horizontalPosition ? configuration.horizontalPosition : 'right',
			verticalPosition: configuration.verticalPosition ? configuration.verticalPosition : 'bottom',
			panelClass: configuration.panelClass ? configuration.panelClass : null
		});
	}

	openSpinner(){
		this.spinner.show();
	}
	hideSpinner(){
		this.spinner.hide();
	}
}
