import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/navigationProps';

type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Landing'
>;

type Props = {
  navigation: LandingScreenNavigationProp;
};

const LandingScreen = ({navigation}: Props) => {
  return (
    <View style={styles.container}>
      <Text>Hello There</Text>
      <Pressable onPress={() => navigation.navigate('Lobby')}>
        <Text>GET BOWLING</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LandingScreen;
