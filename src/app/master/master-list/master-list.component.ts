import { MasterDetailsComponent } from './../master-details/master-details.component';
import { Observable } from "rxjs";
import { Master } from "./../masterModel";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ApiService} from "../../core/api.service";
import * as moment from 'moment/moment.js';
import {Currency} from '../../shared/currency.service';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';
import { environment } from '../../../environments/environment.jana.prod';

@Component({
  selector: "app-employee-list",
  templateUrl: "./master-list.component.html",
  styleUrls: ["./master-list.component.css"]
})
export class MasterListComponent implements OnInit {
  master: Master;
  searchMasterList;
  p:any;
  displayMessage:any;
  startDate:any;
  endDate:any;
  readRole: Boolean;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  roleId:any;
  constructor(
    private apiService: ApiService,
    private router: Router,  public currency : Currency, private set : breadcrumbMessage, private crypto: Crypto ) {}

  ngOnInit() {
    this.readRole = false;
    this.roleId=this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.displayMessage=  window.localStorage.getItem("programkey");
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    this.reloadData();
  }

  indianCurrency(number : any) {
    return this.currency.indianCurrency(number);
  }

  reloadData() {
    //this.master = this.masterService.getMasterList();
    // this.masterService.getMasterList().subscribe(res=>this.master=res);
    if(this.displayMessage=="updated")
    {
    this.set.setOption("Master Program updated successfully",true)
    }
    if(this.displayMessage=="create")
    {
      this.set.setOption("Master Program created successfully",true)
    }
    this.apiService.getMasterList() 
    .subscribe(data => {

    if(data.status== 200){
      window.localStorage.setItem("programkey","");
      this.master = data.result;
      this.startDate=moment(this.master.startDate).format('DD-MM-YYYY');
      this.endDate=moment(this.master.endDate).format('DD-MM-YYYY');
    }else{
      this.set.setOption("Failed to load data",false);

      // alert(data.exceptionMessage);
    }
    }, error => console.log(error));
    
  }


  masterDetails(id: number){
    this.router.navigate(['master/details', id]);
  }

  updateMaster(id: number){
    this.router.navigate(['master/update', id]);
  }

  masterAdd(){
    this.router.navigate(['master/add', ]);
  }

}
