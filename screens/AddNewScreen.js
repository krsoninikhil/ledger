import React from 'react';
import {
  View,
  TextInput, 
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import DatePicker from 'react-native-datepicker'

import Styles from '../constants/Stylesheet';
import Customer from '../database/Customer';
import Txn from '../database/Txn';
import SuggestionBox from '../components/SuggestionBox';

export default class AddNewScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Entry',
  };

  constructor(props) {
    super(props);
    this.today = this.getDate();
    this.state = this.extractState({});
    this.addNewEntry = this.addNewEntry.bind(this);
    this.resetState = this.resetState.bind(this);
    Customer.init();
    Txn.init();
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.setState(this.extractState(this.props.navigation.getParam('customer')));
      if (this.props.navigation.getParam('customer')) {
        setTimeout(() => this.refs.amount.focus(), 500);  // without timeout, keyboard doesn't appear
      }
    });
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
      suggestions: defaultState.suggestions ? defaultState.suggestions : [],
      newEntry: defaultState.custId ? false : true,
    }
  }

  resetState() {
    this.setState(this.extractState());
    this.props.navigation ? this.props.navigation.customer = {} : null;
    this.refs.custName.focus();

  }

  getDate() {
    let today = new Date();  // UTC
    today = new Date(today.getTime() - today.getTimezoneOffset());
    return `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;
  }

  addNewEntry() {
    if (!this.state.custName || !this.state.amount || !this.state.date) {
      Alert.alert('Invalid Details', 'Name, Amount and Date are required!');
      return;
    }
    if (!this.state.custId) {
      Alert.alert(
        'Add New',
        'A new customer entry will be made as prefilled name field is not used!',
        [
          {text: 'Cancel', onPress: null},
          {text: 'OK', onPress: () => {
            Customer.insert(this.state).then((res) => {
              this.setState({custId: res.insertId});
              Txn.insert(this.state);
            }).then(
              (res) => ToastAndroid.show('Successfully inserted!', ToastAndroid.SHORT), 
              (err) => console.log(err)
            ).then(() => this.resetState());
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

  update(key) {
    return (text) => this.setState({[key]: text});
  }

  updateAndSuggest(key) {
    return (text) => {
      this.update(key)(text);
      Customer.search(text).then(({_array}) => {this.setState({suggestions: _array})});
    }
  }

  render() {
    return (
      <View style={Styles.itemContainerVertical}>
        <SuggestionBox suggestions={this.state.suggestions} parent={this} />
        <View style={Styles.deep}>
          <TextInput placeholder='Customer Name' editable={this.state.newEntry} ref='custName'
            onChangeText={this.updateAndSuggest('custName')} 
            value={this.state.custName} style={Styles.textInput} />
          <TextInput placeholder='Contact (Optional)' editable={this.state.newEntry} 
            onChangeText={this.update('contact')} 
            value={this.state.contact} style={Styles.textInput} keyboardType='numeric' />
        </View>
        <View style={Styles.row}>
          <TextInput placeholder='Amount' style={[Styles.midBox50, Styles.textInput]} 
            onChangeText={this.update('amount')} ref='amount' 
            value={this.state.amount} keyboardType='numeric' />
          <DatePicker placeholder='Date' style={Styles.midBox50} 
            onDateChange={this.update('date')}
            date={this.state.date} format='DD-MM-YYYY' />
        </View>
        <View>
          <TextInput placeholder='Note (Optional)' 
            onChangeText={this.update('note')} 
            value={this.state.note} style={Styles.textInput} />
        </View>
        <View style={Styles.row}>
          <TouchableOpacity onPress={this.resetState} 
              style={[Styles.fullButton, {backgroundColor: 'grey'}]} >
            <Text style={Styles.btnText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.fullButton} onPress={this.addNewEntry}>
            <Text style={Styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
