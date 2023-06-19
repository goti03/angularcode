import { Injectable } from '@angular/core';  


@Injectable()  
export class breadcrumbMessage {
  

  private message = "";
  private flag : any;  
  private clear : any;
  staticAlertClosed = false;   

  
 setOption( message, flag) {  
    this.message = message;
    this.flag = flag;
    // setTimeout(() => (this.staticAlertClosed = true), 20000);
    if(message != "")
    {
      this.clear = setInterval(() => {
        this.message=""
        clearInterval(this.clear);
      }, 10000)
    }
      
  }  
  
  getOption() {  
    return   [this.message, this.flag];
  }
  validateSpecialChar(val:any){
    // const regex = /<|>/g;
    // const regex = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g;
    // const regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;
    // !@#$%^&*)(+=<>{}\\[\\]:;'|~`
    const regex = /[\!\@\#\$\%\^\&\*\)\(\+\=\<\>\{\}\[\]\:\;\'\|\~\`]/g;
    return (regex.test(val))?true:false;  
  }
  replaceSpecialChar(val:any){
    // const regex = /<|>/g;
    const regex = /[`~!@#$%^&*()-_+{}[\]\\|,.//?;':"]/g;
    return val.toString().replace(regex, '');  
  }

  
} 