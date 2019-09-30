import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { dupayConst } from '../../config/constants/dupayConstants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class QueryService {
	constructor(private http: HttpClient) {}

	// Get Single data as admin given an entity
	getSingleDataAsAdmin(entity): Observable<any> {
		return this.http.get(dupayConst.baseURLAdmin + entity);
	}

	// Get Single data as merchant given an entity
	getSingleDataAsMerchant(entity): Observable<any> {
		return this.http.get(dupayConst.baseURLMerchant + entity);
	}
}
