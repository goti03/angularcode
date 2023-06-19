function getKeySize(keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

function generateKey(salt, passPhrase,keySize, iterationCount) {
  var key = CryptoJS.PBKDF2(passPhrase,CryptoJS.enc.Hex.parse(salt),{ keySize: keySize, iterations: iterationCount });
  return key;
}

function encrypt(keySize, iterationCount,salt, passPhrase,plainText,iv){
  keySize = keySize / 32;
  var key = this.generateKey(salt, passPhrase,keySize, iterationCount);
  var encrypted = CryptoJS.AES.encrypt(plainText,key,{ iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}



function decrypt(keySize, iterationCount,salt, passPhrase,cipherText,iv){
  keySize = keySize / 32;
  var key = this.generateKey(salt, passPhrase,keySize, iterationCount);
  var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(cipherText)});
  var decrypted = CryptoJS.AES.decrypt(cipherParams,key,{ iv: CryptoJS.enc.Hex.parse(iv) });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
//   var key = this.generateKey(salt, passPhrase);
//   var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(cipherText)});
//   var decrypted = CryptoJS.AES.decrypt(cipherParams,key,{ iv: CryptoJS.enc.Hex.parse(iv) });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }

// AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
//   var key = this.generateKey(salt, passPhrase);
//   var encrypted = CryptoJS.AES.encrypt(
//       plainText,
//       key,
//       { iv: CryptoJS.enc.Hex.parse(iv) });
//   return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
// }

// AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
//   var key = this.generateKey(salt, passPhrase);
//   var cipherParams = CryptoJS.lib.CipherParams.create({
//     ciphertext: CryptoJS.enc.Base64.parse(cipherText)
//   });
//   var decrypted = CryptoJS.AES.decrypt(
//       cipherParams,
//       key,
//       { iv: CryptoJS.enc.Hex.parse(iv) });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }

// -----------------------------------------------------------------


// var AesUtil = function(keySize, iterationCount) {
//   this.keySize = keySize / 32;
//   this.iterationCount = iterationCount;
// };

// AesUtil.prototype.generateKey = function(salt, passPhrase) {
//   var key = CryptoJS.PBKDF2(
//       passPhrase, 
//       CryptoJS.enc.Hex.parse(salt),
//       { keySize: this.keySize, iterations: this.iterationCount });
//   return key;
// }

// AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
//   var key = this.generateKey(salt, passPhrase);
//   var encrypted = CryptoJS.AES.encrypt(
//       plainText,
//       key,
//       { iv: CryptoJS.enc.Hex.parse(iv) });
//   return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
// }

// AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
//   var key = this.generateKey(salt, passPhrase);
//   var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(cipherText)});
//   var decrypted = CryptoJS.AES.decrypt(cipherParams,key,{ iv: CryptoJS.enc.Hex.parse(iv) });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
