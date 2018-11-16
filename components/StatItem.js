import React from 'react';
import { View, Text } from 'react-native';

import Styles from '../constants/Stylesheet';

export default class StatItem extends React.Component {
    render() {
      return (
        <View style={[Styles.itemContainer, {height: 50}]}>
          <View style={Styles.leftBox60}>
            <Text style={Styles.heading2}>{this.props.text} </Text>
          </View>
          <View style={Styles.rightBox40}>
            <Text style={Styles.heading}>{this.props.value} </Text>
          </View>
        </View>
      );
    }
}