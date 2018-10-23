import { StyleSheet, Platform, } from 'react-native';
import Colors from './Colors';

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
			justifyContent: 'center',
    },
    column: {
      padding: 5,
      flexDirection: 'column',
    },
    itemContainer: {
      flex: 1,
      backgroundColor: '#fff',
      height: 75,
      borderRadius: 5,
      paddingHorizontal: 12,
      paddingVertical: 5,
      marginVertical: 2,
      marginHorizontal: 7,
      flexDirection: 'row',
    },
    itemContainerVertical: {
      flex: 1,
      backgroundColor: '#fff',
      minHeight: 100,
      borderRadius: 5,
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginVertical: 2,
      marginHorizontal: 7,
      flexDirection: 'column',
    },
    subHeading: {
      color: Colors.lightText,
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
    rightBox40: {
      flex: 0.4,
      paddingHorizontal: 2,
      paddingVertical: 2,
      alignItems: 'flex-end',
    },
    leftBox60: {
      flex: 0.6,
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
      color: Colors.text,
      lineHeight: 32,
      textAlign: 'left',
    },
    heading2: {
      fontSize: 16,
      color: Colors.text,
      lineHeight: 24,
      textAlign: 'left',
      paddingTop: 3,
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
      color: Colors.symbol,
      textAlign: 'center',
    },
    amount: {
      fontSize: 25,
      color: Colors.text,
      textAlign: 'right',
    },
    box: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 10,
      alignItems: 'flex-start',
    },
    empty: {
      padding: 0,
    },
    textInput: {
			borderBottomColor: 'gray',
			paddingHorizontal: 5,
			paddingTop: 3,
			marginTop: 5,
			marginHorizontal: 3,
			fontSize: 17,
			lineHeight: 23,
			height: 50,
		},
		padding7: {
			padding: 7,
		},
		fullButton: {
			paddingHorizontal: 15,
      paddingVertical: 10,
			alignItems: 'center',
			flex: 1,
			backgroundColor: '#2e78b7',
			height: 50,
			borderRadius: 5, 
		},
		btnText: {
			color: '#fff',
			textAlign: 'center',
    },
    textCenter: {
      color: Colors.text,
      textAlign: 'center',
      marginVertical: 5,
    },
  });
  
export default styles;