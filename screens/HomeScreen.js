import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Ledger",
  };

  render() {
    return (
      <View style={styles.root}>
        <FlatList style={styles.container} contentContainerStyle={styles.contentContainer}
          data={[
            {name: 'Akhilesh Rawat', balance: -35},
            {name: 'Aanisha Mishra', balance: 50},
            {name: 'Nikhil Soni', balance: 50},
          ]}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <TouchableNativeFeedback
                  onPress={() => this.props.navigation.navigate('Txns', {name: item.name})}
                  style={styles.leftBox80}>
                <View style={styles.occupy}>
                  <Text style={styles.heading}>{item.name}</Text>
                  <Text style={styles.subHeading}>Rs. {item.balance.toString()}</Text>
                </View>
              </TouchableNativeFeedback>
              <View style={styles.rightBox20}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.symbol}> + </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        /> 
      </View>
    );
  }

}

const styles = StyleSheet.create({
  root: {
    // marginTop: 30,
  },
  occupy: {
    flex: 1
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: 75,
    borderRadius: 5,
    // borderBottomWidth: 0.5,
    // borderColor: '#2e78b7',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginVertical: 1,
    marginHorizontal: 3,
    flexDirection: 'row',
  },
  subHeading: {
    marginBottom: 10,
    color: 'rgba(110, 134, 155, 0.4)',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'left',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center'
  },
  rightBox20: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignItems: 'flex-end',
  },
  leftBox80: {
    flex: 4,
    paddingHorizontal: 2,
    paddingVertical: 2,
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 20,
    color: '#2e78b7',// 'rgba(96,100,109, 1)',
    lineHeight: 32,
    textAlign: 'left',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  symbol: {
    fontSize: 27,
    color: '#2e78b7',
    textAlign: 'center',
  },
  box: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
