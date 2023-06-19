import { Component, AfterViewInit, OnInit,EventEmitter,Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  userId:any;
  showMenu = '';
  showSubMenu = '';
   sidebarnavItems: any[];
   menuItems: any[];
  // public submenuItems: any[];
  submenuItems: Array<any> = [];
  newDynamic: any = {};
  newDynamic1: any = {};
  menuDynamic: any = [];
  submenuDynamic: any = [];
  finalMenuDynamic: any = [];
  finalSubMenuDynamic: any = [];
  userName:any;
  // this is for the open close
  addExpandClass(element: any) {
    
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }
  resetPassword(){
    this.router.navigate(['/authentication/forgetPassword/']);
  }
  constructor(private modalService: NgbModal, private router: Router,private crypto: Crypto,
     private route: ActivatedRoute) {}
  // End open close
  ngOnInit() {
    this.userName= this.crypto.decryt(window.localStorage.getItem('userName'));
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.menuItems = JSON.parse(localStorage.getItem("userMenu"));
    // console.log("this.menuItems=="+JSON.stringify(this.menuItems));
    this.conditionCheck();  
  }

  logout(){
    this.router.navigate(['authentication/login']);
    localStorage.clear();
  }

  conditionCheck(){
    // console.log("this.menuItems::"+JSON.stringify(this.menuItems));
    var tempArray=[];
    var tempArray1=[];
    tempArray=this.menuItems[0];
    if(tempArray.length > 0){
      for(let i=0; i<tempArray.length; i++){
        // this.finalSubMenuDynamic=[];
        tempArray1=[];
        this.newDynamic=tempArray[i];
        // console.log("this.newDynamic("+i+") =="+JSON.stringify(this.newDynamic));
        if(this.newDynamic.submenu.length > 0){
          for(let j=0; j<this.newDynamic.submenu.length; j++){
            this.newDynamic1=this.newDynamic.submenu[j];
            this.submenuDynamic = {
              path: this.newDynamic.submenu[j].path, labelClass: this.newDynamic.submenu[j].labelClass, submenu: [], icon: this.newDynamic.submenu[j].icon,
              label: this.newDynamic.submenu[j].label, extralink: this.newDynamic.submenu[j].extralink, title: this.newDynamic.submenu[j].title,
              class: this.newDynamic.submenu[j].class1
            };
            tempArray1.push(this.submenuDynamic)
          } 
          this.finalSubMenuDynamic.push(tempArray1);
        }
        // console.log("this.finalSubMenuDynamic ["+i+"] =="+JSON.stringify(this.finalSubMenuDynamic[i]));
        this.menuDynamic= {
          path: this.newDynamic.path, labelClass: this.newDynamic.labelClass, submenu: this.finalSubMenuDynamic[i],
          icon: this.newDynamic.icon,
          label: this.newDynamic.label, extralink: this.newDynamic.extralink, title: this.newDynamic.title,
          class: this.newDynamic.class1
        };
        this.finalMenuDynamic.push(this.menuDynamic);
      }
      // console.log("this.finalMenuDynamic=="+JSON.stringify(this.finalMenuDynamic));
      this.sidebarnavItems = this.finalMenuDynamic;      
    }
  }

}
