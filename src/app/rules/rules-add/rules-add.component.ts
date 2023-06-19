import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Rule } from '../ruleModel';
import { RuleDynamic } from '../ruleDynamic';
import { Router } from '@angular/router';
import { ApiService} from "..//..//core/api.service";
import * as moment from 'moment/moment.js';
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';

@Component({
  selector: 'app-rules-add',
  templateUrl: './rules-add.component.html',
  styleUrls: ['./rules-add.component.css']
})
export class RulesAddComponent implements OnInit {
  submitted = false;
  rule: Rule = new Rule();
  ruleDynamicWhen: Array<RuleDynamic> = [];
  tempRowWhen: Array<RuleDynamic> = [];
  ruleDynamicThen: Array<any> = [];
  objectList: Array<any> = [];
  ruleDynamicThenFinal: Array<RuleDynamic> = [];
  newDynamic: any = {};
  newDynamic1: any = {};
  brandData = [];
  bankDataMonthly = [];
  bankDataSummary = [];
  masterDataList = [
    // { id: 'Teleco', name: 'Teleco' },
    // { id: 'Bureau', name: 'Bureau' },
  ];
  telecoDataList = [
    // { id: 'serviceType', name: 'serviceType' },
    // { id: 'model', name: 'model' },
  ];

  bureauDataList = [
    // { id: 'creditScore', name: 'creditScore' },
    // { id: 'noOfCreditLinesExceptCreditCards', name: 'noOfCreditLinesExceptCreditCards' },
  ];
  programList = [
    // { id: 'creditScore', name: 'creditScore' },
    // { id: 'noOfCreditLinesExceptCreditCards', name: 'noOfCreditLinesExceptCreditCards' },
  ];
  conditionList = [
    { id: '=', name: 'equals to' },
    { id: '>=', name: 'greater than equals to' },
    { id: '<=', name: 'less than equals to' },
    { id: '>', name: 'greater than' },
    { id: '<', name: 'less than' },
  ];
  uomList = [];
  ThenResultList = [
    { id: 'preApprovedLimit', name: 'Pre-Approved Limit' },
    { id: 'finalCreditLimit', name: 'Final Credit Limit' },
  ];
  column1:boolean;
  column2:boolean;
  column3:boolean;
  column4:boolean;
  column5:boolean;

  parameter1When = [];
  parameter1Then1 = [];
  parameter1Then2 = [];
  roleId:any;
  orgId:any;
  userId:any;
  constructor(private apiService: ApiService,private crypto: Crypto,
    private router: Router, private changeDetec: ChangeDetectorRef, private set : breadcrumbMessage) { }
  // ,private toastr: ToastrService
  isNullorUndefinedorEmpty(str) {
    return (!str || str == '' || str == 'null'||str=='0' || str == null || str == undefined);
}
  ngOnInit(): void {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.orgId = this.crypto.decryt(window.localStorage.getItem('orgId'));
    this.submitted = false;
    this.column1=false;
    this.column2=false;
    this.column3=false;
    this.column4=false;
    this.column5=false;
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
    this.apiService.getUomList().subscribe(res => this.uomList = res.result);
    console.log("uomList.length======", this.uomList);
  }
  getBrandMaster() {
    this.apiService.getBrandList().subscribe(res => this.brandData = res.result);
    console.log("brandData.length======", this.brandData);
  }
  getBankDataMonthlyList() {
    this.apiService.getBankDataMonthly().subscribe(res => this.bankDataMonthly = res.result);
    console.log("bankDataMonthly.length======", this.bankDataMonthly);
  }

  getBankDataSummaryList() {
    this.apiService.getBankDataSummary().subscribe(res => this.bankDataSummary = res.result);
    console.log("bankDataSummary.length======", this.bankDataSummary);
  }

  getProgramMaster() {

    this.apiService.getProgramList(this.roleId,this.orgId).subscribe(res => this.programList = res.result);
    console.log("programList.length======", this.programList);
  }


  getObjectMaster() {
    this.apiService.getObjectList().subscribe(res => this.masterDataList = res.result);
    console.log("masterDataList.length==", this.masterDataList);
  }


  getTelcoObject() {

    this.apiService.getTelcoObject().subscribe(res => this.telecoDataList = res.result);
    console.log("telecoDataList.length==", this.telecoDataList);
  }
  // bureauDataList

