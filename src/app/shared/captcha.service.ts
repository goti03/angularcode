/**
 *
 * @author Antony George
 *
 */
 import { Injectable } from '@angular/core';
 
 declare var recaptchaOnload: any;
 declare var recaptchaReset: any;
 
 @Injectable({
   providedIn: 'root',
 })
 export class Captcha {
   constructor() { }

   public recaptchaLoad(siteKey){
     return recaptchaOnload(siteKey);
   }

   public recaptchaReset(){
     return recaptchaReset();
   }

 }