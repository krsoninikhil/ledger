import React from 'react';
import {
    View,
    Text,
    Alert,
} from 'react-native';
import Styles from '../constants/Stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import Strings from '../constants/Strings';
import Txn from '../database/Txn';

class TxnBox extends React.Component {
    
    getDay(date) {
        let parts = date.split('-');
        date = new Date(`${parts[1]}/${parts[0]}/${parts[2]}`);
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[date.getDay()];
    }

    render() {
        return (
            <View style={Styles.itemContainerVertical}>
                <View style={[Styles.itemContainer, {height: 45, marginHorizontal: 0, marginVertical: 0}]}>
                    <View style={Styles.midBox50}>
                        <Text style={[Styles.heading2]}>{Strings.curr} {this.props.amount}</Text>
                    </View>
                    <View style={[Styles.midBox50, Styles.justRow]}>
                        <Text style={[Styles.heading2, Styles.alignRight]}>
                            {this.props.date} {' - '}
                        </Text>
                        <Text style={[Styles.heading2, Styles.link, Styles.alignRight]} onPress={this.props.deleteTxn(this.props.txId)}>
                            {' Delete'}
                        </Text>
                    </View>
                </View>
                {
                    this.props.note 
                        ?   <View style={Styles.box}>
                                <Text style={Styles.subHeading}>{this.props.note}</Text>
                            </View>
                        :   null
                }
            </View>
        );
    }
}

export default class TxnsScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {title: `Ledger - ${navigation.getParam('custName', '')}`}
    };

    constructor(props) {
        super(props);   
        this.state = {txns: []}
        Txn.find(this.props.navigation.getParam('custId')).then(
            (rows) => this.setState({txns: rows._array})
        );
        this.deleteTxn = this.deleteTxn.bind(this);
    }

    deleteTxn(txId) {
        return () => {
            Alert.alert('Delete Transaction', 'Are you sure?', [
                {text: 'No', onPress: () => null},
                {text: 'Yes', onPress: () => {
                    Txn.delete(txId).then(null, (err) => console.log(err));
                    let txns = this.state.txns;
                    for (let i = 0; i < txns.length; i++) {
                        if (txns[i].id == txId) {
                            txns.splice(i, 1);
                            break;
                        }
                    };
                    this.setState({txns: txns});
                }}
            ]);
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.txns}
                renderItem={({item}) => (
                    <TxnBox 
                        amount={item.amount.toString()} 
                        date={item.date} 
                        note={item.note} 
                        txId={item.id} 
                        deleteTxn={this.deleteTxn}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}