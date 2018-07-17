var md5 = require('md5');
var CryptoJS = require('crypto-js');
var forge = require('node-forge');
var utf8 = require('utf8');

var encryption = ({payload, secretkey}) => {
  var key = getKey(secretkey);
  var stringifyPayload = JSON.stringify(payload);
  var encryption = encrypt(key, stringifyPayload);

  return encryption;
}

function getKey(seckey) {
  var md5 = require('md5');
  var keymd5 = md5(seckey);
  var keymd5last12 = keymd5.substr(-12);

  var seckeyadjusted = seckey.replace('FLWSECK-', '');
  var seckeyadjustedfirst12 = seckeyadjusted.substr(0, 12);

  return seckeyadjustedfirst12 + keymd5last12;
}

// This is the encryption function that encrypts your payload by passing the stringified format and your encryption Key.
function encrypt(key, text) {
  var CryptoJS = require('crypto-js');
  var forge = require('node-forge');
  var utf8 = require('utf8');
  var cipher = forge.cipher.createCipher('3DES-ECB', forge.util.createBuffer(key));
  cipher.start({ iv: '' });
  cipher.update(forge.util.createBuffer(text, 'utf-8'));
  cipher.finish();
  var encrypted = cipher.output;
  return (forge.util.encode64(encrypted.getBytes()));
}

export default encryption