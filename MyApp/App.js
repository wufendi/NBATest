import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import TabNav from './views/common/tabNav';
import TeamDetail from './views/teamDetail';

export default App = StackNavigator({
      TeamDetail: {
          screen: TeamDetail
      },
      Main: {
        screen: TabNav,
          navigationOptions: ({navigation}) => ({
              header: null
          })
      }
    },{
      initialRouteName: 'Main'
})