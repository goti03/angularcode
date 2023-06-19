import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rule } from '../ruleModel';
import { Observable } from "rxjs";
import { ApiService} from "..//..//core/api.service";
import {Crypto} from '../../shared/crypto.service';
import { environment } from '../../../environments/environment.jana.prod';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css']
})

export class RuleListComponent implements OnInit {
  ruleList: Observable<Rule[]>;
  searchRulesList;
  programList = [];
  p:any;
  roleId :any;
  orgId:any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  readRole:Boolean;
  constructor(private router: Router,private apiService: ApiService,private crypto: Crypto) {}

  ngOnInit(): void {
    this.readRole = false;
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.apiService.getProgramList(this.roleId,this.orgId).subscribe(res => this.programList = res.result);
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    this.reloadData();
  }

  ruleAdd(){
    this.router.navigate(['rules/add', ]);
  }

  reloadData() {
    // this.ruleList = this.ruleService.getRuleList().subscribe(res=>this.ruleList=res);
    // this.apiService.getRuleList().subscribe(res=>this.ruleList=res.result);
    this.apiService.getRuleList()
    .subscribe(data => {
    if(data.status== 200){
      this.ruleList = data.result;
    }else{
      alert(data.exceptionMessage);
    }
    }, error => console.log(error));
    console.log("ruleList.length=="+JSON.stringify(this.ruleList));
  }

  ruleDetails(id: number){
    this.router.navigate(['rules/details', id]);
  }

  updateRule(id: number){
    this.router.navigate(['rules/update', id]);
  }

}
