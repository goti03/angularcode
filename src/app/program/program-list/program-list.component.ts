
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Program } from '../programModel';
import { Observable } from "rxjs";
import { ApiService} from "..//..//core/api.service";
import {breadcrumbMessage} from '../../shared/breadcrumb-message.service'
import {Crypto} from '../../shared/crypto.service';
import { environment } from '../../../environments/environment.jana.prod';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.css']
})

export class ProgramListComponent implements OnInit {
  // programList: Observable<Program[]>;
  programList=[];
  searchProgramList;
  ProgramTypeList:any;
  masterList:any;
  p:any;
  displayMessage:any;
  roleId:any;
  readOnly=environment.readOnly.roleId;
  anchorReadonly=environment.readOnly.anchorRoleId;
  readRole:Boolean;
  constructor(private router: Router,private apiService: ApiService, private set : breadcrumbMessage,private crypto: Crypto) {}

  ngOnInit(): void {
    this.readRole = false;
    this.roleId = this.crypto.decryt(window.localStorage.getItem('roleId'));
    this.displayMessage=  window.localStorage.getItem("programkey");
    if((this.readOnly == Number(this.roleId))||(this.anchorReadonly==Number(this.roleId))){
      this.readRole = true;
    }
    this.reloadData();
    this
  }

  programAdd(){
    this.router.navigate(['program/add', ]);
  }

  reloadData() {
    if(this.displayMessage=="updated")
    {
    this.set.setOption("Program updated successfully",true)
    }
    if(this.displayMessage=="create")
    {
      this.set.setOption("Program created successfully",true)
    }
    this.apiService.getProgramTypeList().subscribe(res => this.ProgramTypeList = res.result);
    this.apiService.getMasterList().subscribe(res => this.masterList = res.result);
    window.localStorage.setItem("programkey","");
    // this.programList = this.programService.getProgramSetupList().subscribe(res=>this.programList=res);
    // this.apiService.getProgramSetupList().subscribe(res=>this.programList=res);
    this.apiService.getProgramSetupList() 
    .subscribe(data => {
    if(data.status== 200){
      this.programList = data.result;
      for(let p of this.programList){
        for(let m of this.masterList){
          if(p.masterProgramId==m.masterId){
            p.masterProgramName=m.masterName;
            break;
          }
        }
        for(let pt of this.ProgramTypeList){
          if(p.programTypeId==pt.id){
            p.programTypeName=pt.name;
            break;
          }
        }
      }
    }else{
      this.set.setOption(data.exceptionMessage,false);
      // alert(data.exceptionMessage);
    }
    }, error => console.log(error));
    console.log("program.length==",this.programList);
  }

  programDetails(id: number){
    this.router.navigate(['program/details', id]);
  }

  updateProgram(id: number){

    this.router.navigate(['program/update', id]);
  }
  copyProgram(id: number) {

    this.router.navigate(['program/copy', id]);
  }
  
  approveReject(id: number){
    this.apiService.activeProgram(id).subscribe(res =>{
      if(res.status==200){
        this.ngOnInit();
        this.set.setOption(res.exceptionMessage,true);
      }else{
        this.set.setOption(res.exceptionMessage,false);
      }
    } );
    
  }

}
