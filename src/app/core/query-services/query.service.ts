import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, first } from 'rxjs/operators';
import { dupayConst, localStorageKeys } from '../../config/constants/dupayConstants';
import { HttpHeaders } from '@angular/common/http';
import { api_path } from '../../config/apiRoutes/apiroutes';


@Injectable({
	providedIn: 'root'
})



export class QueryService {
	constructor(private http: HttpClient) {}

	

	// Get Single data as admin given an entity
	getSingleDataAsAdmin(entity): Observable<any> {
		return this.http.get(api_path.baseURLAdmin + entity);
	}

	// Get Single data as merchant given an entity
	getSingleDataAsMerchant(entity): Observable<any> {
		return this.http.get(api_path.baseURLMerchant + entity);
	}

	//Check If connection is successful 
	checkConnectionStatus(): Observable<any> {
		return this.http.get(api_path.baseURL + 'status', { responseType: 'text' });
	}

	//Read Data from localStorage
	readValueFromLocalStorage(key) {
		return localStorage.getItem(key);
	}
	//Read JSON data from localStorage
	readJSONValueFromLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key));
	}



	getToken():Observable<any>{
		return new Observable(observer=>{
			let token=this.readValueFromLocalStorage(localStorageKeys.Token);
			if(token){
				observer.next(token);
				observer.complete();
			}
			else{
				observer.next(null);
				observer.complete();

			}
		})
	}
	
	getUser():Observable<any>{
		return new Observable(observer=>{
			let user=this.readValueFromLocalStorage(localStorageKeys.User);
			if(user){
				observer.next(user);
				observer.complete();
			}
			else{
				observer.next(null);
				observer.complete();

			}
		})
	}

	httpGet(apiPath, httpheader): Observable<any> {
		
		return new Observable((observer) => {
			
			this.http.get<any>(`${apiPath}`, httpheader).subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				}
			);
		});
	}
	

	getLoggedInUser(){
		return this.readJSONValueFromLocalStorage(localStorageKeys.User);
	}

	getTokenDirect(){
		return this.readValueFromLocalStorage(localStorageKeys.Token);
	}
}
