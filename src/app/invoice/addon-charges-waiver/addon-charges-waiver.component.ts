import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-addon-charges-waiver',
  templateUrl: './addon-charges-waiver.component.html',
  styleUrls: ['./addon-charges-waiver.component.css']
})
export class AddonChargesWaiverComponent implements OnInit {

  newChargelist = [];
  newDiscountlist = [];

  userId:any;

  constructor(private apiService : ApiService, private set : breadcrumbMessage,private crypto: Crypto) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.newChargelist = [];
    this.newDiscountlist = [];
    this.addNewCharge();
    this.addNewDiscount();
  }

  newCharge(){
    for(let a of this.newChargelist){
      if(a.chargeName == null || a.chargeName == ''){
        this.set.setOption("Enter Name of the charge", false);
        return;
      }
      if(a.chargeType == null || a.chargeType == ''){
        this.set.setOption("Enter Type of the charge", false);
        return;
      }
      if(a.minCharge == null || a.minCharge == ''){
        this.set.setOption("Enter Minimum charge amount", false);
        return;
      }
      if(a.gst == null || a.gst == ''){
        this.set.setOption("Enter GST", false);
        return;
      }
      if(a.calculationProcess == null || a.calculationProcess == ''){
        this.set.setOption("Choose calculation process", false);
        return;
      }
    }
    const obj = {
      userId : this.userId,
      chargeList : this.newChargelist
    }
    this.apiService.addnewchargestype(obj).subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.set.setOption(data.result, true);
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage, false);
        }
      }else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error))
  }

  addNewCharge(){
    const obj = {
      chargeName : '',
      chargeType : '',
      minCharge : '',
      gst : '',
      calculationProcess : ''
    }
    this.newChargelist.push(obj);
  }

  newDiscount(){
    for(let a of this.newDiscountlist){
      if(a.discountName == null || a.discountName == ''){
        this.set.setOption("Enter Name of the Discount", false);
        return;
      }
      if(a.discountType == null || a.discountType == ''){
        this.set.setOption("Choose Type of the Discount", false);
        return;
      }
      if(a.minCharge == null || a.minCharge == ''){
        this.set.setOption("Enter Minimum Discount amount", false);
        return;
      }
      
    }
    const obj = {
      userId : this.userId,
      chargeList : this.newDiscountlist
    }
    this.apiService.addnewdiscounttype(obj).subscribe(data => {
      if(data.status == 200){
        if(data.exceptionOccured == 'N'){
          this.set.setOption(data.result, true);
          this.newDiscountlist = [];
          this.ngOnInit();
        }else{
          this.set.setOption(data.exceptionMessage, false);
        }
      }else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error))
  }

  addNewDiscount(){
    const obj = {
      discountName : '',
      discountType : '',
      minCharge : ''
    }
    this.newDiscountlist.push(obj);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\.]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  remove(i,a){
    if(a == 1){
      this.newChargelist.splice(i,1);
    }else{
      this.newDiscountlist.splice(i,1);
    }
  }
}
