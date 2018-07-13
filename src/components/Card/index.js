import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, TextInput, Modal, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
//Scrollable view Library
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Import the Pin Modal
import Pin from './Pin';

//Import the OTP modal
import Otp from './Otp';

// Import Tofunmi's Library
import RaveApi from 'react-native-rave-networking';
import VBVSecure from './vbvSecure';



// import AuthURL from './AuthURL';


var valid = require('card-validator');


rave = new RaveApi("FLWPUBK-8ba286388b24dbd6c20706def0b4ea23-X", "FLWSECK-c45e0f704619e673263844e584bba013-X", production = false);

export default class index extends Component {
  constructor(props) {
    super(props);
    
    this.state = { cardno: '', cvv: '', status: "", vbvModal: false, vbvurl: '', cardnoErr: 'none', dateErr: 'none', cvvErr: 'none', expirymonth: '', expiryyear: '', amount: '500', firstname: 'Oluwole', lastname: 'Adebiyi', email: 'flamekeed@gmail.com', pin: "", pinModal: false, otp: "", flwRef: "", otpModal: false, loading: false, otp: "12345"};

    this.cc_format = this.cc_format.bind(this);
    this.confirmPin = this.confirmPin.bind(this);
    this.confirmOtp = this.confirmOtp.bind(this);
    this.pay = this.pay.bind(this); 
    this.check = this.check.bind(this);
    this.confirmVBV = this.confirmVBV.bind(this);
  }

