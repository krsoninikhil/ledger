import React from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    ToastAndroid,
} from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import Styles from "../constants/Stylesheet";

export default class SuggestionBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestions: []}
    }

    choose(item) {
        return () => {
            if (this.props.parent) {
                this.props.parent.setState({
                    custId: item.id, 
                    custName: item.name, 
                    contact: item.contact, 
                    suggestions: [],
                    newEntry: false,
                });
                ToastAndroid.show('To change customer, press \'Reset\'', ToastAndroid.SHORT);
                this.props.parent.refs.amount.focus();
            } else {
                console.log("'parent' prop is expected!");
            }
        }
    }

    render() {
        if (!this.props.suggestions.length) {
            return (null);
        }
        return (
            <View style={Styles.absoluteBox}>
                <FlatList 
                    data={this.props.suggestions}
                    renderItem={({item}) => (
                        <TouchableNativeFeedback onPress={this.choose(item)}>
                            <View style={Styles.itemContainer}>
                                <View>
                                    <View style={[Styles.leftBox80, Styles.column]}>
                                        <Text style={Styles.heading2}>{item.name}</Text>
                                        <Text style={Styles.subHeading}>{item.contact}</Text>
                                    </View>
                                    <View style={Styles.rightBox20}>
                                        <Text style={Styles.symbol}></Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}