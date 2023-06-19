import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://15.206.167.68:8080/finAggAPIService/api/v1/login/validateUser';

  constructor(private http: HttpClient) { }
  
  // validateUser(userName: string, password: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${userName}/${password}`);
  // }
  validateUser(obj: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, obj);
  }

//   validateUser(login: Object): Observable<Object> {
//     console.log(JSON.stringify(login));
//     return this.http.post(`${this.baseUrl}`, login);
//   }

}
