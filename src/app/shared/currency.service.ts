import { Injectable } from '@angular/core';


@Injectable()
export class Currency {

  constructor() { }

  public indianCurrency(number: any) {
    if(number == 0){
      return "Rs. 0.00";
    }
    if ((number == null) || (number == '')) {
      return null;
    } else {
      var b;
      var a = Number(number).toString().split('.')[0].length > 3 ? number.toString().substring(0, number.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + number.toString().substring(number.toString().split('.')[0].length - 3) : number.toString();
      if(a.indexOf('.') == -1)
      {
        b = a+".00";
      }
      else
      {
        if ( a.split('.')[1].length == 1)
        {
          b = a.toString()+"0";
        }
        else if( a.split('.')[1].length > 2 ) 
        {
          var c = a.split('.')[1].toString().substring(0,2);
          b = a.split('.')[0]+"."+c;
        }
        else
        {
          b = a;
        }
      }
      return "Rs. "+b;
    }

  }

}