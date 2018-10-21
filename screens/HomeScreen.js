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
    Customer.findAll(this);
    console.log(this.state);
  }

  render() {
    return (
      <View style={Styles.root}>
        <FlatList style={Styles.container} contentContainerStyle={Styles.contentContainer}
          data={this.state.data}
          renderItem={({item}) => (
            <View style={Styles.itemContainer}>
              <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('Txns', {name: item.name})}
                  style={Styles.leftBox80}>
                <View style={Styles.occupy}>
                  <Text style={Styles.heading}>{item.name}</Text>
                  <Text style={Styles.subHeading}>{Strings.curr} {item.balance.toString()}</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={Styles.rightBox20}>
                <TouchableOpacity style={Styles.button}>
                  <Text style={Styles.symbol}> + </Text>
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
