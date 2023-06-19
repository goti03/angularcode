import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { data } from '../dashboards/dashboard3/smart-data-table';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AnyTxtRecord } from 'dns';
import { breadcrumbMessage } from '../shared/breadcrumb-message.service';
import { NgIf } from '@angular/common';
import {Crypto} from '../shared/crypto.service';  




@Component({
  selector: 'newmenu',
  templateUrl: './newmenu.component.html',
  styleUrls: ['./newmenu.component.css']
})
export class NewmenuComponent implements OnInit {
  getMenuList: any;
  getSubMenuList: any;
  saveMenuList: any;
  searchMenuList:any;
  saveSubMenuList: any;
  s: any = 1;
  p: any = 1;
  set: any;
  getMenuSubmenuList: any;
  filterStates: any;
  getMenuSubmenuListone: any;
  zero: any;
  subMenuList: any;
  remark: any;
  remarkErr: boolean;
  getRoleList: any;
  defaultPath: any;
  roleName: any;
  menuName: any;
  menuId: any;
  title: any;
  icon: any;
  class: any;
  labelClass: any;
  submenuName: any;
  path: any;
  errormsg: any;
  userId: any;
  roleId: any;
  submenuId: any;
  functionId: any;
  roleMenuMappingList: any;
  roleMenuMappingListone: any;
  m: number;
  roleMenuMappingListtwo: any;
  onSubmit: boolean = false;



  constructor(private apiservice: ApiService, private modalService: NgbModal, private setany: breadcrumbMessage,private crypto: Crypto) {

  }
  closeResult: string;


  ngOnInit() {
    this.userId =this.crypto.decryt( window.localStorage.getItem("userId"));
    this.errormsg = "";
    this.saveData();
  }
  saveData() {
    this.apiservice.getMenuList().subscribe(res => this.getMenuList = res.result);
    this.apiservice.getSubMenuList().subscribe(res => this.getSubMenuList = res.result);
    this.apiservice.getRoleList().subscribe(res => this.getRoleList = res.result);
  }

  filterStatus: any;
  onRoleChoose() {
    const data = {
      roleId: this.filterStatus
    }
    this.apiservice.roleMenuMappingList(data).subscribe(data => {
      if (data.status == 200) {
        console.log("success");
        this.roleMenuMappingList = data.result;
        this.roleMenuMappingListone = data.result;

        for (let a of this.roleMenuMappingListone) {
          a.MenuIDcheckflag = false;
          for (let b of a.subMenuDetails) {
            if (b.isAvailable == 'true') {
              b.submenucheckflag = true;
              console.log("checkbox tick")
              a.MenuIDcheckflag = true;
              this.onSubmit = true;
            } else {
              b.submenucheckflag = false;
              // this.onSubmit = false;
            }
          }
        }
      }
      else {
        this.set.setOption(data.exceptionMessage, false);
      }
    });
  }

