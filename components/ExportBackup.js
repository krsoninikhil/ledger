import React from 'react';
import {
    TouchableOpacity,
    Text,
    Share,
    View,
} from 'react-native';

import Styles from '../constants/Stylesheet';
import Txn from '../database/Txn';

export default class ExportBackup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.backup = this.backup.bind(this);
    }

    backup() {
        this.createBackup();
    }

    createBackup() {
        let data = '"TxnId", "CustId", "TxDate", "Name", "Contact", "Amount", "Note"\r\n';
        Txn.export().then(({_array}) => {
            _array.forEach(row => {
                data += `"${row.id}", "${row.custId}", "${row.date}", "${row.name}", "${row.contact}", "${row.amount}", "${row.note}"\r\n`;
            });
            Share.share({message: data, title: 'ledger-export.csv'});
        });
    }

    render() {
        return (
            <View style={Styles.itemContainer}>
                <TouchableOpacity onPress={this.backup}>
                    <Text style={[Styles.heading2, Styles.link]}>Export Data </Text>
                    <Text style={Styles.alignRight}>(click and choose Google Drive)</Text>
                </TouchableOpacity>
            </View>
        );
    }
}