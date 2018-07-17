import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import HeaderContainer from './src/components/HeaderContainer';
import Card from './src/components/Card';
import RavePayment from './library/RavePayment';


export default class Rave extends React.Component {
  constructor(props) {
    super(props);
    this.rave = new RavePayment({ publicKey: props.publickey, secretKey: props.secretkey, production: props.production, currency: props.currency, country: props.country, txRef: props.txref, amount: props.amount, email: props.email, firstname: props.firstname, lastname: props.lastname });
    this.state = { page: 'card' };
    this.getPage = this.getPage.bind(this);
  }

  getPage(data) {
    this.setState({
      page: data
    })
  }

  render() {
    let page;

    if (this.state.page == "card") {
      page = <Card rave={this.rave} onSuccess={res => this.props.onSuccess(res)} onFailure={e => this.props.onFailure(e)} />;
    }

    return (
      <View style={styles.container}>
        <HeaderContainer page={this.getPage} />
        {page}
      </View>
    )
  }
}

Rave.propTypes = {
  amount: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  country: PropTypes.string,
  currency: PropTypes.string,
  email: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  narration: PropTypes.string,
  publickey: PropTypes.string.isRequired,
  secretkey: PropTypes.string.isRequired,
  txref: PropTypes.string,
  primarycolor: PropTypes.string,
  secondarycolor: PropTypes.string, 
  paymenttype: PropTypes.string,
  production: PropTypes.bool
}

let transactionReference = "txref-"+Date.now();

Rave.defaultProps = {
  country: "NG",
  currency: "NGN",
  txref: transactionReference,
  primarycolor: '#F5A623',
  secondarycolor: '#12122D',
  paymenttype: 'both',
  production: false
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});
Rave