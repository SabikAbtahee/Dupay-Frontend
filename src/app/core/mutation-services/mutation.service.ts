import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MutationService {
	constructor() {}

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
  clearLocalStorage(){
    localStorage.clear();
  }
}
