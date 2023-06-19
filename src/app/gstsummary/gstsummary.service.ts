import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GstsummaryService {

  private baseUrl = 'https://15.206.167.68:8080/finAggAPIService/api/v1/';

  constructor(private https: HttpClient) { }

  getGstSummaryList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/gstSummaryList`);
  }
  getGstTurnoverList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/gstTurnoverList`);
  }
  getPreCovidHSNList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/preCovidHSNList`);
  }
  getDuringCovidHSNList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/duringCovidHSNList`);
  }
  getPostCovidHSNList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/postCovidHSNList`);
  }
  gstnSalesSegmentList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/gstnSalesSegmentList`);
  }
  gstBankTurnoverList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/gstBankTurnoverList`);
  }
  salesPurchaseRatioList(): Observable<any> {
    console.count(this.baseUrl);
    return this.https.get(`${this.baseUrl}/salesPurchaseRatioList`);
  }

}
