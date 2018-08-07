import React from 'react'
import encryption from './encryption';
import Axios from 'axios';

export default class RavePayment {
  constructor({ publicKey, secretKey, production = false, currency = "NGN", country = "NG", txRef = "txref-" + Date.now(), amount, email, firstname, lastname }) {
    var baseUrlMap = ["https://ravesandboxapi.flutterwave.com/", "https://api.ravepay.co/"]
    this.baseUrl = (production) ? baseUrlMap[1] : baseUrlMap[0];

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
      payload.redirect_url = "https://ravenative.herokuapp.com/";
      

      return new Promise((resolve, reject) => {
        var client = encryption({ payload, secretkey: this.getSecretKey() });

        Axios({
          url: this.baseUrl + 'flwv3-pug/getpaidx/api/charge',
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          data: {
            PBFPubKey: this.getPublicKey(),
            client,
            alg: "3DES-24"
          },
        })
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            reject(error.response.data);
          });
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

  validate({ transaction_reference, otp }) {
    return new Promise((resolve, reject) => {
      Axios({
        url: this.baseUrl + 'flwv3-pug/getpaidx/api/validatecharge',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          PBFPubKey: this.getPublicKey(),
          transaction_reference,
          otp
        },
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  }

  validateAccount({ transactionreference, otp }) {
    return new Promise((resolve, reject) => {
      Axios({
        url: this.baseUrl + 'flwv3-pug/getpaidx/api/validate',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          PBFPubKey: this.getPublicKey(),
          transactionreference,
          otp
        },
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  }

  getCardFees({ amount, currency, card6 }) {
    return new Promise((resolve, reject) => {
      Axios({
        url: this.baseUrl + 'flwv3-pug/getpaidx/api/fee',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          PBFPubKey: this.getPublicKey(),
          amount,
          currency,
          card6
        },
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  }

  getAccountFees({ amount, currency }) {
    return new Promise((resolve, reject) => {
      Axios({
        url: this.baseUrl + 'flwv3-pug/getpaidx/api/fee',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          PBFPubKey: this.getPublicKey(),
          amount,
          currency,
          ptype: 2
        },
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  }

  verifyTransaction(txref) {
    return new Promise((resolve, reject) => {
      Axios({
        url: this.baseUrl + 'flwv3-pug/getpaidx/api/v2/verify',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          txref,
          SECKEY: this.getSecretKey()
        },
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  }

  listBanks() {
    return new Promise((resolve, reject) => {
      Axios({
        url: this.baseUrl + 'flwv3-pug/getpaidx/api/flwpbf-banks.js?json=1',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error.response.data);
        });
    })
  }


}