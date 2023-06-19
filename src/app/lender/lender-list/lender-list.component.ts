import { LenderDetailsComponent } from './../lender-details/lender-details.component';
import { Observable } from "rxjs";
import { Lender } from "./../lenderModel";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ApiService} from "../../core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';
import { environment } from '../../../environments/environment.jana.prod';

@Component({
  selector: "app-employee-list",
  templateUrl: "./lender-list.component.html",
  styleUrls: ["./lender-list.component.css"]
})
export class LenderListComponent implements OnInit {
  lender: Observable<Lender[]>;
  searchLenderList;
  displayMessage:any;
  p:any;
  readRole: Boolean;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  roleId:any;
  constructor(private apiService: ApiService,
    private router: Router, private set : breadcrumbMessage,private crypto: Crypto) {}

  ngOnInit() {
    this.readRole = false;
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.displayMessage=  window.localStorage.getItem("programkey");
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    this.reloadData();
  }

  reloadData() {
    if(this.displayMessage=="updated")
    {
    this.set.setOption("Lender updated successfully",true)
    }
    if(this.displayMessage=="create")
    {
      this.set.setOption("Lender created successfully",true)
    }
    this.apiService.getLenderList() 
    .subscribe(data => {
    if(data.status== 200){
      this.lender = data.result;
      window.localStorage.setItem("programkey","");
    }else{
      this.set.setOption("Failed to load data",false);

      // alert(data.exceptionMessage);
    }
    }, error => console.log(error));
  }


  lenderDetails(id: number){
    this.router.navigate(['lender/details', id]);
  }

  updateLender(id: number){
    this.router.navigate(['lender/update', id]);
  }

  lenderAdd(){
    this.router.navigate(['lender/add', ]);
  }

}
