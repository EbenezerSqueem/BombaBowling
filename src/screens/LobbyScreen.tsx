import React, {useContext, useRef, useState} from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/navigationProps';
import {GameContext} from '../providers/GameProvider';

type LobbyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Landing'
>;

type Props = {
  navigation: LobbyScreenNavigationProp;
};

const LobbyScreen = ({navigation}: Props) => {
  const {players, setPlayers}: any = useContext(GameContext);
  const [showPlayerInput, setShowPlayerInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const playerInput = useRef<TextInput>(null);

  const PlayerListHeader = ({}) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Current Players</Text>
        <TouchableOpacity
          style={styles.listHeaderButton}
          onPress={() => {
            setShowPlayerInput(!showPlayerInput);
            if (playerInput && playerInput.current) {
              playerInput.current.focus();
            }
          }}>
          <Text style={styles.listHeaderButtonText}>Add Player</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const PlayerItem = ({item}: any) => {
    return (
      <View style={styles.listPlayerItem}>
        <Text style={styles.listPlayerItemText}>- {item.name}</Text>
      </View>
    );
  };

  const submitPlayer = () => {
    if (playerName && playerName.length > 0) {
      // add player to list of players.
      setPlayers([
        ...players,
        {
          name: playerName,
          highestPossible: 300,
          score: 0,
          frames: [],
        },
      ]);
      // clear player input and hide field input
      setPlayerName('');
      setShowPlayerInput(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LOBBY</Text>
      <FlatList
        ListHeaderComponent={PlayerListHeader}
        data={players}
        renderItem={PlayerItem}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={() => {
          return (
            <View style={styles.listPlayerItem}>
              <Text style={styles.listPlayerItemText}>
                No players yet. Press plus above to start adding some.
              </Text>
            </View>
          );
        }}
      />
      {showPlayerInput && (
        <View style={styles.playerInputContainer}>
          <TextInput
            style={styles.playerInputField}
            value={playerName}
            ref={playerInput}
            onChangeText={(text) => setPlayerName(text)}
            keyboardType={'default'}
          />
          <TouchableOpacity onPress={() => submitPlayer()}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Game')}>
        <Text style={styles.buttonText}>START GAME</Text>
      </Pressable>
    </SafeAreaView>
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
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listTitle: {
    color: '#A4161A',
    fontWeight: 'bold',
    fontFamily: 'Verdana',
    fontStyle: 'italic',
    fontSize: 20,
  },
  listHeaderButton: {
    backgroundColor: '#161A1D',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  listHeaderButtonText: {
    color: '#A4161A',
    fontWeight: 'bold',
    padding: 5,
  },
  listPlayerItem: {
    padding: 10,
    maxWidth: '80%',
  },
  listPlayerItemText: {
    fontSize: 16,
    color: '#A4161A',
  },
  playerInputContainer: {
    backgroundColor: '#161A1D',
    borderRadius: 10,
    flexDirection: 'row',
    width: '50%',
    margin: 10,
  },
  playerInputField: {
    margin: 10,
    width: '100%',
    color: '#A4161A',
  },
});

export default LobbyScreen;
