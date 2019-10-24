import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import * as _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { snackbarMessages } from '../../config/constants/dupayConstants';
@Injectable({
	providedIn: 'root'
})
export class UtilityService {
	constructor() {}

	getFormControlsValueFromFormGroup(fg: FormGroup) {
		let controls = [];
		_.forEach(Object.keys(fg.controls), function(value: string, key: string) {
			controls = [ ...controls, value ];
		});
		return controls;
	}

	touchAllFieldsOfForm(formgroup: FormGroup) {
		let fields = this.getFormControlsValueFromFormGroup(formgroup);
		_.forEach(fields, (value, key) => {
			formgroup.controls[value].markAsTouched();
		});
	}

	handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	}

	toJSON(str) {
		let object = str;
		try {
			object = JSON.parse(str);
		} catch (e) {
			return object;
		}
		return object;
	}

	giveErrorMessage(err) {
		if (err && err.error && err.error.error) {
			if (typeof err.error.error == 'string') {
				return err.error.error;
			} else {
				return snackbarMessages.try_again;
			}
		} else if (err && err.error) {
			if (typeof err.error == 'string') {
				return err.error;
			} else {
				return snackbarMessages.try_again;
			}
		} else {
			if (typeof err == 'string') {
				return err;
			} else {
				return snackbarMessages.try_again;
			}
		}
	}

	toCapitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	decodeToken(token) {
		var ca = token;
		var base64Url = ca.split('.')[1];
		var decodedValue = JSON.parse(window.atob(base64Url));
		return decodedValue;
	}
}
export class FieldMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		return form.hasError('not_matching') && control.touched
			? form.hasError('not_matching')
			: control && control.invalid && control.touched ? control.invalid : false;
	}
}
