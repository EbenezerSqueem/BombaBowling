import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from '../types/navigationProps';
import {
  LandingScreen,
  LobbyScreen,
  GameScreen,
  SummaryScreen,
} from '../screens/';
import {GameProvider} from '../providers/GameProvider';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <GameProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Lobby" component={LobbyScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </GameProvider>
  );
};
