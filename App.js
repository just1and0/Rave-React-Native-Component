import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Rave from './Rave';

export default class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = { page: 'card' };
    // this.onPressLearnMore = this.onPressLearnMore.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onSuccess(data) {    
    console.log("success", data);
  }

  onFailure(data) {
    console.log("error", data);
  }

  render() {
    return (
      <Rave amount="500" country="NG" currency="NGN" email="flamekeed@gmail.com" firstname="Oluwole" lastname="Adebiyi" publickey="FLWPUBK-8ba286388b24dbd6c20706def0b4ea23-X" secretkey="FLWSECK-c45e0f704619e673263844e584bba013-X" txref="cs3762jhj" paymenttype="both" meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]} production={false} onSuccess={res => this.onSuccess(res)} onFailure={e => this.onFailure(e)}  />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
