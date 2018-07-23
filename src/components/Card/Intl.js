import React, { Component } from 'react';
import { ScrollView, StyleSheet, Modal, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class IntlModal extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', city: '', state: '', zipcode: '', country: '', addressErr: 'none', cityErr: 'none', stateErr: 'none', zipcodeErr: 'none', countryErr: 'none' };
    this.submit = this.submit.bind(this)
  }


  check() {
    this.setState({
      addressErr: 'none', cityErr: 'none', stateErr: 'none', zipcodeErr: 'none', countryErr: 'none'
    })
    if (this.state.address.length < 1 || this.state.city.length < 1 || this.state.state.length < 1 || this.state.zipcode.length < 1 || this.state.country.length < 1) {

      if (this.state.address.length < 1) {
        this.setState({
          addressErr: 'flex'
        })
      }

      if (this.state.city.length < 1) {
        this.setState({
          cityErr: 'flex'
        })
      }

      if (this.state.state.length < 1) {
        this.setState({
          stateErr: 'flex'
        })
      }

      if (this.state.zipcode.length < 1) {
        this.setState({
          zipcodeErr: 'flex'
        })
      }

      if (this.state.country.length < 1) {
        this.setState({
          countryErr: 'flex'
        })
      }
      return false
    } else {
      return true


    }
  }

  submit() {
    if (this.check()) {
      this.props.confirm({
        address: this.state.address,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        country: this.state.country
      })
    }
  }


  render() {
    const styles = StyleSheet.create({
      formGroup: {
        marginTop: 20
      },
      label: {
        color: "#ACACAC"
      },
      input: {
        borderBottomWidth: 2,
        borderBottomColor: this.props.secondarycolor
      }
    });
    
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.intlModal}
        onRequestClose={() => console.log()}>
        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
          <KeyboardAwareScrollView enableAutomaticScroll={true} extraHeight={180} style={{ backgroundColor: "white", width: "100%", paddingVertical: 60, paddingHorizontal: 30 }}>
          
            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 17 }}>Enter your billing details address</Text>


            <View style={styles.formGroup}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    placeholder="Address eg 20 Saltlake Eldorado"
                    style={{ fontSize: 13, paddingHorizontal: 10, width: '100%' }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(address) => this.setState({ address })}
                    value={this.state.address}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.addressErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid address</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>City</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    placeholder="City eg Livingstone"
                    style={{ fontSize: 13, paddingHorizontal: 10, width: '100%' }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(city) => this.setState({ city })}
                    value={this.state.city}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.cityErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid city</Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>State</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    placeholder="State eg CA"
                    style={{ fontSize: 13, paddingHorizontal: 10, width: '100%' }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(state) => this.setState({ state })}
                    value={this.state.state}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.stateErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid state</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Zip Code</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    placeholder="Zip Code eg 928302"
                    style={{ fontSize: 13, paddingHorizontal: 10, width: '100%' }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(zipcode) => this.setState({ zipcode })}
                    value={this.state.zipcode}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.zipcodeErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid zip code</Text>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Country</Text>
              <View style={styles.input}>
                <View style={{ paddingVertical: 10, flexDirection: 'row' }}>
                  <TextInput
                    placeholder="Country eg US"
                    style={{ fontSize: 13, paddingHorizontal: 10, width: '100%' }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    onChangeText={(country) => this.setState({ country })}
                    value={this.state.country}
                  />
                </View>
              </View>
              <Text style={{ color: '#EE312A', fontSize: 10, display: this.state.countryErr, fontWeight: 'bold', marginTop: 5 }}>Enter a valid country</Text>
            </View>


            <TouchableOpacity onPress={this.submit} style={{ width: "100%", marginTop: 30 }}>
              <View style={{ backgroundColor: this.props.primarycolor, paddingVertical: 15, borderRadius: 5 }}>
                <Text style={{ fontSize: 13, textAlign: "center", fontWeight: "bold" }}>ENTER</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </ScrollView>
      </Modal>
    );
  }
}

