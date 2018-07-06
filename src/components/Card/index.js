import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Pin from './Pin';


var valid = require('card-validator');



export default class index extends Component {
  constructor(props) {
    super(props);
    
    let cardnum = this.init_cc('5438898014560229');
    this.state = { cardno: '', cvv: '', status: "", cardnoErr: 'none', dateErr: 'none', cvvErr:'none', expirymonth: '', expiryyear: '', amount: '', firstname: 'Oluwole', lastname: 'Adebiyi', email: 'flamekeed@gmail.com', pin:"", pinModal: false };
    this.cc_format = this.cc_format.bind(this);
    this.confirmPin = this.confirmPin.bind(this);
    this.pay = this.pay.bind(this);
  }

  cc_format(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
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

  init_cc(value) {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      let newValue = parts.join(' ');
      return newValue
    } else {
      return value
    }
  }

  confirmPin() {
    this.setState({
      pinModal: false
    })
  }

  pay() {
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
    }
    // this.setState({
    //   pinModal: true
    // })
  }

  render() {
    let card = <Image source={require('../../assets/icons/cardnull.png')} />;

    var numberValidation = valid.number(this.state.cardno);

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

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Pin pinModal={this.state.pinModal} confirm={this.confirmPin} pin={this.state.pin} pinEdit={(pin) => this.setState({ pin })}/>
        <View style={{flex:1}}>
          {/* <View style={styles.formGroup}>
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
          </View> */}
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
            <Text style={{ color: '#EE312A', fontSize: 8, display: this.state.cardnoErr, fontWeight: 'bold', marginTop: 5}}>Enter a valid credit card number</Text>
          </View>
          <View style={styles.formGroup}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexGrow: 1, paddingRight: 10, maxWidth:150 }}>
                <Text style={styles.label}>Exp. Date</Text>
                <View style={styles.input}>
                  <View style={{ paddingVertical: 11.4, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                      autoCorrect={false}
                      ref="1"
                      keyboardType="numeric"
                      style={{ fontSize: 20, flexGrow: 2 }}
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
                    <Text style={{ fontSize: 20, flexGrow: 1 }}>/</Text>
                    <TextInput
                      autoCorrect={false}
                      ref="2"
                      keyboardType="numeric"
                      style={{ fontSize: 20, flexGrow: 2 }}
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

                <Text style={{ color: '#EE312A', fontSize: 8, display: this.state.dateErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid credit card number</Text>
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
                <Text style={{ color: '#EE312A', fontSize: 8, display: this.state.cvvErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid CVV</Text>
              </View>
            </View>
              
          </View>       
        </View>

        <TouchableOpacity onPress={this.pay} style={{ width: "100%", marginTop: 40 }}>
          <View style={{ backgroundColor: "#F5A623", paddingVertical: 15, borderRadius: 5 }}>
            <Text style={{ fontSize: 13, textAlign: "center", fontWeight: "bold" }}>PAY</Text>
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