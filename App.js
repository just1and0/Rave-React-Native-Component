import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './src/screens/Main';

export default class App extends React.Component {


  render() {
    return (
      <View style={styles.container}>
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
