import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Rule } from '../ruleModel';
import { RuleDynamic } from '../ruleDynamic';
import { ApiService} from "..//..//core/api.service";
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-rules-update',
  templateUrl: './rules-update.component.html',
  styleUrls: ['./rules-update.component.css']
})
export class RulesUpdateComponent implements OnInit{
  // programIdSelected:Number;
  submitted = false;
  whenAddButton=false;
  thenAddButton=false;
  newRulesList=[];
  tempRowWhen: Array<RuleDynamic> = [];
  id: number;
  rule:Rule=new Rule();
  ruleDynamicWhen:Array<RuleDynamic>=[];
  ruleDynamicThen:Array<any>=[];
  ruleDynamicThenFinal:Array<RuleDynamic>=[];
  newDynamic: any = {};  
  deleteList:Array<any>=[];

  uomList = [];
  brandData=[];
  bankDataMonthly=[];
  bankDataSummary=[];
  masterDataList = [];
  telecoDataList = [];
  bureauDataList = [];
  programList = [];     
    conditionList = [
        { id: '=', name: 'equals to' },
        { id: '>=', name: 'greater than equals to' },
        { id: '<=', name: 'less than equals to' },
        { id: '>', name: 'greater than' },
        { id: '<', name: 'less than' },
        ];

        ThenResultList = [
          // { id: 'preApprovedLimit', name: 'Pre-Approved Limit' },
          // { id: 'finalCreditLimit', name: 'Final Credit Limit' },
          // { id: 'loanEligibility', name: 'loanEligibility' },
          ];

  parameter1When = [];
  parameter1Then1 = [];
  parameter1Then2 = [];
  roleId:any;
  orgId:any;
  userId:any;

  constructor(private route: ActivatedRoute,private router: Router,private crypto: Crypto,
    private apiService: ApiService,private changeDetec:ChangeDetectorRef, private set : breadcrumbMessage) { }
  


  ngOnInit(): void {
    this.deleteList=[];
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.id = this.route.snapshot.params['id'];
    this.roleId=this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.orgId=this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.submitted = false; 
    this.whenAddButton=false;
    this.thenAddButton=false;
    this.apiService.getRuleDetails(this.id)
    .subscribe(data => {
      // console.log(data)
      if(data.status== 200){
        this.rule = data.result;
        var c
        for(c=0;c<data.result.ruleConditions.length;c++)
        {
        data.result.ruleConditions[c].resultExprValue=0
        }
       // console.log("the extra data is==="+data.result.ruleConditions[0].resultExprValue)
        console.log("rule list::::"+JSON.stringify(this.rule));
        this.conditionsCheck();
      }else{
        alert(data.exceptionMessage);
      }
      console.log("data.programId============",data.programId);
      // this.programIdSelected = data.programId;
      // this.rule.programId = data.programId;
      // this.programList[0].id = data.programId;
      
    }, error => console.log(error));
     
    this.getObjectMaster();
    // this.getTelcoObject();
    this.getProgramMaster();
    // this.getBureauObject();
    // this.getBrandMaster();
    // this.getBankDataMonthlyList();
    // this.getBankDataSummaryList();
    this.getUomList();
  }
  
  getUomList() {
    this.apiService.getUomList().subscribe(res=>this.uomList=res.result);
    console.log("uomList.length======",this.uomList);
  }
  getBrandMaster() {
    this.apiService.getBrandList().subscribe(res=>this.brandData=res.result);
    console.log("brandData.length======",this.brandData);
  }
  getBankDataMonthlyList() {
    this.apiService.getBankDataMonthly().subscribe(res=>this.bankDataMonthly=res.result);
    console.log("bankDataMonthly.length======",this.bankDataMonthly);
  }

  getBankDataSummaryList() {
    this.apiService.getBankDataSummary().subscribe(res=>this.bankDataSummary=res.result);
    console.log("bankDataSummary.length======",this.bankDataSummary);
}

