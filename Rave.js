import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import HeaderContainer from './src/components/HeaderContainer';
import Card from './src/components/Card';
import Account from './src/components/Account';
import RavePayment from './library/RavePayment';


export default class Rave extends React.Component {
  constructor(props) {
    super(props);
    this.rave = new RavePayment({ publicKey: props.publickey, secretKey: props.secretkey, production: props.production, currency: props.currency, country: props.country, txRef: props.txref, amount: props.amount, email: props.email, firstname: props.firstname, lastname: props.lastname, meta: props.meta });
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
    let header = <View></View>;

    if (this.props.paymenttype == 'both') {
      header = <HeaderContainer page={this.getPage} />;
      if (this.state.page == "card") {
        page = <Card rave={this.rave} primarycolor={this.props.primarycolor} secondarycolor={this.props.secondarycolor} amount={this.props.amount} currency={this.props.currency} onSuccess={res => this.props.onSuccess(res)} onFailure={e => this.props.onFailure(e)} />;
      } else {
        page = <Account rave={this.rave} primarycolor={this.props.primarycolor} phone={this.props.phone} secondarycolor={this.props.secondarycolor} amount={this.props.amount} currency={this.props.currency} onSuccess={res => this.props.onSuccess(res)} onFailure={e => this.props.onFailure(e)} />;
      }
    } else if (this.props.paymenttype == 'account') {
      page = <Account rrave={this.rave} primarycolor={this.props.primarycolor} phone={this.props.phone} secondarycolor={this.props.secondarycolor} amount={this.props.amount} currency={this.props.currency} onSuccess={res => this.props.onSuccess(res)} onFailure={e => this.props.onFailure(e)} />;
    } else {
      page = <Card rave={this.rave} primarycolor={this.props.primarycolor} secondarycolor={this.props.secondarycolor} amount={this.props.amount} currency={this.props.currency} onSuccess={res => this.props.onSuccess(res)} onFailure={e => this.props.onFailure(e)} />;
    }

    

    return (
      <View style={styles.container}>
        {header}
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
  publickey: PropTypes.string.isRequired,
  secretkey: PropTypes.string.isRequired,
  txref: PropTypes.string,
  phone: PropTypes.string,
  primarycolor: PropTypes.string,
  secondarycolor: PropTypes.string, 
  paymenttype: PropTypes.string,
  production: PropTypes.bool,
  meta: PropTypes.array
}

let transactionReference = "txref-"+Date.now();

Rave.defaultProps = {
  country: "NG",
  currency: "NGN",
  txref: transactionReference,
  primarycolor: '#F5A623',
  secondarycolor: '#12122D',
  paymenttype: 'both',
  production: false,
  phone: null,
  meta: []
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center'
  }
});