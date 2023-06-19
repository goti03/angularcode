/**
 *
 * @author Antony George
 *
 */
 import { Component, OnInit } from '@angular/core';
 import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
 import { Observable } from 'rxjs';
 import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
 import { Router, ActivatedRoute } from '@angular/router';
 import { FormGroup, FormControl, Validators } from '@angular/forms';
 import * as moment from 'moment/moment.js';
 import { ApiService } from '..//core/api.service';
 import { breadcrumbMessage } from '../shared/breadcrumb-message.service';
 import { Crypto } from '../shared/crypto.service';
 import {lenderconfiguration} from '../../environments/lender.config';
 import { formatDate } from '@angular/common';
 
 @Component({
   selector: 'app-user',
   templateUrl: './finagg-user.component.html',
   styleUrls: ['./finagg-user.component.css']
 })
 export class FinaggUserComponent implements OnInit {
   userlist = [];
   salesuserlist = [];
   searchUserlist;
   useredits: any;
   passedits: any;
   p: any = 1;
   page: any;
   s: any;
   p1: any;
   displayMessage: any;
   userId: any;
   userlistone = [];
   user: any;
   userIde: any;
   closeResult: any;
   roleId: any;
   message: string;
   passMatch = new RegExp('((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!\@\#\$\%\^\&\*\_\.\:]).{6,15})');
   tabList = ['userList', 'salespersonMapping'];
   tab: any;
   brandList = [];
   userList = [];
   salePersonId: any;
   brandId: any;
   programTypeList = [];
   programType: any;
   buttonCheck = false;
   p2: any;
   q: any;
   userMappingList = [];
   constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router,
     private apiService: ApiService, private set: breadcrumbMessage, private crypto: Crypto) { }
 
   createNewUser() {
     this.router.navigate(['/user/adduser']);
   }
   tabSwitch(a) {
     let count = 0;
     for (const b of this.tabList) {
       if (this.tab == b) {
         document.getElementById('tab_' + count).classList.remove('active');
       }
       count++;
     }
     this.tab = this.tabList[a];
     document.getElementById('tab_' + a).classList.add('active');
   }
   getUserMappingList() {
     this.apiService.getUserMappingList(this.salePersonId,0).subscribe((data) => {
       if (data.status == 200) {
         this.userMappingList = data.result;
       }
     });
     this.buttonValidation();
   }
   getProgramTypeList() {
     this.apiService.getProgramType(this.brandId).subscribe((data) => {
       if (data.status == 200) {
         const temp = data.result;
         for(const p of temp) {
           if(p.programTypeId!=2) {
             this.programTypeList.push(p);
           }
         }
       }
     });
     this.buttonValidation();
   }
 buttonValidation() {
     if (this.isNullorUndefinedorEmpty(this.salePersonId)) {
       // this.set.setOption('Please Select Sales Person UserName',false);
       this.buttonCheck = false;
     } else if (this.isNullorUndefinedorEmpty(this.brandId)) {
       // this.set.setOption('Please Select Brand',false);
       this.buttonCheck = false;
     } else if (this.isNullorUndefinedorEmpty(this.programType)) {
       // this.set.setOption('Please Select Program Type',false);
       this.buttonCheck = false;
     } else {
       this.buttonCheck = true;
     }
   }
   addSalesPersonanchorMapping() {
     if (this.isNullorUndefinedorEmpty(this.salePersonId)) {
       this.set.setOption('Please Select Sales Person UserName', false);
     } else if (this.isNullorUndefinedorEmpty(this.brandId)) {
       this.set.setOption('Please Select Brand', false);
     } else if (this.isNullorUndefinedorEmpty(this.programType)) {
       this.set.setOption('Please Select Program Type', false);
     } else {
       const data = {
         'userId': this.salePersonId,
         'spId': this.brandId,
         'programTypeId': this.programType
       };
     this.apiService.saveMappingDetails(data).subscribe((data) => {
       if (data.status == 200) {
         this.getUserMappingList();
         this.salePersonId = '';
         this.brandId = '';
         this.programType = '';
       } else {
         this.set.setOption(data.exceptionMessage, false);
       }
     });
     }
 
   }
   isNullorUndefinedorEmpty(str) {
     return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
   }
   deleteUserMapping(id) {
     if(confirm('Are you sure do you want to Inactive this Salesperson Mapping?')) {
     this.apiService.activeInactiveUserBrandMapping(id,0).subscribe((data)=> {
       if(data.status==200) {
         this.getUserMappingList();
       } else {
         this.set.setOption(data.exceptionMessage,false);
       }
     });
   }
   }
   activeUserMapping(id) {
     if(confirm('Are you sure do you want to Activate this Salesperson Mapping?')) {
       this.apiService.activeInactiveUserBrandMapping(id,1).subscribe((data)=> {
         if(data.status==200) {
           this.getUserMappingList();
         } else {
           this.set.setOption(data.exceptionMessage,false);
         }
       });
     }
   }
   ngOnInit() {
     this.q = 1;
     this.tabSwitch(0);
     console.log('I am called');
     this.displayMessage = window.localStorage.getItem('programkey');
     if (this.displayMessage == 'created') {
       this.set.setOption('User created successfully', true);
     }
     this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
     this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
 
     this.p1 = 10;
     this.p2 = 10;
     this.page = 0;
     console.log('I am called');
     this.salePersonId = '~';
     this.apiService.getUserMappingList(this.salePersonId,0).subscribe((data) => {
       if (data.status == 200) {
         this.userMappingList = data.result;
       }
     });
     this.apiService.getUserList().subscribe(data => {
         if (data.status == 200) {
           this.userList = data.result;
         }
     });
     this.apiService.getFinaggUserList().subscribe(data => {
       if (data.status == 200) {
         this.userlistone = data.result;
         if (this.roleId == '6' || this.roleId == '3') {
 
           for (this.s = 0; this.s < this.userlistone.length; this.s++) {
             console.log('i am called these many times');
             if (this.userlistone[this.s].roleName == 'Sales Person') {
               this.userlist.push(this.userlistone[this.s]);
 
             }
           }
 
         } else {
           this.userlist = this.userlistone;
         }
         window.localStorage.setItem('programkey', '');
       } else {
         alert(data.exceptionMessage);
       }
     }, error => console.log(error));
     this.apiService.getPartnerList().subscribe((data) => {
       if (data.status == 200) {
         this.brandList = data.result;
       }
     });
   }
   deleteUser(obj) {
     if (confirm('Are you sure do you want to delete?')) {
       this.apiService.deleteUser(obj, this.userId).subscribe(data => {
         if (data.status == 200) {
           this.set.setOption(data.exceptionMessage, true);
           this.ngOnInit();
         } else {
           this.set.setOption(data.exceptionMessage, false);
         }
       });
     }
   }
   edit(content, obj: any) {
     this.user = obj;
     this.userIde = obj.userId,
     this.useredits = obj.userName;
     this.passedits = obj.password;
     this.modalService.open(content, { size: 'lg', backdrop: 'static', keyboard: false }).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }
   saveUser() {
     const dataone = {'t': this.crypto.encryt(this.useredits + lenderconfiguration.spliterKey + this.passedits + lenderconfiguration.spliterKey + formatDate(new Date(), 'yyyyMMddHHmmss', 'en_US')),
       'userId': this.userIde
 
     };
 
     this.modalService.dismissAll();
     this.apiService.editUser(dataone, this.userIde).subscribe(data => {
       if (data.status == 200) {
         this.set.setOption(data.exceptionMessage, true);
         this.ngOnInit();
       } else {
         this.set.setOption(data.exceptionMessage, false);
       }
     });
   }
 
   clearer() {
       this.message = '';
       this.modalService.dismissAll();
   }
   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return `with: ${reason}`;
     }
   }
 
   showPageIndex(pageIndex, pagesize) {
     this.page = pageIndex;
     console.log(this.page);
     if (this.page != 1) {
       this.page = (this.page - 1) * pagesize;
     } else {
       this.page = 0;
     }
   }
 
 }
 