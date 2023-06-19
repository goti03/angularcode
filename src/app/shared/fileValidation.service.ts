import { Injectable } from '@angular/core';  


@Injectable()  
export class fileValidation {
  ext(filename) {
    return filename.split('.').pop();
  }
  fileValidations(filename,data){
    var ext=this.ext(filename);
    var returnValue=false;
    for(let v of data){
      if(v==ext){
        returnValue=true; 
        break;
      }
    }
    return returnValue;
  }  
} 