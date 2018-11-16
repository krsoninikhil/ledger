import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  TextInput,
} from 'react-native';
import Styles from '../constants/Stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import Strings from '../constants/Strings';
import Customer from '../database/Customer';
import Txn from '../database/Txn';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Ledger",
  };

  constructor(props) {
    super(props);
    this.state = {data: [], searchKey: ''};
    Customer.init();
    Txn.init();
  }
  
  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.getCustomers(this.state.searchKey);
    });
  }
    
  goToAddNewTxn(item) {
    return () => {
      this.props.navigation.navigate('AddNew', {customer: {
        custName: item.name, 
        contact: item.contact, 
        custId: item.id
      }});
    }
  }

  getCustomers(searchKey) {
    (searchKey ? Customer.search(searchKey) : Customer.findAll()).then(
      ({_array}) => this.setState({data: _array})
    );
  }

  search() {
    return (text) => {
      this.setState({searchKey: text});
      this.getCustomers(text);
    }
  }

  render() {
    if (!this.state.data.length) {
      return (
        <Text style={Styles.textCenter}>Click on 'Add New' tab to record your first transaction entry.</Text>
      )
    }
    return (
      <View>
        <TextInput 
          style={Styles.textInput} 
          value={this.state.searchKey} 
          onChangeText={this.search()}
          placeholder='Search'
        />
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <View style={Styles.itemContainer}>
              <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate(
                    'Txns', 
                    {custName: item.name, custId: item.id}
                  )}
                  style={Styles.leftBox80}>
                <View style={Styles.occupy}>
                  <Text style={Styles.heading2}>{item.name}</Text>
                  <Text style={Styles.subHeading}>{Strings.curr} {item.balance.toString()}</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={Styles.rightBox20}>
                <TouchableOpacity style={Styles.button}>
                  <Text style={Styles.symbol} onPress={this.goToAddNewTxn(item)}> + </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

}
