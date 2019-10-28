import { Injectable } from '@angular/core';
import { UtilityService } from '../utility-services/utility-service.service';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MutationService {
	constructor(private util: UtilityService, private http: HttpClient) {}

	// Update data

	// Create data
	setJSONDataInLocalStorage(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	}
	setDataInLocalStorage(key, value) {
		localStorage.setItem(key, value);
	}
	// Delete Data
	deleteKeyInLocalStorage(key) {
		localStorage.removeItem(key);
	}
	clearLocalStorage() {
		localStorage.clear();
	}

	httpPost(apiPath, payload, httpheader): Observable<any> {
		
		return new Observable((observer) => {
			this.http.post<any>(`${apiPath}`, payload, httpheader).pipe(first()).subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				},
				() => {
					observer.complete();
				}
			);
		});
	}
	httpPut(apiPath, payload, httpheader): Observable<any> {

		return new Observable((observer) => {
			this.http.put<any>(`${apiPath}`, payload, httpheader).pipe(first()).subscribe(
				(res) => {
					observer.next(res);
				},
				(err) => {
					observer.error(err);
				},
				() => {
					observer.complete();
				}
			);
		});
	}
}
