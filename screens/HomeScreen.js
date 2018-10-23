import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import Styles from '../constants/Stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import Strings from '../constants/Strings';
import Customer from '../database/Customer';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Ledger",
  };

  constructor(props) {
    super(props);
    this.state = {data: []};
  }
  
  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      Customer.findAll().then(
        (rows) => this.setState({data: rows._array})
      );
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

  render() {
    return (
      <View style={Styles.root}>
        <FlatList style={Styles.container} contentContainerStyle={Styles.contentContainer}
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
                  <Text style={Styles.heading}>{item.name}</Text>
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
