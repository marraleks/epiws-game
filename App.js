import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from './pages/HomePage';
import SpillSide from './pages/SpillSide';
import ScorePage from './pages/ScorePage';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: () => ({
      headerTransparent: 'false',
      headerLeft: null,
      gesturesEnabled: false,
    }),
  },
  Game: {
    screen: SpillSide,
    navigationOptions: () => ({
      headerTransparent: 'false',
      headerLeft: null,
      gesturesEnabled: false,
    }),
  },
  Score: {
    screen: ScorePage,
    navigationOptions: () => ({
      headerTransparent: 'false',
      headerLeft: null,
      gesturesEnabled: false,
    }),
  },
});

export default createAppContainer(MainNavigator);
