import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Styles from '../constants/Stylesheet';
import Strings from '../constants/Strings';

class StatItem extends React.Component {
  render() {
    return (
      <View style={Styles.itemContainer}>
        <View style={Styles.leftBox60}>
          <Text style={Styles.heading}>{this.props.text} </Text>
        </View>
        <View style={Styles.rightBox40}>
          <Text style={Styles.heading}>{this.props.value} </Text>
        </View>
      </View>
    );
  }
}

export default class StatsScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
  };

  getBalance() {
    return 100;
  }

  countCustomers() {
    return 3;
  }

  countTxns() {
    return 120;
  }



  render() {
    return (
      <ScrollView>
        <StatItem text='Total Outstanding Balance' value={`${Strings.curr} ${this.getBalance()}`} />
        <StatItem text='Total No. of Customers' value={this.countCustomers()} />
        <StatItem text='Total No. of Transactions' value={this.countTxns()} />
      </ScrollView>
    );
  }
}
