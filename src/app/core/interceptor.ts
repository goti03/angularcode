import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { environment } from '../../environments/environment';
import {
  Component,
  Input,
  OnDestroy,
  Inject,
  Injectable,
  ViewEncapsulation
} from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {Crypto} from '../shared/crypto.service'; 
import {map} from 'rxjs/operators';
import { timeout } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  data: any;
  private timerIds = [];
  constructor(private router: Router,private crypto: Crypto) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(window.localStorage.getItem('token')!='' && window.localStorage.getItem('token') != null  && window.localStorage.getItem('token') != undefined){
      let token = this.crypto.decryt(window.localStorage.getItem('token'));
      request = request.clone({setHeaders: {Authorization: 'Bearer ' + token,'Access-Control-Allow-Origin':environment.orgin}});
    }else{
      request = request.clone({setHeaders: {'Access-Control-Allow-Origin':environment.orgin}});
      // const req={req:this.crypto.encryt(request.body)};
      // request =  request.clone({
      //   setHeaders: {'Access-Control-Allow-Origin':environment.orgin},
      //   body: req});
      // console.log("request::",request);
    }
    this.makeApiCall();
    this.startTimer();
    
    return next.handle(request).pipe(
      timeout(300000), //5 minutes API Gateway timeout Overwrite
      tap((result) => {
      if (result instanceof HttpResponse) {
        if (result.body.status == 401 && (result.body.message == 'unauthorized' || result.body.exceptionMessage == 'unauthorized')) {
          this.router.navigate(['']);
        }
      }
      if (result instanceof HttpErrorResponse) {
        if (result.error.status == 401 && (result.error.message == 'unauthorized' || result.error.exceptionMessage == 'unauthorized')) {
          this.router.navigate(['']);
        }
      }
    }, (error) => {
      if (error.error.status == 401 && (error.error.message == 'unauthorized' || error.error.exceptionMessage == 'unauthorized')) {
        this.router.navigate(['']);
      }else{
        // alert(error.error.message);
      }
    }));

  }

  startTimer() {
    
    // clearTimeout(this.timer);
    // Set the duration of the timer to 10 minutes (600000 milliseconds)
    // this.timer = setTimeout(() => {
    //   // Handle the timeout here
    //   console.log('Session timed out');
    //   this.router.navigate(['']);
    //   // alert("Session timed out, Please Login Again");
    // }, 60000);
    const timerId = setTimeout(() => {
      console.log('Timer completed');
      console.log('Session timed out');
      this.router.navigate(['']);
      // alert("Session timed out, Please Login Again");
    }, 900000); // 15 minutes 
    this.timerIds.push(timerId);
  }

  resetTimer() {
    // Reset the timer every time an API call is made
    this.timerIds.forEach(timerId => {
      clearTimeout(timerId);
    });
    this.timerIds = [];
    this.startTimer();
  }

  makeApiCall() {
    // Call your API here and reset the timer
    this.resetTimer();
  }
}

