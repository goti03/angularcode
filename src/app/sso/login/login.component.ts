import { Component, OnInit,Input,Output ,EventEmitter, AfterViewInit } from '@angular/core';
import {  ActivatedRoute,Router } from '@angular/router';
import { Login } from './loginModule';
import { LoginService} from './login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService} from "..//..//core/api.service";
import { Globals } from '../../globals/globals.component';
import { breadcrumbMessage} from '../../shared/breadcrumb-message.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Crypto} from '../../shared/crypto.service';
import {lenderconfiguration} from '../../../environments/lender.config';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  userDetails: Observable<Login[]>;
  login: Login = new Login();
  userMenuList = [];
  isLoggedIn:false;
  errorsg:any;
  @Output() isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>(); 
  
  constructor(public globals: Globals, public router: Router, private loginService: LoginService,private route: ActivatedRoute, 
    private apiService : ApiService,private set:breadcrumbMessage, private modalService: NgbModal,private crypto: Crypto) {}
  userId: number;
  roleId: number;
  vendorId:any;
  closeResult = "";
  href:any;
  loginLogo : any;
  userName:any;
  lenderName : any;
  ngOnInit() {
    this.href = this.router.url;
    console.log("the url is ======="+this.router.url)
    this.loginLogo = lenderconfiguration.lenderLogo;
    this.vendorId = this.route.snapshot.params['vendorId'];
    this.userName = this.route.snapshot.params['userName'];

    console.log("the extra parameters is =="+this.userName)
    this.login.password=""
    this.lenderName = lenderconfiguration.lenderName;
    
    this.userMenuList=[];
    this.save();
  }

  ngAfterViewInit() {
  }

  onLoggedin() {
    if(this.login.userName == null || this.login.userName == ''){
      this.errorsg="Please enter user name";
    }else if(this.login.password == null || this.login.password == ''){
      this.errorsg="Please enter password";
    }else{
      this.save();
    }
  }


  enterKey(e){
    if(e.keyCode === 13){
       this.onLoggedin();
    }
 }
  save() {
    const userData = {
      // userName:this.login.userName,
      // password:this.login.password
      t:this.crypto.encryt(this.userName+lenderconfiguration.spliterKey+this.login.password+lenderconfiguration.spliterKey+formatDate(new Date(), 'yyyyMMddHHmmss','en_US')+lenderconfiguration.spliterKey+this.vendorId)
    };
    this.apiService.validateUser(userData).subscribe(data => {
      if(data.status == 200){
        console.log(JSON.stringify(data.result));
        localStorage.setItem('userId',this.crypto.encryt(data.result.userId));
        localStorage.setItem('userName',this.crypto.encryt(data.result.userName));
        localStorage.setItem('roleId',this.crypto.encryt(data.result.roleId));
        localStorage.setItem('orgId',this.crypto.encryt(data.result.orgId));
        localStorage.setItem('roleName',this.crypto.encryt(data.result.roleName));
        localStorage.setItem('token',this.crypto.encryt(data.result.token));
        localStorage.setItem('retailerType',this.crypto.encryt(data.result.retailerType));
        localStorage.setItem('retailerId',this.crypto.encryt(data.result.retailerId));
        localStorage.setItem('retailerName',this.crypto.encryt(data.result.retailerName));
        localStorage.setItem('branchId',this.crypto.encryt(data.result.branchId));
        localStorage.setItem('lenderId',this.crypto.encryt(data.result.lenderId));
        localStorage.setItem('path',this.crypto.encryt(data.result.path));
        window.localStorage.setItem('loggedInStatus', this.crypto.encryt("1"));
        this.globals.isMyMenue=true;
        this.userMenuList.push(data.result.menu);
        localStorage.setItem('userMenu',JSON.stringify(this.userMenuList));
        localStorage.setItem('isLoggedin', this.crypto.encryt('true'));
        window.localStorage.setItem('searchReportList',this.crypto.encryt(''));
        console.log("userId ::"+this.crypto.encryt(data.result.userId));
        var tempSubmenu=[];
        for(let s of this.userMenuList[0]){
          for(let ss of s.submenu){
            tempSubmenu.push(ss);
          }
        }
        localStorage.setItem('submenu',JSON.stringify(tempSubmenu));
        this.gotoList();
        }else{
        localStorage.setItem('isLoggedin', this.crypto.encryt('false'));
        this.errorsg=data.exceptionMessage;
        }
    });

  }

  gotoList() {
    this.router.navigate([this.crypto.decryt(window.localStorage.getItem('path'))]);
  }

  forgot(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
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

    signup(){
      this.router.navigate(['authentication/signup']);
    }


}
