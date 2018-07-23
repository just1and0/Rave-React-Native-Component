# Rave By Flutterwave React Native Component

> Implement Rave By Flutterwave easily with React Native

- Go to [Flutterwave Rave Live](https://rave.flutterwave.com/dashboard/settings/apis) to get your **`LIVE`** public and private key
- Go to [Flutterwave Rave Test](https://ravesandbox.flutterwave.com/dashboard/settings/apis) to get your **`TEST`** public and private key

## Installation

[Yarn](https://yarnpkg.com/lang/en/docs/install/) or [Node](http://hhvm.com)

You can pull in react-native-paystack via npm:

> npm install react-native-rave --save

### OR

> yarn add react-native-rave

## Usage

1.  import Rave Component

```javascript
import Rave from 'react-native-rave';
```

2. Use component with the props

```javascript
render() {
  return (
    <Rave amount="500" country="NG" currency="NGN" email="flamekeed@gmail.com" firstname="Oluwole" lastname="Adebiyi" publickey="FLWPUBK-8ba286388b24dbd6c20706def0b4ea23-X" secretkey="FLWSECK-c45e0f704619e673263844e584bba013-X" txref="cs3762jhj" paymenttype="card" meta={[{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]} production={false} onSuccess={res => this.onSuccess(res)} onFailure={e => this.onFailure(e)} />
  );
}
```

| props        | parameter           | type | required  |
| ------------- |:-------------:| -----:| -----:|
| publickey      |  This is the publickey gotten from your [Live](https://rave.flutterwave.com/dashboard/settings/apis) or [Test](https://ravesandbox.flutterwave.com/dashboard/settings/apis) dashboard | `String` | Required
| secretkey      |  This is the secretkey gotten from your [Live](https://rave.flutterwave.com/dashboard/settings/apis) or [Test]
| amount      |  This is the amount to be charged from card/account | `String` | Required
| email      |  This is the email of the customer | `String` | Required
| firstname      |  This is the firstname of the customer | `String` | Required
| lastname      |  This is the lastname of the customer | `String` | Required
| onSuccess      |  This is the function that receives data for a successful transaction | `Function` | Required
| onFailure      |  This is the function that receives data for a failed transaction | `Function` | Required
| country      |  This is the country you are transacting from eg. NG, GH, KE, ZA | `String` | Not Required (defaults to NG)
| currency      |  This is the currency you want to charge the customer eg. NGN, GHS, KES, ZAR | `String` | Not Required (defaults to NGN)
| txref      |  This is a unique reference for the transaction | `String` | Not Required (will be generated automatically)
| primarycolor      |  This is to override the primary colour of the component | `String` | Not Required
| secondarycolor      |  This is to override the secondary colour of the component | `String` | Not Required
| paymenttype      |  This is the payment type ['both','card', 'account'] | `String` | Not Required ('defaults to both')
| production      |   Set to `true` if you want your transactions to run in the production environment otherwise set to `false`. Defaults to false  | `Boolean` | Not Required ('defaults to false')
| meta      |  This is additional information that can be sent to the server eg [{ metaname: "color", metavalue: "red" }, { metaname: "storelocation", metavalue: "ikeja" }]  | `Boolean` | Not Required

3. 