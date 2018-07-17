import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Rave from './Rave';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = { page: 'card' };
    this.onPressLearnMore = this.onPressLearnMore.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onSuccess(data) {
    console.log("test");
    
    console.log(data);
  }

  onFailure(data) {
    console.log(data);
  }

  onPressLearnMore() {
    var payload = {
      "cardno": "5258585922666506",
      "cvv": "883",
      "expirymonth": "09",
      "expiryyear": "19",
      "amount": "1000",
      "email": "user@gmail.com",
      "phonenumber": "0902620185",
      "firstname": "temi",
      "lastname": "desola"
    }

    // Initiate the charge
      
      // Check for suggested auth
      if (res.data.suggested_auth) {
        //Check if suggested auth is pin
        if (res.data.suggested_auth.toUpperCase() === "PIN") {
          // Add pin 
          payload.pin = "3310";
          //charge  card
          rave.pinCharge(payload).then((response) => {

            //check if its pending validation
            if (response.data.chargeResponseCode === "02") {

              //validate with otp
              rave.validateWithOTP({ transaction_reference: response.data.flwRef, otp: 12345 }).then((res) => {                

                if (res.data.tx.status.toUpperCase() === "SUCCESSFUL") {
                  console.log(res.data.tx.status);
                } else {

                  console.log('why',res);
                  
                }
              }).catch((e) => {
                console.log(e);
              })
            } else if (response.data.status.toUpperCase() === "SUCCESSFUL") {
              console.log(response.data.status);
              
            }
            else {
              console.log(response.data);

            }
          }).catch((e) => {
            console.log(e);
          })
        } else if (res.data.suggested_auth.toUpperCase() === "NOAUTH_INTERNATIONAL" || res.data.suggested_auth.toUpperCase() === "AVS_VBVSECURECODE" ) {
          // Add no auth details 
          payload.billingzip = "07205";
          payload.billingcity = "Hillside";
          payload.billingaddress = "470 Mundet PI";
          payload.billingstate = "NJ";
          payload.billingcountry = "US";

          rave.avsCharge(payload, res.data.suggested_auth).then((response) => {

            if (response.data.chargeResponseCode === "02") {
              if (response.data.authModelUsed.toUpperCase() === "VBVSECURECODE") {
                console.log(response.data.authurl);
              }
            }
            
          }).catch((e) => {
            console.log(e);
          })

        } else {
          console.log(res);

        }
      } else {
        if (res.data.status.toUpperCase() === "SUCCESSFUL") {
          console.log("SUCCESSFUL");
        } else if (res.data.chargeResponseCode === "02") {

          if (res.data.authModelUsed.toUpperCase() === "ACCESS_OTP" || res.data.authModelUsed.toUpperCase() === "GTB_OTP") {
            //validate with otp
            rave.validateWithOTP({ transaction_reference: res.data.flwRef, otp: 12345 }).then((res) => {

              if (res.data.tx.status.toUpperCase() === "SUCCESSFUL") {
                console.log(res.data.tx.status);
              } else {

                console.log('why', res);

              }
            }).catch((e) => {
              console.log(e);
            })
          } else if (res.data.authModelUsed.toUpperCase() === "PIN") {

            // Add pin 
            payload.pin = "3310";
            console.log(res);

            //charge  card
            rave.pinCharge(payload).then((response) => {

              console.log(response);


              if (response.data.authurl.toUpperCase() !== "N/A") {
                console.log("auth url");
              }

              //check if its pending validation
              if (response.data.chargeResponseCode === "02") {
                console.log(response);


                //validate with otp
                rave.validateWithOTP({ transaction_reference: response.data.flwRef, otp: 12345 }).then((res) => {

                  if (res.data.tx.status.toUpperCase() === "SUCCESSFUL") {
                    console.log(res.data.tx.status);
                  } else {

                    console.log('why', res);

                  }
                }).catch((e) => {
                  console.log(e);
                })
              } else if (response.data.status.toUpperCase() === "SUCCESSFUL") {
                console.log(response.data);

              }
              else {
                console.log(response.data);

              }
            }).catch((e) => {
              console.log(e);
            })
          } else if (res.data.authModelUsed.toUpperCase() === "VBVSECURECODE" ) {
            // Add no auth details 
            console.log(res.data.authurl);
          }
        } else {

        }
      }
      
    
    
  }

  render() {
    return (
      // <View>
      //   <Button
      //     onPress={this.onPressLearnMore}
      //     title="Learn More"
      //     color="#841584"
      //     accessibilityLabel="Learn more about this purple button"
      //   />
      // </View>

      <Rave amount="500" country="NG" currency="NGN" email="flamekeed@gmail.com" firstname="Oluwole" lastname="Adebiyi" narration="My Test Transaction" publickey="FLWPUBK-8ba286388b24dbd6c20706def0b4ea23-X" secretkey="FLWSECK-c45e0f704619e673263844e584bba013-X" txref="cs3762jhj" paymenttype="both" meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]} production={false} onSuccess={res => this.onSuccess(res)} onFailure={e => this.onFailure(e)}  />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
