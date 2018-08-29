import React, {Component} from 'react';
import { View, Text,} from 'react-native';

export default class Contrast extends Component {
    render() {
        return (
            <View style={{flex:1,backgroundColor: 'red'}}><Text>Contrast</Text></View>
        )
    }
}