import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private data = "http://103.221.253.163:8080/api/payment";

  constructor(private http: HttpClient) { }

  getChartData():Observable<any>{
    return this.http.get(this.data);
  }
}
