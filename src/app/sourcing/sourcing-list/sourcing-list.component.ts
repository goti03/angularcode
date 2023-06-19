import { SourcingDetailsComponent } from './../sourcing-details/sourcing-details.component';
import { Observable } from "rxjs";
import { Sourcing } from "./../sourcingModel";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ApiService} from "../../core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';
import { environment } from '../../../environments/environment.jana.prod';

@Component({
  selector: "app-employee-list",
  templateUrl: "./sourcing-list.component.html",
  styleUrls: ["./sourcing-list.component.css"]
})
export class SourcingListComponent implements OnInit {
  sourcing: Observable<Sourcing[]>;
  searchSourcingList;
  displayMessage:any;
  p:any;
  roleId: any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  readRole:Boolean;
  constructor(private router: Router,private apiService: ApiService,private set : breadcrumbMessage, private crypto: Crypto) {}

  ngOnInit() {
    this.readRole = false;
    this.roleId=this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.displayMessage=  window.localStorage.getItem("programkey");
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    this.reloadData();
  }

  reloadData() {
    if(this.displayMessage=="updated")
    {
    this.set.setOption("Sourcing Partner updated successfully",true)
    }
    if(this.displayMessage=="create")
    {
      this.set.setOption("Sourcing Partner created successfully",true)
    }
    this.apiService.getSourcingList() 
    .subscribe(data => {
    if(data.status== 200){
      this.sourcing = data.result;
      window.localStorage.setItem("programkey","");
    }else{
      alert(data.exceptionMessage);
    }
    }, error => console.log(error));
  }

  sourcingDetails(id: number){
    this.router.navigate(['sourcing/details', id]);
  }

  updateSourcing(id: number){
    this.router.navigate(['sourcing/update', id]);
  }

  sourcingAdd(){
    this.router.navigate(['sourcing/add', ]);
  }

}
