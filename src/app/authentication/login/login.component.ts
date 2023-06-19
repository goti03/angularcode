import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit , TemplateRef,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './loginModule';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '..//..//core/api.service';
import { Globals } from '../../globals/globals.component';
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Crypto } from '../../shared/crypto.service';
import { lenderconfiguration } from '../../../environments/lender.config';
import * as moment from 'moment/moment.js';
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment'
import { Captcha } from '../../shared/captcha.service';

declare var DeviceUUID:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  userDetails: Observable<Login[]>;
  login: Login = new Login();
  userMenuList = [];

  isLoggedIn: false;
  errorsg: any;
  @Output() isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public globals: Globals, public router: Router, private loginService: LoginService,
    private apiService: ApiService, private set: breadcrumbMessage, private modalService: NgbModal, private crypto: Crypto, private formBuilder: FormBuilder,
    private captchaService:Captcha) { }
  userId: number;
  roleId: number;
  userData: any = {};
  second: any;
  secondone: any;
  timer:any;
  checkflag: any;
  userblock: boolean;
  uuid:any;
  captcha: any;
  err: boolean;
  subMenuList=[];
  userListrecord: any = [];
  userList: any = [];
  captcheck: any;
  captchecks: any;
  closeResult = '';
  loginLogo: any;
  protected aFormGroup: FormGroup;
  lenderName: any;
  ssoEnable:any
  ssoUrl:any
  ssoProvider:any
  captchaValue:any;
  siteKey=environment.recaptcha.siteKey;
    keyPress(event: any) {
    const pattern = /[0-9\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  ngOnInit() {
    console.log("the site key is ==="+this.siteKey)
    this.captchaService.recaptchaLoad(this.siteKey);
    window.localStorage.setItem('captcha','0');
    this.userblock = false;
    this.checkflag = 3;
    // this.userList=[];
    let c;

    // window.localStorage.setItem("userlog","");
    // window.localStorage.clear();
    // this.userListrecord=[]
    this.loginLogo = lenderconfiguration.lenderLogo;
    this.lenderName = lenderconfiguration.lenderName;
    this.timer = lenderconfiguration.locktime;


  //  console.log("the device unique id is ==="+this.uuid)
    this.second = this.getRandomInt(0, 10);
    this.secondone = this.getRandomInt(1, 20);
    this.captcheck = Number(this.second) + Number(this.secondone);
    this.captchecks = '858'
    console.log('captchecks',this.captchecks);
    console.log('the captcheck is==' + this.captcheck);
    console.log('the length is ====' + this.userList.length);


  }

  ngAfterViewInit() {
  }

  onLoggedin() {
    if (this.login.userName == null || this.login.userName == '') {
      this.errorsg = 'Please enter user name';
    } else if (this.login.password == null || this.login.password == '') {
      this.errorsg = 'Please enter password';
    } else {
      this.save();
    }
  }

  ssoLoginRedirect(){
    window.open(this.ssoUrl,'_blank');
  }

  enterKey(e) {
    if (e.keyCode === 13) {
      this.onLoggedin();
    }
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  save() {
    let z;
    z = 0;
    this.checkuserrecord(this.login.userName);
    // if(window.localStorage.getItem('captcha') == '1'){
      if(this.captcha=='' || this.captcha==null || this.captcha==undefined){
        this.err=true;
        this.errorsg = 'Captcha field is required.';
      }else if(this.captcha != this.captcheck){
        this.err=true;
        this.errorsg = 'Captcha is Incorrect,Please Enter Correct Captcha';
      }else{
      const userData = {
        // userName:this.login.userName,
        // password:this.login.password
        t: this.crypto.encryt(this.login.userName + lenderconfiguration.spliterKey + this.login.password + lenderconfiguration.spliterKey + formatDate(new Date(), 'yyyyMMddHHmmss', 'en_US')),
        clientCode:"a"
      };
      this.apiService.validateUser(userData).subscribe(data => {
        if (data.status == 200) {
          window.localStorage.setItem('captcha','0');
          if (data.result.flag == '4') {
              z = this.timer - data.result.timeInMinutes;
              this.errorsg = 'Your account is locked Please try again after ' + z + ' minutes';
            } else {
              // else console.log(JSON.sotringify(data.result));
              localStorage.setItem('userId', this.crypto.encryt(data.result.userId));
              localStorage.setItem('userName', this.crypto.encryt(data.result.userName));
              localStorage.setItem('roleId', this.crypto.encryt(data.result.roleId));
              localStorage.setItem('orgId', this.crypto.encryt(data.result.orgId));
              localStorage.setItem('roleName', this.crypto.encryt(data.result.roleName));
              localStorage.setItem('token', this.crypto.encryt(data.result.token));
              localStorage.setItem('retailerType', this.crypto.encryt(data.result.retailerType));
              this.apiService.getSubMenuList().subscribe(data1=>{
                if(data1.status==200){
                  this.subMenuList=data1.result;
                  window.localStorage.setItem('masterSubMenu',JSON.stringify(data1.result));
                }

              });
              localStorage.setItem('retailerId', this.crypto.encryt(data.result.retailerId));
              localStorage.setItem('retailerName', this.crypto.encryt(data.result.retailerName));
              localStorage.setItem('branchId', this.crypto.encryt(data.result.branchId));
              localStorage.setItem('lenderId', this.crypto.encryt(data.result.lenderId));
              localStorage.setItem('path', this.crypto.encryt(data.result.path));
              window.localStorage.setItem('loggedInStatus', this.crypto.encryt('1'));
              this.globals.isMyMenue = true;
              this.userMenuList.push(data.result.menu);
              localStorage.setItem('userMenu', JSON.stringify(this.userMenuList));
              localStorage.setItem('isLoggedin', this.crypto.encryt('true'));
              window.localStorage.setItem('searchReportList', this.crypto.encryt(''));
              // console.log("userId ::"+this.crypto.encryt(data.result.userId));
              const tempSubmenu = [];
              for (const s of this.userMenuList[0]) {
                for (const ss of s.submenu) {
                  tempSubmenu.push(ss);
                }
              }
              localStorage.setItem('submenu', JSON.stringify(tempSubmenu));
              this.gotoList();
            }
          } else {
            this.captchaService.recaptchaReset();
            this.errorsg = data.exceptionMessage;
            const a = window.localStorage.getItem('userlog');
            console.log('the unknown user is ===' + a);
            if (a == null || a == undefined || a == '') {
              window.localStorage.setItem('userlog', this.login.userName);
            }
            if (a != null || a != undefined || a != '') {
              if (a == this.login.userName) {
                let c = window.localStorage.getItem('count');
                console.log('the counter is ==' + c);
                if (c != null || c != undefined || c != '') {
                  if (c == '1') {
                    this.userList = JSON.parse(window.localStorage.getItem('userRecord'));
                    if (this.userList == null) {
                      this.userList = [];
                    }
                    this.userData = { name: this.login.userName, time: moment().format('DD-MM-YYYY HH:mm:ss') };
                    this.userList.push(this.userData);
                    window.localStorage.setItem('userRecord', JSON.stringify(this.userList));
                    window.localStorage.setItem('userlog', '');
                    window.localStorage.setItem('count', '');
                    const data = {
                      t: this.crypto.encryt(this.login.userName + lenderconfiguration.spliterKey + this.login.password + lenderconfiguration.spliterKey + formatDate(new Date(), 'yyyyMMddHHmmss', 'en_US')),
                      clientCode:this.uuid
                    };
                    this.apiService.multiplelogin(data).subscribe(data => {
                      if (data.status == 200) {

                      }
                    });

                  } else {
                    c = (Number(c) + 1).toString();
                    window.localStorage.setItem('count', c);
                  }
                } else {
                  window.localStorage.setItem('count', '0');
                }

              }

            }
            // window.localStorage.setItem("userlog",this.userName)
            localStorage.setItem('isLoggedin', this.crypto.encryt('false'));
            if (z == 0) {
              this.errorsg = data.exceptionMessage;
            }
          }
        });
      } 
      // else {
      //   this.errorsg = 'Captcha field is required.';
      // }
    this.second = this.getRandomInt(0, 30);
    // console.log("the a is =="+a)
    this.secondone = this.getRandomInt(1, 40);
    this.captcha='';
    this.captcheck = Number(this.second) + Number(this.secondone);
    this.captchecks = '858'
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

  signup() {
    this.router.navigate(['authentication/signup']);
  }
  checkuserrecord(data) {
    this.userListrecord = [];
    this.checkflag = 1;
    this.userListrecord = JSON.parse(window.localStorage.getItem('userRecord'));
    let i;
    let c = 0;
    if (this.userListrecord != null || this.userListrecord != undefined) {
      console.log('the list is==' + this.userListrecord);
      let y;
      for (const y of this.userListrecord) {
        console.log('iteration is happening==' + y.name);
        if (y.name == data) {
          const m1 = moment(y.time, 'DD-MM-YYYY HH:mm:ss');
          const m2 = moment().format('DD-MM-YYYY HH:mm:ss');
          const m3 = moment(m2, 'DD-MM-YYYY HH:mm:ss');
          const m4 = m3.diff(m1, 'minutes');
          if (m4 > this.timer) {
            this.checkflag = 1;
            this.userListrecord.splice(c, c + 1);

          } 
          else {
            this.checkflag = 2;
            const d = this.timer - m4;
            this.errorsg = 'Your account is locked Please Try again after ' + d + ' minutes';

          }
        } else {
          this.checkflag = 1;
        }
        c++;
      }
    }
  }

}
