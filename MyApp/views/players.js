import React, {Component} from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SVGImage from 'react-native-svg-image';
const mainColor = '#006bb7';
export default class Players extends Component {
    static navigationOptions = {
        tabBarLabel: '球员',
        tabBarIcon: ({focused}) => {
            return (
                <Icon name='users' size={20} color= {focused ? mainColor : 'black'} />
            );
        },
    }
    render() {
        return (
            <View style={{ flex: 1 ,backgroundColor: 'red'}}>
                <SVGImage
                    style={{height: 80, width: 80}}
                    source={{uri:'https://fluent-panda.appspot.com.storage.googleapis.com/dumbbell.svg'}}
                />
            </View>
        )
    }
}