  // api calling get post 
  //***************************** 
  // adding  menu submenu roleid
  addNewMenu(content) {
    this.errormsg = "";
    this.menuName = "";
    this.title = "";
    this.icon = "";
    this.class = "";
    this.labelClass = "";
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  addNewSubMenu(content) {
    this.errormsg = "";
    this.submenuName = "";
    this.menuId = "";
    this.path = "";
    this.title = "";
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  addRoleId(content) {
    this.errormsg = "";
    this.roleName = "";
    this.path = "";
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // adding  menu submenu roleid
  // ************************************
  //  saving updating menu submenu roleid
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null' || str == '0' || str == null || str == undefined);
  }
  saveMenuDetails() {
    this.errormsg = "";
    if (this.isNullorUndefinedorEmpty(this.menuName)) {
      this.errormsg = "Please Enter Menu Name";
    } else if (this.isNullorUndefinedorEmpty(this.title)) {
      this.errormsg = "Please Enter Title";
    } else if (this.isNullorUndefinedorEmpty(this.icon)) {
      this.errormsg = "Please Enter Icon";
    } else if (this.isNullorUndefinedorEmpty(this.class)) {
      this.errormsg = "Please Enter Class";
    } else {
      const data = {   
        menuName: this.menuName,
        title: this.title,
        icon: this.icon,
        class: this.class,
      }
      this.apiservice.saveMenuList(data).subscribe(data => {
        if (data.status == 200) {
          this.setany.setOption(data.exceptionMessage, true);
          this.modalService.dismissAll();
          this.apiservice.getMenuList().subscribe(res => this.getMenuList = res.result);
        } else {
          this.errormsg = data.exceptionMessage;
        }
      });
    }
  }
  updateMenuDetails() {
    this.errormsg = "";
    if (this.isNullorUndefinedorEmpty(this.menuName)) {
      this.errormsg = "Please Enter Menu Name";
    } else if (this.isNullorUndefinedorEmpty(this.title)) {
      this.errormsg = "Please Enter Title";
    } else if (this.isNullorUndefinedorEmpty(this.icon)) {
      this.errormsg = "Please Enter Icon";
    } else if (this.isNullorUndefinedorEmpty(this.class)) {
      this.errormsg = "Please Enter Class";
    } else {
      const data = {
        menuName: this.menuName,
        title: this.title,
        icon: this.icon,
        class: this.class,
        menuId: this.menuId
      }
      this.apiservice.saveMenuList(data).subscribe(data => {
        if (data.status == 200) {
          this.setany.setOption("Remarks Updated Successfully", true);
          this.modalService.dismissAll();
          this.apiservice.getMenuList().subscribe(res => this.getMenuList = res.result);
        } else {
          this.errormsg = data.exceptionMessage;
        }
      });
    }
  }
  saveSubMenuDetails() {
    this.errormsg = "";
    if (this.isNullorUndefinedorEmpty(this.submenuName)) {
      this.errormsg = "Please Enter SubMenu Name";
    } else if (this.isNullorUndefinedorEmpty(this.path)) {
      this.errormsg = "Please Enter Path";
    } else if (this.isNullorUndefinedorEmpty(this.title)) {
      this.errormsg = "Please Enter Title";
    } else {
      const data = {
        submenuName: this.submenuName,
        menuId: this.menuId,
        path: this.path,
        title: this.title,
      }
      this.apiservice.saveSubMenuList(data).subscribe(data => {
        if (data.status == 200) {
          this.setany.setOption("Remarks Updated Successfully", true);
          this.modalService.dismissAll();
          this.apiservice.getSubMenuList().subscribe(res => this.getSubMenuList = res.result);
        } else {
          this.errormsg = data.exceptionMessage;
        }
      });
    }
  }
  updateSubMenuDetails() {
    this.errormsg = "";
    if (this.isNullorUndefinedorEmpty(this.submenuName)) {
      this.errormsg = "Please Enter SubMenu Name";
    } else if (this.isNullorUndefinedorEmpty(this.path)) {
      this.errormsg = "Please Enter Path";
    } else if (this.isNullorUndefinedorEmpty(this.title)) {
      this.errormsg = "Please Enter Title";
    } else {
      const data = {
        submenuName: this.submenuName,
        path: this.path,
        title: this.title,
        menuId: this.menuId,
        submenuId: this.submenuId
      }
      this.apiservice.saveSubMenuList(data).subscribe(data => {
        if (data.status == 200) {
          this.setany.setOption("Remarks Updated Successfully", true);
          this.modalService.dismissAll();
          this.apiservice.getSubMenuList().subscribe(res => this.getSubMenuList = res.result);
        } else {
          this.errormsg = data.exceptionMessage;
        }
      });
    }
  }
  saveRoleIdDetails() {
    this.errormsg = "";
    if (this.isNullorUndefinedorEmpty(this.roleName)) {
      this.errormsg = "Please Enter roleName";
    } else if (this.isNullorUndefinedorEmpty(this.path)) {
      this.errormsg = "Please Enter DefaultPath";
    } else  {
      const data = {
        roleName: this.roleName,
        path: this.path,
        userId: this.userId,
      }
      this.apiservice.saveRoleList(data).subscribe(data => {
        if (data.status == 200) {
          this.setany.setOption("Remarks Updated Successfully", true);
          this.modalService.dismissAll();
          this.apiservice.getRoleList().subscribe(res => this.getRoleList = res.result);
        } else {
          this.errormsg = data.exceptionMessage;
        }
      });
    }
  }
  updateRoleIdDetails() {
    this.errormsg = "";
    if (this.isNullorUndefinedorEmpty(this.roleName)) {
      this.errormsg = "Please Enter roleName";
    } else if (this.isNullorUndefinedorEmpty(this.path)) {
      this.errormsg = "Please Enter DefaultPath";
    } else {
      const data = {
        roleName: this.roleName,
        path: this.path,
        roleId: this.roleId
      }
      this.apiservice.saveRoleList(data).subscribe(data => {
        if (data.status == 200) {
          this.setany.setOption("Remarks Updated Successfully", true);
          this.modalService.dismissAll();
          this.apiservice.getRoleList().subscribe(res => this.getRoleList = res.result);
        } else {
          this.errormsg = data.exceptionMessage;
        }
      });
    }
  }
  // saving updating menu submenu roleid
  // *************************************
  // deleting menu submenu role id
  deleteMenu(menuId) {
    const data = {
      menuId: menuId
    }
    this.apiservice.deleteMenuList(data).subscribe(data => {
      if (data.status == 200) {
        this.setany.setOption("Remarks Updated Successfully", true);
        this.apiservice.getMenuList().subscribe(res => this.getMenuList = res.result);
      } else {
        this.errormsg = data.exceptionMessage;
      }
    });
  }
  deleteSubMenu(submenuId, functionId) {
    const data = {
      submenuId: submenuId,
      functionId: functionId
    }
    this.apiservice.deleteSubMenuList(data).subscribe(data => {
      if (data.status == 200) {
        this.setany.setOption("Remarks Updated Successfully", true);
        this.apiservice.getSubMenuList().subscribe(res => this.getSubMenuList = res.result);
      } else {
        this.errormsg = data.exceptionMessage;
      }
    });
  }
  deleteRoleId(roleId) {
    const data = {
      roleId: roleId
    }
    this.apiservice.deleteRoleList(data).subscribe(data => {
      if (data.status == 200) {
        this.setany.setOption("Remarks Updated Successfully", true);
        this.apiservice.getRoleList().subscribe(res => this.getRoleList = res.result);
      } else {
        this.errormsg = data.exceptionMessage;
      }
    });
  }

  // deleting menu submenu role id
  // ********************************
  // editing menu submenu  rollid
  editMenuDetails(content, s) {
    this.errormsg = "";
    this.menuName = s.menuName;
    this.title = s.title;
    this.icon = s.icon;
    this.class = s.class;
    this.menuId = s.menuId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editSubMenu(content, s) {
    this.errormsg = "";
    this.submenuName = s.submenuName;
    this.path = s.path;
    this.title = s.title;
    this.submenuId = s.submenuId;
    this.menuId = s.menuId;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  editRoleId(content, s) {
    this.errormsg = "";
    this.roleName = s.roleName;
    this.path = s.defaultPath;
    this.roleId = s.roleId;
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
  // editing menu submenu  roleid
  // ****************************
  // function roleid calling
  onmenu(a) {
    for (let b of this.roleMenuMappingListone) {
      if (b.MenuId == a) {
        b.MenuIDcheckflag = false;
        for (let c of b.subMenuDetails) {
          if (c.submenucheckflag == true) {
            b.MenuIDcheckflag = true;

          }
        }
      }
    }
  }
  ontrigger() {
    for (let b of this.roleMenuMappingListone) {
      for (let c of b.subMenuDetails) {
        if (b.MenuIDcheckflag == true) {
          console.log("I am called checkbox");
          // this.onSubmit = true;
          c.submenucheckflag = true;
        } else {
          c.submenucheckflag = false;
          // this.onSubmit = false;
        }
      }
    }
  }

  removeFunction: any = [];
  newFunction: any = [];
  submitNow() {
    for (var m = 0; m < this.roleMenuMappingList.length; m++) {
      for (var n = 0; n < this.roleMenuMappingList[m].subMenuDetails.length; n++) {
        var test = this.roleMenuMappingList[m].subMenuDetails[n].isAvailable == 'true' ? true : false;
        if (test != this.roleMenuMappingListone[m].subMenuDetails[n].submenucheckflag) {
          const data = {
            menuId: this.roleMenuMappingListone[m].MenuId,
            submenuId: this.roleMenuMappingListone[m].subMenuDetails[n].submenuId,
            functionId: this.roleMenuMappingListone[m].subMenuDetails[n].functionId
          }
          if (test == true && this.roleMenuMappingListone[m].subMenuDetails[n].submenucheckflag == false) {
            this.removeFunction.push(data);
          }
          if (test == false && this.roleMenuMappingListone[m].subMenuDetails[n].submenucheckflag == true) {
            this.newFunction.push(data);
          }
        }
      }
    }
    const obj = {
      userId: this.userId,
      roleId: this.filterStatus,
      removeFunction: this.removeFunction,
      newFunction: this.newFunction
    }
    this.apiservice.saveRoleMenuMapping(obj).subscribe(data => {
      if (data.status == 200) {
        this.setany.setOption("Remarks Updated Successfully", true);
      } else {
        this.errormsg = data.exceptionMessage;
      }
    });
  }
  //  function roleid calling
  // *************************
}