import React from 'react';
import {
  View,
  TextInput, 
  Button,
  Alert,
  ToastAndroid,
} from 'react-native';
import DatePicker from 'react-native-datepicker'

import Styles from '../constants/Stylesheet';
import Customer from '../database/Customer';
import Txn from '../database/Txn';

export default class AddNewScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Entry',
  };

  constructor(props) {
    super(props);
    this.today = this.getDate();
    this.state = this.extractState({});
    this.addNewEntry = this.addNewEntry.bind(this);
    Customer.init();
    Txn.init();
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.setState(this.extractState(this.props.navigation.getParam('customer')));
    });
  }

  resetState() {
    this.setState(this.extractState({}));
  }

  extractState(defaultState) {
    defaultState = defaultState ? defaultState : {};
    return {
      custName: defaultState.custName ? defaultState.custName : '',
      contact: defaultState.contact ? defaultState.contact : '',
      amount: defaultState.amount ? defaultState.amount : '',
      date: defaultState.date ? defaultState.date : this.today,
      note: defaultState.note ? defaultState.note : '',
      custId: defaultState.custId ? defaultState.custId : null,
    }
  }

  getDate() {
    let today = new Date();  // UTC
    today = new Date(today.getTime() - today.getTimezoneOffset());
    return `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
  }

  addNewEntry() {
    if (!this.state.custId) {
      Alert.alert(
        'Add New',
        'A new customer entry will be made as prefilled name field is not used!',
        [
          {text: 'Cancel', onPress: null},
          {text: 'OK', onPress: () => {
            Customer.insert(this.state).then((res) => {
              this.setState({custId: res.insertId});
              Txn.insert(this.state).then(
                (res) => ToastAndroid.show('Successfully inserted!', ToastAndroid.SHORT), 
                (err) => console.log(err)
              ).then(() => this.resetState());
            });
          }},
        ]
        );
      } else {
        Txn.insert(this.state).then(
          (res) => {
            ToastAndroid.show('Successfully inserted!', ToastAndroid.SHORT);
            Customer.updateBalance(this.state.custId, this.state.amount);
          },
          (err) => console.log(err)
        ).then(() => this.resetState());
    }
  }

  render() {
    return (
      <View style={Styles.itemContainerVertical}>
        <View>
          <TextInput placeholder='Customer Name'
            onChangeText={(text) => this.setState({custName: text})} 
            value={this.state.custName} style={Styles.textInput} />
          <TextInput placeholder='Contact (Optional)' 
            onChangeText={(text) => this.setState({contact: text})} 
            value={this.state.contact} style={Styles.textInput} keyboardType='numeric' />
        </View>
        <View style={Styles.row}>
          <TextInput placeholder='Amount' style={[Styles.midBox50, Styles.textInput]} 
            onChangeText={(text) => this.setState({amount: text})} 
            value={this.state.amount} keyboardType='numeric' />
          <DatePicker placeholder='Date' style={Styles.midBox50} 
            onDateChange={(text) => this.setState({date: text})}
            date={this.state.date} format='DD-MM-YYYY' />
        </View>
        <View style={Styles.column}>
          <TextInput placeholder='Note (Optional)' 
            onChangeText={(text) => this.setState({note: text})} 
            value={this.state.note} style={Styles.textInput} />
          <Button style={Styles.fullButton} title='Submit' onPress={this.addNewEntry} />
        </View>
      </View>
    );
  }
}
