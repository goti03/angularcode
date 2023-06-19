import { Component, OnInit } from '@angular/core';
import { Rule } from '../ruleModel';
import { RuleDynamic } from '../ruleDynamic';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-rules-details',
  templateUrl: './rules-details.component.html',
  styleUrls: ['./rules-details.component.css']
})
export class RulesDetailsComponent implements OnInit {
  id: number;
  ruleList:Rule=new Rule();
  ruleDynamicWhen:Array<RuleDynamic>=[];
  ruleDynamicThen:Array<RuleDynamic>=[];
  newDynamic: any = {};  
  programList = [];
  roleId:any;
  orgId:any;
  constructor(private route: ActivatedRoute,private router: Router,private crypto: Crypto,
    private apiService: ApiService) { }
  


  ngOnInit(): void {
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.apiService.getProgramList(this.roleId,this.orgId).subscribe(res => this.programList = res.result);
    
    this.id = this.route.snapshot.params['id'];

    this.apiService.getRuleDetails(this.id)
    .subscribe(data => {
      // console.log(data)
      if(data.status== 200){
        this.ruleList = data.result;
        console.log(this.ruleList);
      }else{
        alert(data.exceptionMessage);
      }
      this.conditionsCheck();
    }, error => console.log(error));
     
  }
      
  conditionsCheck(){
    if(this.ruleList.ruleConditions.length > 0){
      var whenData=[];
      var thenData=[];
      this.ruleList.ruleConditions.forEach( function(ruleConditions) {
        if(ruleConditions.validationType=='When'){
          console.log("when condition");
          whenData.push(ruleConditions);               
        }
        
        if(ruleConditions.validationType=='Then'){
          console.log("Then condition");
          thenData.push(ruleConditions);               
        }

      });
      console.log("whenData==",whenData);
      console.log("thenData==",thenData);
    }
    this.ruleDynamicWhen=whenData.sort((a, b) => {
      if(a.sequenceNo > b.sequenceNo) {
        return 1;
      } else if(a.sequenceNo < b.sequenceNo) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log("ruleDynamicWhen"+this.ruleDynamicWhen);
    this.ruleDynamicThen=thenData.sort((a, b) => {
      if(a.sequenceNo > b.sequenceNo) {
        return 1;
      } else if(a.sequenceNo < b.sequenceNo) {
        return -1;
      } else {
        return 0;
      }
    });
    console.log("ruleDynamicThen"+JSON.stringify(this.ruleDynamicThen));
  }

  list(){
    this.router.navigate(['rules/list']);
  }
}
