import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderContainer from '../components/HeaderContainer';
import Card from '../components/Card';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 'card' };
    this.getPage = this.getPage.bind(this);
  }

  getPage(data){
    this.setState({
      page:data
    })
  }

  render() {
    let page;

    if (this.state.page == "card") {
      page = <Card />;
    } 

    return (
      <View style={styles.container}>
        <HeaderContainer page={this.getPage}/>
        {page}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});