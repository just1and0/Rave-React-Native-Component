import React from 'react'
import RaveApi from 'react-native-rave-networking'


export default class RavePayment {
  constructor({ publicKey, secretKey, production = false, currency = "NGN", country = "NG", txRef = "txref-" + Date.now(), amount, email, firstname, lastname, meta }) {
    var baseUrlMap = ["https://ravesandboxapi.flutterwave.com/", "https://api.ravepay.co/"]
    this.baseUrl = (production) ? baseUrlMap[1] : baseUrlMap[0];

    this.rave = new RaveApi(publicKey, secretKey, production);

    this.getPublicKey = function () {
      return publicKey;
    }
    this.getSecretKey = function () {
      return secretKey;
    }
    this.getCountry = function () {
      return country;
    }
    this.getCurrency = function () {
      return currency;
    }
    this.getTransactionReference = function () {
      return txRef;
    }
    this.getAmount = function () {
      return amount;
    }
    this.getEmail = function () {
      return email;
    }
    this.getFirstname = function () {
      return firstname;
    }
    this.getLastname = function () {
      return lastname;
    }


    this.charge = function (payload) {
      //insert constant data
      payload.PBFPubKey = this.getPublicKey();
      payload.currency = this.getCurrency();
      payload.country = this.getCountry();
      payload.txRef = this.getTransactionReference();
      payload.amount = this.getAmount();
      payload.email = this.getEmail();
      payload.firstname = this.getFirstname();
      payload.lastname = this.getLastname();
      payload.meta = meta;

      return new Promise((resolve, reject) => {
        let res = this.rave.Card.charge(payload, true).then((response) => {

          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      })
    }


    this.accountCharge = function (payload) {
      //insert constant data
      payload.PBFPubKey = this.getPublicKey();
      payload.currency = this.getCurrency();
      payload.country = this.getCountry();
      payload.txRef = this.getTransactionReference();
      payload.amount = this.getAmount();
      payload.email = this.getEmail();
      payload.firstname = this.getFirstname();
      payload.lastname = this.getLastname();
      payload.meta = meta;

      return new Promise((resolve, reject) => {
        let res = this.rave.Account.charge(payload, true).then((response) => {

          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      })
    }
  }

  initiatecharge(payload) {

    return new Promise((resolve, reject) => {
      this.charge(payload).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      })
    })
  }

  initiateAccountcharge(payload) {

    return new Promise((resolve, reject) => {
      this.accountCharge(payload).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      })
    })
  }

  pinCharge(payload) {
    payload.suggested_auth = "PIN";

    return new Promise((resolve, reject) => {
      this.charge(payload).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      })
    })
  }

  avsCharge(payload, suggested_auth) {
    payload.suggested_auth = suggested_auth;

    return new Promise((resolve, reject) => {
      this.charge(payload).then((response) => {
        resolve(response);
      }).catch((e) => {
        reject(e);
      })
    })
  }

  validateWithOTP({ transaction_reference, otp }) {
    return new Promise((resolve, reject) => {
      this.rave.Card.validate(otp, transaction_reference, true)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }

  validateWithBankOTP({ transaction_reference, otp }) {
    return new Promise((resolve, reject) => {
      this.rave.Account.validate(otp, transaction_reference, true)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    })
  }

  verifyTransaction(txRef) {
    return new Promise((resolve, reject) => {
      this.rave.Account.verify(txRef).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    })
  }


}