  getBureauObject() {

    this.apiService.getBureauObject().subscribe(res => this.bureauDataList = res.result);
    console.log("bureauDataList.length==", this.bureauDataList);
  }
  getObjectByName(name:any){
this.apiService.getObjectByName(name).subscribe(res => this.objectList = res.result);
  }
  // when condition
  addRowWhen(index) {
    console.log("index value is::", index);
    var sequenceNo1 = this.ruleDynamicWhen.length + 1;
    console.log("sequenceNo1 value is::", sequenceNo1);
    // alert("index::"+index);
    if (index != 0) {
      console.log("inside indexx ::" + this.ruleDynamicWhen.length);
      console.log("inside indexx -->>" + this.ruleDynamicWhen);
      sequenceNo1 = index;
      
      
      for (let i = 0; i < this.ruleDynamicWhen.length; i++) {
        if (this.ruleDynamicWhen[i].sequenceNo > sequenceNo1) {
          this.tempRowWhen.push(this.ruleDynamicWhen[i]);
        }
      }
      // alert("temp row length::"+this.tempRowWhen.length);

    }
    console.log("after value is::", sequenceNo1);
    this.newDynamic = {
      sequenceNo: sequenceNo1, validationType: 'When', parameter1: '', parameter1Object: '',
      validationValue: '', parameter2: '', parameter2UOM: '', parameter2Object: '', resultValue: '', resultValueObject: '', subsequentConditionType: 'AND',
      activeInd:'Y',createdBy:Number(this.userId),createdOn:new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss'))), resultType: '',resultExprObject:'',resultExprParameter: '',resultExprMathOperator: '',resultExprValue: 0
    };
    //suits.splice(2, 0 , "Test");
    if (index != 0) {
      var placementIndex = sequenceNo1;
      var tempData = [];
      //  tempData = this.ruleDynamicWhen;
      tempData = this.ruleDynamicWhen.slice(placementIndex);
      //  tempData.slice(placementIndex);
      console.log("after tempData is::", tempData);
      // alert("placementIndex::"+placementIndex);
      for (let i = placementIndex; i < this.ruleDynamicWhen.length; i++) {
        // alert("i ::"+i);
        this.ruleDynamicWhen.splice(i, this.ruleDynamicWhen.length);
        // this.deleteRowWhen(i);
      }

      //  var placementIndex = sequenceNo1 -1;
      this.ruleDynamicWhen.splice(placementIndex, 0, this.newDynamic);

      // alert("this.placementIndex"+placementIndex);
      // alert("this.tempRowWhen"+this.tempRowWhen.length);
      for (let i = 0; i < this.tempRowWhen.length; i++) {
        // alert("this.tempRowWhen[i].parameter1"+this.tempRowWhen[i].parameter1);
        // this.ruleDynamicWhen = this.ruleDynamicWhen.concat(this.tempRowWhen[i]);
        
        this.newDynamic = {
          sequenceNo: this.tempRowWhen[i].sequenceNo, validationType: 'When', parameter1: this.tempRowWhen[i].parameter1, parameter1Object: this.tempRowWhen[i].parameter1Object,
          validationValue: this.tempRowWhen[i].validationValue, parameter2: this.tempRowWhen[i].parameter2, parameter2UOM: this.tempRowWhen[i].parameter2UOM, 
          parameter2Object: this.tempRowWhen[i].parameter2Object, resultValue: '', resultValueObject: '', subsequentConditionType: this.tempRowWhen[i].subsequentConditionType,
          activeInd:'Y',createdBy:Number(this.userId),createdOn:new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss'))),
          resultType: '',resultExprObject:'',resultExprParameter: '',resultExprMathOperator: '',resultExprValue: 0
        };
        this.ruleDynamicWhen.splice(sequenceNo1+i+1, 0, this.newDynamic);

      }

      // this.ruleDynamicWhen = this.ruleDynamicWhen.concat(this.tempRowWhen);
    } else {
      this.ruleDynamicWhen.push(this.newDynamic);
    }
    console.log("ruleDynamicWhen", this.ruleDynamicWhen);
    this.changeDetec.detectChanges();
    return true;
  }
  deleteRowWhen(index) {
    if (this.ruleDynamicWhen.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);

      // alert("Can't delete the row when there is only one row");
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning',{ positionClass: 'toast-top-right'  });  
      return false;
    } else {
      this.ruleDynamicWhen.splice(index, 1);
      // this.toastr.warning('Row deleted successfully', 'Delete row',{ positionClass: 'toast-top-right'  });  
      return true;
    }
  }
  // when condition

  // then condition
  addRowThen() {
    //  var sequenceNo1 = this.newDynamic.sequenceNo ;   
    this.newDynamic = {
      sequenceNoT: this.ruleDynamicThen.length + 1, validationTypeT: 'Then', parameter1T: '', parameter1ObjectT: '',
      validationValueT: '', parameter2T: '', parameter2TUOM: '', parameter2ObjectT: '', resultValue: '', resultValueObjectT: '', subsequentConditionTypeT: '',
      resultType:'',resultExprObject:'',resultExprParameter:'',resultExprMathOperator:'',resultExprValue:0,column1:false,
      column2:false,column3:false,column4:false,column5:false

    };
    this.ruleDynamicThen.push(this.newDynamic);
    console.log("ruleDynamicWhen", this.ruleDynamicThen);
    this.changeDetec.detectChanges();
    return true;
  }

  deleteRowThen(index) {
    if (this.ruleDynamicThen.length == 1) {
      this.set.setOption("Can't delete the row when there is only one row", false);

      // alert("Can't delete the row when there is only one row");
      // this.toastr.error("Can't delete the row when there is only one row", 'Warning',{ positionClass: 'toast-top-right'  });  
      return false;
    } else {
      this.ruleDynamicThen.splice(index, 1);
      // this.toastr.warning('Row deleted successfully', 'Delete row',{ positionClass: 'toast-top-right'  });  
      return true;
    }
  }
  // then condition

  logValue() {
    var check = 0;
    this.ruleDynamicThenFinal=[];
    for (let i = 0; i < this.ruleDynamicWhen.length; i++) {
      // console.log ("Block statement execution no." + i);
      // this.ruleDynamicWhen[i].sequenceNo = i + 1;
      this.ruleDynamicWhen[i].parameter1DataType=(this.ruleDynamicWhen[i].parameter1=='ruleStatus')?'String':'int';
      if (i == this.ruleDynamicWhen.length - 1) {
        this.ruleDynamicWhen[i].subsequentConditionType = '';
      }
    }

    // this.ruleDynamicThenFinal.length()
    console.log("this.ruleDynamicThen=="+JSON.stringify(this.ruleDynamicThen));
    // alert("this.ruleDynamicThen=="+JSON.stringify(this.ruleDynamicThen));
    for (let i = 0; i < this.ruleDynamicThen.length; i++) {
      // console.log ("Block statement execution no." + i);
      // this.ruleDynamicThen[i].sequenceNo=i+1;

      this.newDynamic1 = {
        sequenceNo: this.ruleDynamicWhen.length + i + 1, validationType: 'Then', parameter1: this.ruleDynamicThen[i].parameter1T, parameter1Object: this.ruleDynamicThen[i].parameter1ObjectT,
        validationValue: '', parameter2: '', parameter2UOM: '', parameter2Object: '', resultValueObject: '', subsequentConditionType: '',
        resultValue: this.ruleDynamicThen[i].resultValue,resultType:this.ruleDynamicThen[i].resultType,
      resultExprObject:this.ruleDynamicThen[i].resultExprObject,resultExprParameter:this.ruleDynamicThen[i].resultExprParameter,
      resultExprMathOperator:this.ruleDynamicThen[i].resultExprMathOperator,resultExprValue:this.ruleDynamicThen[i].resultExprValue,
    activeInd:'Y',createdBy:Number(this.userId),createdOn:new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss'))),
    parameter1DataType:(this.ruleDynamicThen[i].parameter1=='ruleStatus')?'String':'int'
      };
      this.ruleDynamicThenFinal.push(this.newDynamic1);

    }
    this.rule.activeInd='Y';
    this.rule.createdBy= Number(this.userId);
    this.rule.createdOn= new Date(Date.parse(moment().format('YYYY-MM-DD HH:mm:ss')));
    this.rule.ruleConditions = this.ruleDynamicWhen.concat(this.ruleDynamicThenFinal);
    this.rule.drlFileName = "";
    // alert("ruleConditions=="+ JSON.stringify(this.rule.ruleConditions));
    console.log("rule", this.rule);
    if (this.rule.ruleName == null || this.rule.ruleName == '') {
      this.set.setOption("Please enter rule name", false);

      // alert("Please enter rule name");
      return false;
    }else if (this.rule.programId == null) {
      this.set.setOption("Please select program", false);

      // alert("Please select program");
      return false;
    }else if(this.ruleDynamicWhen.length==0){
      this.set.setOption("Please add atleast one condition", false);
      return false;
    }else if(this.ruleDynamicThenFinal.length==0){
      this.set.setOption("Please add atleast one condition", false);
      return false;
    }else if(this.set.validateSpecialChar(this.rule.ruleName)){
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }else if(this.set.validateSpecialChar(this.rule.drlFileName)){
      this.set.setOption("Special Characters Not Allowed",false);
      return;
    }  else {
      // alert(this.ruleDynamicWhen.length);
      // alert(this.ruleDynamicThen.length);
      for (let i = 0; i < this.ruleDynamicWhen.length; i++) {
        // alert("inside loop::" + this.ruleDynamicWhen[i].parameter1Object)
        if (this.ruleDynamicWhen[i].parameter1Object == null || this.ruleDynamicWhen[i].parameter1Object == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicWhen[i].parameter1Object)) {
          
          const alert1 = "please select data for row " + (i+1);
          this.set.setOption(alert1, false);
          // alert("please select data for row " + this.ruleDynamicWhen[i].sequenceNo);
          check = check + + 1;
          return;
         }
        if (this.ruleDynamicWhen[i].parameter1 == null || this.ruleDynamicWhen[i].parameter1 == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicWhen[i].parameter1)) {
          this.set.setOption("please select object for row " + this.ruleDynamicWhen[i].sequenceNo,false);
          check = check + + 1;
          return;
        }
        if (this.ruleDynamicWhen[i].validationValue == null || this.ruleDynamicWhen[i].validationValue == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicWhen[i].validationValue)) {
          const alert = "Please select condition for row" +(i+1);
          this.set.setOption(alert, false);
          // alert("please select condition for row " + this.ruleDynamicWhen[i].sequenceNo);
          check = check + + 1;
          return;
        }
        if (this.ruleDynamicWhen[i].parameter2 == null || this.ruleDynamicWhen[i].parameter2 == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicWhen[i].parameter2)) {
          const alert = "Please enter value for row" + (i+1);
          this.set.setOption(alert, false);
          return;
          // alert("please enter value for row " + this.ruleDynamicWhen[i].sequenceNo);

          check = check + + 1;
        }
        
      }
      // ruleDynamicThenFinal
      for (let i = 0; i < this.ruleDynamicThenFinal.length; i++) {
        if (this.ruleDynamicThenFinal[i].parameter1Object == null || this.ruleDynamicThenFinal[i].parameter1Object == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicThenFinal[i].parameter1Object) ) {
          const alert1 = "Please select data(Then) for row" + (i+1);
          this.set.setOption(alert1, false);

          // alert("please select data(Then) for row " + this.ruleDynamicWhen[i].sequenceNo);
          check = check + + 1;
          return;
        }
        if (this.ruleDynamicThenFinal[i].parameter1 == null || this.ruleDynamicThenFinal[i].parameter1 == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicThenFinal[i].parameter1)) {
          this.set.setOption("please select object for row " + this.ruleDynamicWhen[i].sequenceNo, false);
          check = check + + 1;
          return;
        }
        if ((this.ruleDynamicThenFinal[i].resultValue == null || this.ruleDynamicThenFinal[i].resultValue == '' || this.isNullorUndefinedorEmpty(this.ruleDynamicThenFinal[i].resultValue)) && this.ruleDynamicThen[i].column1)  {
          this.set.setOption("please select object for row " + this.ruleDynamicWhen[i].sequenceNo,false);
          check = check + + 1;
          return;
        }
      }     // alert("OUT Check::" + check);
      if (check == 0) {
        // alert("Check::" + check);
        this.submitted = true;
        this.save(); 
      }

    }

  }

  save() {
    let msg = null;
    let errMsg = null;
    this.apiService.createRule(this.rule)
      .subscribe(data =>{
        if(data.status==200){
          this.set.setOption("Added successfully",true);
          this.gotoList();

        }
      },error => errMsg = error);
    console.log("msg==", msg);
    console.log("errMsg==", errMsg);
    this.rule = new Rule();
  }
  gotoList() {
    this.router.navigate(['rules/list']);
  }

  onMastersSelectedWhen(index, event) {
    const value = event.target.value;
    this.apiService.getObjectByName(value)
      .subscribe(data => {
        if(data.status==200){
            if(this.isNullorUndefinedorEmpty(this.parameter1When[index])){
              this.parameter1When.splice(index,0,data.result);
            }else{
              this.parameter1When.splice(index,1,data.result);
            }
        }
      }, error => console.log(error));
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

  onMastersSelectedThen(index, event,val) {
    const value = event.target.value;
      this.apiService.getObjectByName(value)
      .subscribe(data => {
        if(data.status==200){
          if(val == 0)
          {
            if(this.isNullorUndefinedorEmpty(this.parameter1When[index])){
              this.parameter1Then1.push(data.result);
              this.parameter1Then2.push([]);
            }
            else{
              this.parameter1Then1.splice(index,1,data.result);
            }
          }
          else{
            if(this.isNullorUndefinedorEmpty(this.parameter1When[index] != [])){
              this.parameter1Then2.push(data.result);
            }
            else{
              this.parameter1Then2.splice(index,1,data.result);
            }
          }
        }
      }, error => console.log(error));
  }

}
