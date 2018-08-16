import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation';
export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const rootRouter = {
            component: this.props.component,
            title: this.props.title
        };
        const RootStack = createStackNavigator({
            Home: {
                screen: this.props.component
            },
        });
        return (
            <RootStack/>
        )
    }
}