  getProgramMaster() {
    this.apiService.getProgramList(this.roleId,this.orgId).subscribe(res=>this.programList=res.result);
    console.log("programList.length======",this.programList);
  }


  getObjectMaster() {this.apiService.getObjectList().subscribe(res=>this.masterDataList=res.result);
    console.log("masterDataList.length==",this.masterDataList);
  }

  
  getTelcoObject() {
    
    this.apiService.getTelcoObject().subscribe(res=>this.telecoDataList=res.result);
    console.log("telecoDataList.length==",this.telecoDataList);
  }
  // bureauDataList
  
  getBureauObject() {
    
    this.apiService.getBureauObject().subscribe(res=>this.bureauDataList=res.result);
    console.log("bureauDataList.length==",this.bureauDataList);
  }


  async getobject(name) {
    this.apiService.getObjectByName(name).subscribe(data => {
      if(data.status == 200)
      {
        
        return data.result;
      }
    })
  }

 async conditionsCheck(){
    if(this.rule.ruleConditions.length > 0){
 
      this.newRulesList=this.rule.ruleConditions;
      for(let r of this.newRulesList){
        if(r.validationType=='When'){
          this.ruleDynamicWhen.push(r);
          // this.apiService.getObjectByName(r.parameter1Object)
          // .subscribe(data => {
          //     this.parameter1When.push(data.result);
          // },error=>console.log(error));
        }else{
          this.ruleDynamicThen.push(r);
          
          // this.apiService.getObjectByName(r.parameter1Object)
          // .subscribe(data => {
          //     this.parameter1Then1.push(data.result);
          // },error=>console.log(error));

          // if(r.resultExprObject==''){
          //   this.parameter1Then2.push([]);
          // }else{
          //   this.apiService.getObjectByName(r.resultExprObject)
          //   .subscribe(data => {
          //       this.parameter1Then2.push(data.result);
          //   },error=>console.log(error));

          }
          // parameter1Then1
          // parameter1Then2
        }
          
      
     
    }
    
    console.log('ruleDynamicWhen:::::::',this.ruleDynamicWhen);
    

    // this.parameter1When = [];
    // this.parameter1Then1 = [];
    // this.parameter1Then2 = [];
 

    console.log("ruleDynamicThen"+JSON.stringify(this.ruleDynamicThen));
    this.whenAddButton=true;
    this.thenAddButton=true;

    

  }



