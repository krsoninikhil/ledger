import React from 'react';
import {
    TouchableOpacity,
    Text,
} from 'react-native';
import Expo from 'expo';

import Styles from '../constants/Stylesheet';
import CommonDbOps from '../database/Common';

export default class GoogleDriveBackup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.backup = this.backup.bind(this);
    }

    backup() {
        this.createBackup();
    }

    createBackup() {
        // db file path
        return CommonDbOps.getFile();
    }

    createRequestBody(path) {
        const boundary = 'foo_bar_baz';
        const br = '\r\n';
        const metaData = path.split('/').pop();
        const fileData = 'this is the test file';
        return '--' + boundary + br
            + 'Content-Type: application/json; charset=UTF-8' + br + br
            + JSON.stringify(metaData) + br
            + '--' + boundary + br
            + 'Content-Type: image/jpeg' + br
            + fileData + br
            + '--' + boundary + '--';
    }

    uploadToDrive(accessToken, requestBody) {
        const uploadURL = 'http://localhost:8080';
        fetch(uploadURL, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/related; boundary=foo_bar_baz',
            },
            body: requestBody,
        })
        .then((res) => console.log(res), (err) => console.log(err));
    }

    render() {
        return (
            <TouchableOpacity style={Styles.fullButton} onPress={this.backup}>
                <Text style={Styles.btnText}>Sign In With Google</Text>
            </TouchableOpacity>
        );
    }
}