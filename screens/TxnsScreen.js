import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default class TxnsScreen extends React.Component {
    static navigationOptions = {
        title: 'name',
    };

    render() {
        return (
            <FlatList
                data={[
                    {amount: 50, time: '2018-09-31', note: 'This is a sample note. You can also use any reference here.'},
                    {amount: 500, time: '2018-10-01', note: 'B2P32: This is a sample reference.'},
                ]}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.amount.toString()}</Text>
                        <Text>{item.time}</Text>
                        <Text>{item.note}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index}
            />
        );
    }
}