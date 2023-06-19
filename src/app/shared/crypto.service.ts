import { Injectable } from '@angular/core';
import {crypto} from '../../environments/environment'

declare var decrypt: any;
declare var encrypt: any;

@Injectable()
export class Crypto {
  passphrase=crypto.passphrase;
  iv = crypto.iv;
  salt = crypto.salt;
  iterationCount = crypto.iterationCount;
  keySize = crypto.keySize;
  constructor() { }
  public decryt(val: any) {
    return decrypt(this.keySize, this.iterationCount,this.salt, this.passphrase,val,this.iv);
  }
  public encryt(val: any) {
      return encrypt(this.keySize, this.iterationCount,this.salt, this.passphrase,val.toString(),this.iv);
  }
}

