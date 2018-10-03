import { StyleSheet, Platform, } from 'react-native';

const styles = StyleSheet.create({
    root: {
      // marginTop: 30,
    },
    occupy: {
      flex: 1,
    },
    row: {
      padding: 5,
      flexDirection: 'row',
      flex: 1,
    },
    itemContainer: {
      flex: 1,
      backgroundColor: '#fff',
      height: 75,
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingVertical: 5,
      marginVertical: 1,
      marginHorizontal: 3,
      flexDirection: 'row',
    },
    subHeading: {
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
    midBox50: {
      paddingHorizontal: 2,
      paddingVertical: 2,
      width: '50%',
    },
    heading: {
      fontSize: 20,
      color: '#2e78b7',
      lineHeight: 32,
      textAlign: 'left',
    },
    heading2: {
      fontSize: 17,
      color: '#2e78b7',
      lineHeight: 23,
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
    amount: {
      fontSize: 25,
      color: '#2e78b7',
      textAlign: 'right',
    },
    itemContainerVertical: {
      flex: 1,
      backgroundColor: '#fff',
      minHeight: 130,
      borderRadius: 5,
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginVertical: 1,
      marginHorizontal: 3,
      flexDirection: 'column',
    },
    box: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    empty: {
        padding: 0,
    },
  });
  
export default styles;