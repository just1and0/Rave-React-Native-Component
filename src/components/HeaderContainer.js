import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Header from './Header';

export default class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'card' };
    this.switchToCard = this.switchToCard.bind(this);
    this.switchToAccount = this.switchToAccount.bind(this);
  }

  switchToCard() {
    this.props.page("card");
    this.setState({
      page: "card"
    })
  }

  switchToAccount() {
    this.props.page("account");
    this.setState({
      page: "account"
    })
  }

  render() {
    return (
      <View>
        <Header />
        <View style={styles.container}>
          <View style={styles.nav}>
            <TouchableOpacity
              style={{
                width: '49.5%'}}
              onPress={this.switchToCard}>
              <Text style={{ fontSize: 18, paddingVertical: 15, color: "#12122D", fontWeight: (this.state.page == "card")? "bold":"normal"}}>Card</Text>
            </TouchableOpacity>
            <View style={{ width: '1%', marginVertical: 10, borderRightWidth: 1, borderRightColor: "#12122D" }}></View>
            <TouchableOpacity

              style={{
                width: '49.5%'
              }}
              onPress={this.switchToAccount}>
              <Text style={{ fontSize: 18, paddingVertical: 15, color: "#12122D", textAlign: 'right', fontWeight: (this.state.page == "account") ? "bold" : "normal" }}>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: -20
  },
  nav: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    flexDirection: 'row',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    width: '100%'
  }
});