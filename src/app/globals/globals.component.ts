import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  payResultObj: string = 'test';
  transactionStatus:String="";
  transactionId:any="";
  accountHolderName:any="";
  debitAccount:any="";
  creditAccount:any="";
  ifscCode:any="";
  remarks:any="";
  transferAmount:any="";
  bankName:any="";
  isMyMenue:any=false;
 }
