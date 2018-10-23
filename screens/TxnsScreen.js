import React from 'react';
import {
    View,
    Text,
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
                <View style={[Styles.itemContainer, {height: 40, marginHorizontal: 0, marginVertical: 0}]}>
                    <View style={Styles.midBox50}>
                        <Text style={Styles.heading2}>
                            {this.getDay(this.props.date)}{" "}{this.props.date}
                        </Text>
                    </View>
                    <View style={Styles.midBox50}>
                        <Text style={Styles.amount}>{Strings.curr} {this.props.amount}</Text>
                    </View>
                </View>
                <View style={Styles.box}>
                    <Text style={Styles.subHeading}>{this.props.note}</Text>
                </View>
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
    }

    render() {
        return (
            <FlatList
                data={this.state.txns}
                renderItem={({item}) => (
                    <TxnBox amount={item.amount.toString()} date={item.date} note={item.note} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}