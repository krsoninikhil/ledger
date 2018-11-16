import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Styles from '../constants/Stylesheet';
import Strings from '../constants/Strings';
import Txn from '../database/Txn';
import Customer from '../database/Customer';
import StatItem from '../components/StatItem';
import ExportBackup from '../components/ExportBackup';


export default class StatsScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
  };

  constructor(props) {
    super(props);
    this.state = {totalBalance: 0, customerCount: 0, txnCount: 0};
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', () => {
      let stats = {};
      Customer.getBalance()
        .then(({_array}) => stats.totalBalance = _array[0].totalBalance ?  _array[0].totalBalance : 0)

        .then(() => Customer.count())
        .then(({_array}) => stats.customerCount = _array[0].count)
        
        .then(() => Txn.count())
        .then(({_array}) => stats.txnCount = _array[0].count)
        
        .then(() => this.setState(stats));
    });
  }

  render() {
    return (
      <ScrollView>
        <StatItem text='Total Outstanding Balance' value={`${Strings.curr} ${this.state.totalBalance}`} />
        <StatItem text='Total No. of Customers' value={this.state.customerCount} />
        <StatItem text='Total No. of Transactions' value={this.state.txnCount} />
        <ExportBackup />
      </ScrollView>
    );
  }
}
