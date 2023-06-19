import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CollectionService {

  private baseUrl = 'http://15.206.167.68:8080/finAggAPIService/api/v1';

  constructor(private http: HttpClient) { }

 
  // getGstTurnoverList(): Observable<any> {
  //   // console.count(this.baseUrl);
  //   return this.http.get(`${this.baseUrl}/gstTurnoverList`);
  // }
  
}
