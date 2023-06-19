import { Component, OnInit, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {lenderconfiguration} from '../../../environments/lender.config';
import {environment} from '../../../environments/environment';
import { Crypto } from '../../shared/crypto.service';


@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  color = 'green';
  showSettings = false;
  showMinisidebar = false;
  lenderMobile:any;
  Name:any;
  showDarktheme = false;
  showRtl = false;
check=true;
  year: any;
  public innerWidth: any;
 lenderMail:any;
  lenderName: any;
  public config: PerfectScrollbarConfigInterface = {};
  dateTime:any;
  appVersion:any;
  currentApplicationVersion:any;
  applicationLastBuildTime:any;
  lastUpdateDate:any;
  constructor(private router: Router, private crypto: Crypto) {
    this.router.events.subscribe((ev) => {
        if (ev instanceof NavigationEnd) {
          let check =true;
          const url = ev.urlAfterRedirects;
          if (!url.includes('gstotpcollection') && !url.includes('newlead')) {
          const token = this.crypto.decryt(window.localStorage.getItem('token'));
          const roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
          if (token == null || token == undefined || roleId == null || roleId == undefined) {
            this.router.navigate(['authentication/login']);
          }
        }
        const roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
          const submenu = JSON.parse(localStorage.getItem('submenu'));
          const mastersubmenu=JSON.parse(window.localStorage.getItem('masterSubMenu'));
          console.log("the master submenu length is=="+mastersubmenu.length)
          if (roleId == 15) {
            for (const sm of submenu) {
                if (sm.path == url || url.indexOf('authentication') != -1 || url.indexOf('new-lead') != -1) {
                  check = true;
                    break;
                }
            }
          } else if(roleId!=15) {
            for(let sm of submenu){
              if((sm.path.includes(url))||(url.includes('authentication'))) {    
               check=true;
               break;
              }else{
                check=false;
            
              }
            }
          if (check == false) {
            for(let sms of mastersubmenu){
              console.log("the path i s=="+sms.path)
              if(sms.path.includes(url)){
                check=false;
             break;
              }else{
                check=true;
              
              }
              //console.log("the a valye=="+a)
            }
          
          }
          if(check==false){
            this.router.navigate(['authentication/404']);
          }
        }
      // }
    }});

  }
  ngOnInit() {
    this.year = moment().format('YYYY');
    this.Name=lenderconfiguration.Name;
    this.lenderName = lenderconfiguration.lenderFooter;
    this.lenderMobile=lenderconfiguration.lenderMobile;
    this.lenderMail=lenderconfiguration.lenderMail;
    console.log("the full component is called")
    // this.lenderName="FinAGG Quick Cash Flow™, All rights reserved";
    // this.lenderName="JSFB SCF powered by FinAGG Quick Cash Flow™";
    // const path = require('path');
    // console.log("path::"+path);
    // const versionFilePath = path.join(__dirname + '/../dist/version.json');
    // console.log("versionFilePath::"+versionFilePath);
    // this.appVersion = require('../../../../dist/version.json').version;
    // console.log("appVersion::"+this.appVersion);
    // this.dateTime = require('../../../../dist/version.json').lastBuildDate;
    // console.log("dateTime::"+this.dateTime);
  
    // var startDate = moment(this.applicationLastBuildTime, "DD/MM/YYYY hh:mm:ss A");
    // var endDate = moment().format("DD/MM/YYYY hh:mm:ss A");

    // var result = 'Diff: ' + endDate.diff(startDate, 'days');
    // this.lastUpdateDate
    console.log('applicationLastBuildTime::'+this.applicationLastBuildTime);
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/dashboard1']);
    }
    this.handleLayout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleLayout();
  }

  toggleSidebar() {
    this.showMinisidebar = !this.showMinisidebar;
  }

  handleLayout() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.showMinisidebar = true;
    } else {
      this.showMinisidebar = false;
    }
  }



  
}
