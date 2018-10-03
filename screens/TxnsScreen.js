import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import Styles from '../constants/Stylesheet';
import { FlatList } from 'react-native-gesture-handler';
import Strings from '../constants/Strings';

class TxnBox extends React.Component {
    render() {
        return (
            <View style={Styles.itemContainerVertical}>
                <View style={[Styles.itemContainer, {height: 40}]}>
                    <View style={Styles.midBox50}>
                        <Text style={Styles.heading2}>Tuesday{"\n"}{this.props.time}</Text>
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
    static navigationOptions = {
        title: 'Transactions',
    };

    render() {
        return (
            <FlatList
                data={[
                    {amount: 50, time: '2018-09-31', note: 'This is a sample note. You can also use any reference here. This is a sample note. You can also use any reference here.'},
                    {amount: 500, time: '2018-10-01', note: 'B2P32: This is a sample reference.'},
                ]}
                renderItem={({item}) => (
                    <TxnBox amount={item.amount.toString()} time={item.time} note={item.note} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}