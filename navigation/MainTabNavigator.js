import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TxnsScreen from '../screens/TxnsScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Txns: TxnsScreen,
  }, 
  {
    initialRouteName: 'Home',
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Entries',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AddNewStack = createStackNavigator({
  AddNew: SettingsScreen,
});

AddNewStack.navigationOptions = {
  tabBarLabel: 'Add New',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
    />
  ),
};

const StatsStack = createStackNavigator({
  Stats: StatsScreen,
});

StatsStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-trending-up'
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  AddNewStack,
  StatsStack,
});
