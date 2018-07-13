import React, { Component } from 'react';
import { StyleSheet, Modal, WebView, Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { VBVComponent } from 'react-native-rave-networking';


export default class VBVSecure extends Component {
  constructor(props) {
    super(props);
    // this.
  }


  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.vbvModal}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <VBVComponent style={{marginTop: 80, padding: 50}} url={this.props.url} getMessageReturned={(err, message) => {
          if (err) {
            this.props.confirm(message);
          }
          else {
            this.props.confirm(message);
          }
        }} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  formGroup: {
    marginTop: 120
  },
  label: {
    color: "#ACACAC"
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#12122D"
  }
});