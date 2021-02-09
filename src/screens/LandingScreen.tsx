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
      <Text style={styles.title}>Bomba Bowling</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Lobby')}>
        <Text style={styles.buttonText}>LET'S GET BOWLING</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#D3D3D3',
  },
  title: {
    color: '#A4161A',
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    fontStyle: 'italic',
    fontSize: 36,
    marginVertical: 25,
  },
  button: {
    backgroundColor: '#161A1D',
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#A4161A',
  },
});

export default LandingScreen;