  // Makes the card input appear in 4-digit interval apart from VERVE cards eg 4242 4242 4242 4242 instead of 4242424242424242
  cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    if (value.replace(/\s/g, "").replace(/[^0-9]/gi, '').length > 16) {
      this.setState({
        cardno: value.replace(/\s/g, "").replace(/[^0-9]/gi, '')
      })
    } else {
      for (i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4))
      }
      if (parts.length) {
        let newValue = parts.join(' ');
        
        this.setState({
          cardno: newValue
        })
      } else {
        this.setState({
          cardno: value
        })
      }
    }
    
  }

  //This closes the pin modal and adds the pin to the payload
  confirmPin() {
    this.setState({
      pinModal: false
    })

    rave.Card.charge({
      "cardno": this.state.cardno.replace(/\s/g, ""),
      "cvv": this.state.cvv,
      "expirymonth": this.state.expirymonth,
      "expiryyear": this.state.expiryyear,
      "amount": this.state.amount,
      "email": this.state.email,
      "firstname": "Oluwole",
      "lastname": "Adebiyi",
      "pin": this.state.pin,
      "suggested_auth": "PIN"
    })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          flwRef: res.flwRef
        })

        console.log(res);
        
        this.setState({
          otpModal: true,
          loading: true
        })
        
        // if (res.status == "success") {
        //   console.log(res);
          
        //   if (res.validationComplete == false) {
        //     if (res.authSuggested == "PIN") {
        //       this.setState({
        //         loading: true,
        //         pinModal: true
        //       })
        //     }
        //     // this.setState({
        //     //   loading: true,
        //     //   otpModal: true
        //     // })
        //   } else {
        //     console.log(res);

        //   }
        // }

      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false
        })
      })
  }

  //This closes the otp modal and makes the otp validate
  confirmOtp() {
    this.setState({
      otpModal: false
    })

    rave.Card.validate(this.state.otp, this.state.flwRef)
      .then((res) => {
        console.log(res);
        
        if (res.status == "success" && res.validationComplete == true) {
          this.setState({
            loading: false
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  //This closes the vbv modal and makes validation
  confirmVBV(data) {
    this.setState({
      vbvModal: false
    })

    console.log(data);
    
  }

  // Performs a check on the card form
  check() {
    this.setState({
      cardnoErr: 'none', dateErr: 'none', cvvErr: 'none'
    })
    if (this.state.cardno.replace(/\s/g, "").length < 13 || this.state.cvv.length < 3 || this.state.expirymonth.length < 2 || this.state.expiryyear.length < 2) {

      if (this.state.cardno.replace(/\s/g, "").length < 13) {
        this.setState({
          cardnoErr: 'flex'
        })
      }

      if (this.state.expirymonth.length < 2 || this.state.expiryyear.length < 2) {
        this.setState({
          dateErr: 'flex'
        })
      }
      if (this.state.cvv.length < 3) {
        this.setState({
          cvvErr: 'flex'
        })
      }
      return false
    } else {
      return true
      

    }
  }

  // Sends payload to Flutterwave
  charge() {
    this.setState({
      loading: true
    })
    rave.Card.charge({
      "cardno": this.state.cardno.replace(/\s/g, ""),
      "cvv": this.state.cvv,
      "expirymonth": this.state.expirymonth,
      "expiryyear": this.state.expiryyear,
      "amount": this.state.amount,
      "email": this.state.email,
      "firstname": "Oluwole",
      "lastname": "Adebiyi"
    })
      .then((res) => {
        console.log(res);
        this.setState({
          loading: false,
          flwRef: res.flwRef
        })

        if (!res.validationComplete) {
          if (res.authSuggested == "PIN") {
            this.setState({
              loading: true,
              pinModal: true
            })
          }

          if (res.authUrl) {
            // display the vbv modal
            console.log("I'm here");
            
            this.setState({ vbvModal: true, vbvurl: res.authUrl });
          }

          // this.setState({
          //   loading: true,
          //   otpModal: true
          // })
        } else {
          console.log(res);
          
        }
        
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          loading: false
        })
      })
    
  }


  // The Pay button handler
  pay() {
    if(this.check()) {
      Alert.alert(
        '',
        'You will be charged a total of '+this.state.amount+'NGN. Do you want to continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes', onPress: () => this.charge()
          },
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    let card = <Image source={require('../../assets/icons/cardnull.png')} />;

    var numberValidation = valid.number(this.state.cardno);

    let btnText = <Text style={{ fontSize: 13, textAlign: "center", fontWeight: "bold", color:"#12122D" }}>PAY</Text>;

    if (!numberValidation.isPotentiallyValid) {
      card = <Image source={require('../../assets/icons/cardnull.png')} />;
    }

    if (numberValidation.card) {
      
      if (numberValidation.card.type == "visa") {
        card = <Image source={require('../../assets/icons/cardvisa.png')} />;
      } else if (numberValidation.card.type == "mastercard") {
        card = <Image source={require('../../assets/icons/cardmaster.png')} />;
      } else if (numberValidation.card.type == "maestro" || numberValidation.card.type == "discover") {
        card = <Image source={require('../../assets/icons/cardverve.png')} />;
      }
    } else {
      card = <Image source={require('../../assets/icons/cardnull.png')} />;
    }

    if (this.state.loading) {

      btnText = <ActivityIndicator size="small" color="#12122D" />
        
    }

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Pin pinModal={this.state.pinModal} confirm={this.confirmPin} pin={this.state.pin} pinEdit={(pin) => this.setState({ pin })} />
        <Otp otpModal={this.state.otpModal} confirm={this.confirmOtp} otp={this.state.otp} otpEdit={(otp) => this.setState({ otp })} />
        <VBVSecure vbvModal={this.state.vbvModal} url={this.state.vbvurl} confirm={this.confirmVBV} />
        <View style={{flex:1}}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="numeric"
                underlineColorAndroid='rgba(0,0,0,0)'
                style={{ height: 40, width: '100%', fontSize: 20 }}
                onChangeText={(amount) => this.setState({ amount })}
                value={this.state.amount}
              />
            </View>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Card Number</Text>
            <View style={styles.input}>
              <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                <View style={{ paddingTop: 6 }}>
                  {card}
                </View>
                <View>
                  <TextInput
                    autoCorrect={false}
                    keyboardType="numeric"
                    style={{ fontSize: 20, paddingHorizontal: 10, minWidth:"95%"}}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(cardno) => this.cc_format( cardno )}
                    value={this.state.cardno}
                  />
                </View>
              </View>
            </View>
            <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.cardnoErr, fontWeight: 'bold', marginTop: 5}}>Enter a valid credit card number</Text>
          </View>
          <View style={styles.formGroup}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexGrow: 1, paddingRight: 10, maxWidth:150 }}>
                <Text style={styles.label}>Exp. Date</Text>
                <View style={styles.input}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                      autoCorrect={false}
                      ref="1"
                      keyboardType="numeric"
                      style={{ fontSize: 20, flexGrow: 2, height: 45 }}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="MM"
                      maxLength={2}
                      onChangeText={(expirymonth) => {
                        let status = 1;
                        if (expirymonth == 2) {
                          this.setState({ expirymonth: "02" });
                          status = 2;
                        }
                        else if (expirymonth == 3) {
                          this.setState({ expirymonth: "03" })
                          status = 2;
                        }
                        else if (expirymonth == 4) {
                          this.setState({ expirymonth: "04" })
                          status = 2;
                        }
                        else if (expirymonth == 5) {
                          this.setState({ expirymonth: "05" })
                          status = 2;
                        }
                        else if (expirymonth == 6) {
                          this.setState({ expirymonth: "06" })
                          status = 2;
                        }
                        else if (expirymonth == 7) {
                          this.setState({ expirymonth: "07" })
                          status = 2;
                        }
                        else if (expirymonth == 8) {
                          this.setState({ expirymonth: "08" })
                          status = 2;
                        }
                        else if (expirymonth == 9) {
                          this.setState({ expirymonth: "09" })
                          status = 2;
                        }
                        else if (expirymonth > 12) {
                          this.setState({ expirymonth: "12" })
                          status = 2;
                        } else {
                          if (expirymonth.length >= 2) {
                            status = 2;
                          }
                          this.setState({ expirymonth })
                        }

                        if (status >= 2) {
                          this.refs[2].focus();
                        }
                      }}
                      value={this.state.expirymonth}
                    />
                    <Text style={{ fontSize: 20, paddingTop:7, flexGrow: 1 }}>/</Text>
                    <TextInput
                      autoCorrect={false}
                      ref="2"
                      keyboardType="numeric"
                      style={{ fontSize: 20, flexGrow: 2, height: 45 }}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="YY"
                      maxLength={2}
                      onChangeText={(expiryyear) => {
                        this.setState({ expiryyear })

                        if (this.state.expirymonth.length < 2) {
                          this.refs[1].focus();
                        } else {
                          if (expiryyear.length >= 2) {
                            this.refs[3].focus();
                          }
                        }

                        
                      }}
                      value={this.state.expiryyear}
                    />
                  </View>
                </View>

                <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.dateErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid expiry date</Text>
              </View>
              <View style={{ flexGrow: 1, paddingLeft: 10, maxWidth: 150  }}>
                <Text style={styles.label}>CVV/CVV2</Text>
                <View style={styles.input}>
                  <TextInput
                    ref="3"
                    autoCorrect={false}
                    keyboardType="numeric"
                    maxLength={4}
                    // secureTextEntry={true}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={{ height: 45, width: '100%', fontSize: 20 }}
                    onChangeText={(cvv) => this.setState({ cvv })}
                    value={this.state.cvv}
                  />
                </View>
                <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.cvvErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid CVV</Text>
              </View>
            </View>
              
          </View>       
        </View>

        <TouchableOpacity onPress={this.pay} style={{ width: "100%", marginTop: 25 }} disabled={(this.state.loading == false)? false : true}>
          <View style={{ backgroundColor: "#F5A623", paddingVertical: 15, borderRadius: 5, opacity:(this.state.loading == false) ? 1 : 0.6 }}>
            {btnText}
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 30,
    paddingBottom: 50,
    height: '100%'
  },
  label: {
    color: "#ACACAC"
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12122D"
  },
  formGroup: {
    marginBottom: 20
  }
});