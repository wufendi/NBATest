import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import TabNav from './views/common/tabNav';
import TeamDetail from './views/teamDetail';
import PlayerDetail from './views/playerDetail';

export default App = StackNavigator(
    {
      TeamDetail: {
          screen: TeamDetail,
      },
      PlayerDetail: {
          screen: PlayerDetail,
      },
      Main: {
        screen: TabNav,
          navigationOptions: ({navigation}) => ({
              header: null
          })
      }
    },
    {
        initialRouteName: 'Main',
        navigationOptions: {
            headerStyle: {
                height: 36,
                backgroundColor: '#006bb7',
            },
            headerTintColor: '#fff',
        },
    }
    )