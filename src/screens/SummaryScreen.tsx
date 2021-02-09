import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/navigationProps';
import {GameContext} from '../providers/GameProvider';

type SummaryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Game'
>;

type Props = {
  navigation: SummaryScreenNavigationProp;
};

const SummaryScreen = ({navigation}: Props) => {
  const {players}: any = useContext(GameContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Summary</Text>
      <Text style={styles.boldSubText}>{players[0].name} is the winner!</Text>
      <Text style={styles.subText}>Play Again</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lobby')}>
        <Text style={styles.buttonText}>Same Players</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Lobby');
        }}>
        <Text style={styles.buttonText}>New Players</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#D3D3D3',
    padding: 25,
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
  boldSubText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A4161A',
    marginBottom: 15,
  },
  subText: {
    fontSize: 16,
    color: '#A4161A',
    marginBottom: 15,
  },
});

export default SummaryScreen;
