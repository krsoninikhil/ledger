import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class AddNewScreen extends React.Component {
  static navigationOptions = {
    title: 'Add New Entry',
  };

  render() {
    return <ExpoConfigView />;
  }
}