  // when condition
  addRowWhen(index) { 
    // alert("index::"+index);   
    var sequenceNo1 = this.ruleDynamicWhen.length + 1;
    // alert("sequenceNo1::"+sequenceNo1);
    if (index != 0) {
      sequenceNo1 = index;

      for (let i = 0; i < this.ruleDynamicWhen.length; i++) {
        if (this.ruleDynamicWhen[i].sequenceNo > sequenceNo1) {
          this.tempRowWhen.push(this.ruleDynamicWhen[i]);
        }
      }
    } 
    this.newDynamic = {sequenceNo:sequenceNo1,validationType: 'When', parameter1: '',parameter1Object:'',
    validationValue:'',parameter2: '',parameter2UOM: '',parameter2Object:'',resultValue:'',resultValueObject:'',subsequentConditionType:'AND',
    activeInd:'Y',createdBy:Number(this.userId),createdOn:new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss'))), resultType: '',resultExprObject:'',resultExprParameter: '',resultExprMathOperator: '',resultExprValue: 0, objectListWhen : []};  
    // this.ruleDynamicWhen.push(this.newDynamic);  
    if (index != 0) {
      var placementIndex = sequenceNo1;
      var tempData = [];
      //  tempData = this.ruleDynamicWhen;
      tempData = this.ruleDynamicWhen.slice(placementIndex);
      //  tempData.slice(placementIndex);
      // console.log("after tempData is::", tempData);
      // alert("placementIndex::"+placementIndex);
      // alert("this.ruleDynamicWhen.length::"+this.ruleDynamicWhen.length);
      for (let i = placementIndex; i < this.ruleDynamicWhen.length; i++) {
        // this.deleteRowWhen(i);
        this.ruleDynamicWhen.splice(i, this.ruleDynamicWhen.length);
      }

      //  var placementIndex = sequenceNo1 -1;
      this.ruleDynamicWhen.splice(placementIndex, 0, this.newDynamic);

      for (let i = 0; i < this.tempRowWhen.length; i++) {
        // alert("this.tempRowWhen[i].parameter1"+this.tempRowWhen[i].parameter1);
        // this.ruleDynamicWhen = this.ruleDynamicWhen.concat(this.tempRowWhen[i]);
        
        this.newDynamic = {
          sequenceNo: this.tempRowWhen[i].sequenceNo, validationType: 'When', parameter1: this.tempRowWhen[i].parameter1, parameter1Object: this.tempRowWhen[i].parameter1Object,
          validationValue: this.tempRowWhen[i].validationValue, parameter2: this.tempRowWhen[i].parameter2, parameter2UOM: this.tempRowWhen[i].parameter2UOM, 
          parameter2Object: this.tempRowWhen[i].parameter2Object, resultValue: '', resultValueObject: '', subsequentConditionType: this.tempRowWhen[i].subsequentConditionType,
          activeInd:'Y',createdBy:Number(this.userId),createdOn:new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss'))),
          resultType: '',resultExprObject:'',resultExprParameter: '',resultExprMathOperator: '',resultExprValue: 0, objectListWhen : []
        };
        this.ruleDynamicWhen.splice(sequenceNo1+i+1, 0, this.newDynamic);

      }

      // this.ruleDynamicWhen = this.ruleDynamicWhen.concat(tempData);
    } else {
      this.ruleDynamicWhen.push(this.newDynamic);
    }
    console.log("ruleDynamicWhen",this.ruleDynamicWhen);  
    this.changeDetec.detectChanges();
    return true;
  }
  deleteRowWhen(index) {  
    if(this.ruleDynamicWhen.length ==1) {  
      this.set.setOption("Can't delete the row when there is only one row", false);

      // alert("Can't delete the row when there is only one row");
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning',{ positionClass: 'toast-top-right'  });  
        return false;  
    } else {  
      console.log("deleteList this.ruleDynamicWhen[index]::",this.ruleDynamicWhen[index]);
      this.deleteList.push(this.ruleDynamicWhen[index]);
        this.ruleDynamicWhen.splice(index, 1);  
        // this.toastr.warning('Row deleted successfully', 'Delete row',{ positionClass: 'toast-top-right'  });  
        return true;  
    }  
  }  
// when condition

// then condition
addRowThen() {    
this.newDynamic = {
  sequenceNo: this.ruleDynamicThen.length + 1, validationType: 'Then', parameter1: '', parameter1Object: '',
  validationValue: '', parameter2: '', parameter2UOM: '', parameter2Object: '', resultValue: '', resultValueObject: '', subsequentConditionType: '',
  resultType:'',resultExprObject:'',resultExprParameter:'',resultExprMathOperator:'',resultExprValue:0,column1:false,
  column2:false,column3:false,column4:false,column5:false, objectListThen : [], objectListThen1 :[]
};  
this.ruleDynamicThen.push(this.newDynamic);  
console.log("ruleDynamicWhen",this.ruleDynamicThen);  
this.changeDetec.detectChanges();
return true;
}

deleteRowThen(index) {  
if(this.ruleDynamicThen.length ==1) {  
  this.set.setOption("Can't delete the row when there is only one row", false);

  // alert("Can't delete the row when there is only one row");
  // this.toastr.error("Can't delete the row when there is only one row", 'Warning',{ positionClass: 'toast-top-right'  });  
    return false;  
} else {  
  this.deleteList.push(this.ruleDynamicThen[index]);
  this.ruleDynamicThen.splice(index, 1);  
    // this.toastr.warning('Row deleted successfully', 'Delete row',{ positionClass: 'toast-top-right'  });  
    return true;  
}  
}  

resultValue(index, event) {
  const value = event.target.value;
 if(value=="boolean"){
    this.ruleDynamicThen[index].column1=false;
    this.ruleDynamicThen[index].column2=false;
    this.ruleDynamicThen[index].column3=false;
    this.ruleDynamicThen[index].column4=false;
    this.ruleDynamicThen[index].column5=false;
  }
  if(value=="expression"){
    this.ruleDynamicThen[index].column1=false;
    this.ruleDynamicThen[index].column2=true;
    this.ruleDynamicThen[index].column3=true;
    this.ruleDynamicThen[index].column4=true;
    this.ruleDynamicThen[index].column5=true;
   } 
  if(value=="literal"){
    this.ruleDynamicThen[index].column1=false;
    this.ruleDynamicThen[index].column2=true;
    this.ruleDynamicThen[index].column3=true;
    this.ruleDynamicThen[index].column4=false;
    this.ruleDynamicThen[index].column5=false;

   } 
   }
   
// then condition

  logValue() {
    
    for (let i = 0; i < this.ruleDynamicWhen.length; i++) {
      this.ruleDynamicWhen[i].parameter1DataType=(this.ruleDynamicWhen[i].parameter1=='ruleStatus')?'String':'int';
      this.ruleDynamicWhen[i].sequenceNo=i+1;
        if(i==this.ruleDynamicWhen.length-1){
            this.ruleDynamicWhen[i].subsequentConditionType='';
        }
      }

    for (let i = 0; i < this.ruleDynamicThen.length; i++) {
      this.ruleDynamicThen[i].sequenceNo=this.ruleDynamicWhen.length+i+1;
      this.ruleDynamicThen[i].parameter1DataType=(this.ruleDynamicThen[i].parameter1=='ruleStatus')?'String':'int';
    }
    this.rule.ruleConditions=this.ruleDynamicWhen.concat(this.ruleDynamicThen);
    this.rule.drlFileName="";
    console.log("ruleConditions==",this.rule.ruleConditions);

    console.log("rule",this.rule);
    this.submitted = true;
    this.save();  
  }

  save() {
    if(this.set.validateSpecialChar(this.rule.ruleName)){
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }else if(this.set.validateSpecialChar(this.rule.drlFileName)){
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }else{
      this.rule.activeInd='Y';
      this.rule.createdBy= Number(this.userId);
      this.rule.createdOn= new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss')));
      this.rule.deleteList= this.deleteList;
      
      let msg=null;
      let errMsg=null;
      this.apiService.updateRule(this.id,this.rule).subscribe(data => {
          this.rule = new Rule();
          this.gotoList();
        }, error => errMsg=error);
        console.log("msg==",msg);
        console.log("errMsg==",errMsg);
    }
    
  }
  gotoList() {
    this.router.navigate(['rules/list']);
  }


  onMastersSelected(index,e){
    var value = e.target.value;
    this.apiService.getObjectByName(value)
    .subscribe(data => {
      if(data.status==200){
            this.ruleDynamicWhen[index].objectListWhen = data.result;
      }
    }, error => console.log(error));

}

onMastersSelectedThen(index,event,val){
 
  const value = event.target.value;
      this.apiService.getObjectByName(value)
      .subscribe(data => {
        if(data.status==200){
          if(val == 0)
          {
              this.ruleDynamicThen[index].objectListThen = data.result;
              // this.ruleDynamicThen[index].objectListThen1 = [];
          }
          else{
            this.ruleDynamicThen[index].objectListThen1 = data.result;
          }
            
          }
        
      }, error => console.log(error));

}

}



