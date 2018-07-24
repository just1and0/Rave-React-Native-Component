import React, { Component } from 'react';
import { StyleSheet, Modal, WebView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class VBVSecure extends Component {
  constructor(props) {
    super(props);
    this.numberOfPageLoads = 0;
    this.maxPageLoads = this.props.maxPageLoads || 3;
  }


  render() {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={this.props.vbvModal}
        onRequestClose={() => console.log()}>

        <WebView
          source={{uri: this.props.url}}
          scalesPageToFit={false}
          style={{marginTop: 80, padding: 50}}
          javaScriptEnabled={true}
          injectedJavaScript={"window.postMessage(document.getElementsByTagName('BODY')[0].innerHTML)"}
          onMessage={(message) => {
            let returnedMessage = message.nativeEvent.data;
              // Attempt to parse a json
              try {
                let returnedJson = JSON.parse(returnedMessage);
                // first parameter indicates whether there was an error
                this.props.confirm(false, returnedJson);
              } catch (e) {
                // If the response is not json (note, the homepage is not json so we have to allow multiple attempts at parsing)
                // Allow max 3 page loads (default), if we still can't get a json, we return an error
                if (this.numberOfPageLoads >= this.maxPageLoads) {
                  this.props.confirm(true, returnedMessage)
                  this.props.confirm(true, returnedMessage);
                }

                this.numberOfPageLoads += 1;
              }

            }
          }
        />
      </Modal>
    );
  }
}
