import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiService} from "../../core/api.service";
import { breadcrumbMessage } from '../../shared/breadcrumb-message.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Crypto} from '../../shared/crypto.service'; 

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    brandId: new FormControl(''),
    programId: new FormControl(''),
    retailerId: new FormControl(''),
    file: new FormControl('', [Validators.required]),
    sourcingPartner: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  userId:any;
  view : boolean;
  errorIndata : boolean;
  sourcingPartnerList = [];
  sourcingPartnerId : any;
  finalList = [];
  dispList = []; 
  ProgramTypeList = [];
  closeResult = "";
  url : any;

  constructor( private apiService: ApiService, private set : breadcrumbMessage, private modalService: NgbModal,private crypto: Crypto) { }

  ngOnInit() {
    this.userId = this.crypto.decryt(window.localStorage.getItem('userId'));
    this.url = "https://finagg-prod.s3.ap-south-1.amazonaws.com/finagg/sample/Bulk_Upload_Customer.xlsx";
    this.view = false;
    this.errorIndata = false;
    this.apiService.getPartnerList().subscribe(res=>{this.sourcingPartnerList=res.result});
    this.apiService.getProgramTypeList().subscribe(res => this.ProgramTypeList = res.result);
  }
  ext(filename) {
    return filename.split('.').pop();
  }
  onFileChange(event) {
    var ext=this.ext(event.target.file[0].name);
    if (ext == 'xlsx'){
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.myForm.patchValue({
          fileSource: file
        });
      }
    }else{
      this.set.setOption("Please choose Excel Files", false);
      const files=<HTMLInputElement>document.getElementById('file');
      files.value="";
    }
  }

  submit(){
    if(this.sourcingPartnerId == null || this.sourcingPartnerId == undefined){
      this.set.setOption("Choose a sourcing partner", false);
      return;
    }else if(this.myForm.get('fileSource').value == null || this.myForm.get('fileSource').value == undefined ||  this.myForm.get('fileSource').value == ''){
      this.set.setOption("Upload the Excel", false);
      return;
    }else {
      const formData = new FormData();
      formData.append('file', this.myForm.get('fileSource').value);
      // formData.append('sourcingPartner', this.sourcingPartnerId);
      this.apiService.uploadNotInterestedCases(formData).subscribe(data => {
        if(data.exceptionOccured == 'N'){
          if(data.result.updateFlag == 1){
            this.errorIndata = true;
          }else {
            this.errorIndata = false;
          }
          for(let a of data.result.dataList){
              const obj = {
                OrgName : a[0],
                pan : a[1],
                mobile : a[2],
                remark: a[3],
                gstn : a[4],
                programType: a[5],
                pincode: a[6],
                credit: a[7],
                turnOver: a[8],
                err : a[9]
              }
              this.dispList.push(obj);
            }
          this.finalList = data.result.dataList;
          this.view = true;
        }else {
          this.set.setOption(data.exceptionMessage, false);
        }
      }, error => console.log(error));
    }
  }

  insert(){
    var type = 2 
    this.apiService.insertNotInterestedCases(this.finalList,this.sourcingPartnerId,this.userId,2).subscribe(data => {
      if(data.exceptionOccured == 'N'){
        this.set.setOption("Added Successfully", true);
        this.dispList = [];
        this.ngOnInit();
      }else {
        this.set.setOption(data.exceptionMessage, false);
      }
    }, error => console.log(error));
  }

  back(){
    window.location.reload();
  }

  open(content){
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
}
