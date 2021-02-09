import React, {useContext, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParamList} from '../types/navigationProps';
import {GameContext} from '../providers/GameProvider';

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

type Props = {
  navigation: GameScreenNavigationProp;
};

const GameScreen = ({navigation}: Props) => {
  const emptyFrame = {
    first: '',
    second: '',
    third: '',
    result: '',
    score: 0,
  };
  const {players, setPlayers}: any = useContext(GameContext);
  const [currentFrameNum, setCurrentFrameNum] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(emptyFrame);
  // position of current players in players array
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentThrowNum, setCurrentThrowNum] = useState(1);
  const [numPins, setNumPins] = useState('');
  const numPinsInput = useRef<TextInput>(null);

  const ContainerHeader = () => {
    let frameHeaders = [];
    frameHeaders.push(
      <View style={styles.containerHeader} key={0}>
        <Text style={styles.userName}>Players</Text>
      </View>,
    );
    for (let i = 1; i <= 10; i++) {
      frameHeaders.push(
        <View style={styles.frameHeaderFrame} key={i}>
          <Text style={styles.frameHeaderLabel}>{i}</Text>
        </View>,
      );
    }
    return <View style={styles.frameHeaderContainer}>{frameHeaders}</View>;
  };

  const RenderPlayerItem = ({item}: any) => {
    return (
      <View style={styles.userContainer}>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userScore}>{item.score}</Text>
        </View>
        <PlayerScoreRow frames={item.frames} />
      </View>
    );
  };

  const PlayerScoreRow = ({frames}: any) => {
    let framesArr = [];
    console.log('Frame Array: ', frames);
    for (let i = 1; i <= 10; i++) {
      if (i > frames.length) {
        framesArr.push(<FrameCell frameScore={{}} key={i} frame={i} />);
      } else {
        // console.log(frames[i]);
        framesArr.push(
          <FrameCell frameScore={frames[i - 1]} key={i} frame={i} />,
        );
      }
    }
    return <View style={styles.framesContainer}>{framesArr}</View>;
  };

  const FrameCell = ({frame, frameScore}: any) => {
    console.log('frame number: ', frame);
    console.log('frame: ', frameScore);
    return (
      <View style={styles.frameCell} key={frame}>
        <View style={styles.throwRow}>
          <View style={styles.outerScoreCell}>
            <Text>{frameScore.first ? frameScore.first : ''}</Text>
          </View>
          <View style={styles.scoreCell}>
            <Text>{frameScore.second ? frameScore.second : ''}</Text>
          </View>
          {frame === 10 && (
            <View style={styles.scoreCell}>
              <Text>{frameScore.third ? frameScore.third : ''}</Text>
            </View>
          )}
        </View>
        <View style={styles.scoreRow}>
          <Text style={styles.userScore}>
            {frameScore.score ? frameScore.score : ''}
          </Text>
        </View>
      </View>
    );
  };

  // too much logic need to break this out
  const registerRoll = (result: String) => {
    // Enter throw outcome, determine score updates, and next throw/turn
    console.log('current throw num: ', currentThrowNum);
    let endTurn = true;
    let newCurrentFrame = currentFrame;
    switch (result) {
      case 'Spare':
        // second throw finished out pins
        if (currentFrameNum === 10) {
          endTurn = false;
        }
        newCurrentFrame.second = '/';
        newCurrentFrame.result = 'spare';

        // calc score
        // was previous a strike?

        break;
      case 'Strike':
        // hit all pins
        // if it's the tenth frame and not the last throw don't end turn
        if (currentFrameNum === 10) {
          setCurrentThrowNum(currentThrowNum + 1);
          if (currentThrowNum === 1) {
            newCurrentFrame.first = 'X';
            endTurn = false;
          } else if (currentThrowNum === 2) {
            newCurrentFrame.second = 'X';
            endTurn = false;
          } else {
            newCurrentFrame.third = 'X';
          }
        } else {
          // set first throw to strike
          newCurrentFrame.second = 'X';
          newCurrentFrame.result = 'strike';
        }
        break;
      default:
        // threw but didn't close out pins
        // TODO validate input is lower than pins left -- before this call

        // user has only thrown once
        if (currentThrowNum === 1) {
          newCurrentFrame.first = numPins;
          endTurn = false;
        } else {
          newCurrentFrame.second = numPins;
          newCurrentFrame.result = 'open';
        }
        setCurrentThrowNum(currentThrowNum + 1);
        setNumPins('');
        break;
    }
    // calculate score

    // update players obj
    let newPlayers = players;
    // yikes
    newPlayers[currentTurn].frames[currentFrameNum - 1] = currentFrame;
    setPlayers(newPlayers);
    // if next turn
    if (endTurn) {
      if (currentTurn === players.length - 1) {
        if (currentFrameNum >= 10) {
          // game is over
          navigation.navigate('Summary');
        } else {
          // end of frame clean up
          setCurrentTurn(0);
          setCurrentFrameNum(currentFrameNum + 1);
          setCurrentFrame(emptyFrame);
        }
      } else {
        setCurrentTurn(currentTurn + 1);
      }
      setCurrentThrowNum(1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GAME SCREEN</Text>
      <View style={styles.scoresContainer}>
        {/* User List */}
        <View style={styles.playerColumn}>
          <ScrollView horizontal={true}>
            <FlatList
              data={players}
              renderItem={RenderPlayerItem}
              keyExtractor={(item) => item.name}
              ListHeaderComponent={ContainerHeader}
              ItemSeparatorComponent={() => {
                return <View style={styles.listDivider} />;
              }}
            />
          </ScrollView>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <View>
          <Text style={styles.subText}>
            Current Player: {players[currentTurn].name}
          </Text>
          <Text style={styles.subText}>Current Frame: {currentFrameNum}</Text>
        </View>
        <View style={styles.pinsContainer}>
          <Text style={styles.subText}>Number Pins Hit:</Text>
          <View style={styles.pinInputContainer}>
            <TextInput
              style={styles.pinInputField}
              keyboardType={'number-pad'}
              ref={numPinsInput}
              maxLength={1}
              value={numPins}
              onChangeText={(text) => setNumPins(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => registerRoll('')}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View>
          {currentThrowNum === 2 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => registerRoll('Spare')}>
              <Text style={styles.buttonText}>Spare</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => registerRoll('Strike')}>
            <Text style={styles.buttonText}>Strike</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: 150,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#A4161A',
  },
  subText: {
    fontSize: 16,
    color: '#A4161A',
    marginBottom: 15,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  playerColumn: {
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
  },
  containerHeader: {
    width: 95,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderStyle: 'solid',
  },
  userContainer: {
    flexDirection: 'row',
  },
  userDetails: {
    width: 95,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'black',
    borderStyle: 'solid',
  },
  userName: {
    fontSize: 14,
  },
  userScore: {
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  listDivider: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderBottomWidth: 2,
  },
  listHorizontalDivider: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderRightWidth: 2,
  },
  scoresColumn: {
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
  },
  frameHeaderFrame: {
    padding: 10,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  frameHeaderContainer: {
    flexDirection: 'row',
  },
  framesContainer: {
    flexDirection: 'row',
  },
  frameHeaderLabel: {
    fontSize: 14,
  },
  frameCell: {
    width: 75,
    borderColor: 'black',
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  throwRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scoreRow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCell: {
    width: 25,
    height: 32,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerScoreCell: {
    width: 25,
    height: 32,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pinInputContainer: {
    backgroundColor: '#161A1D',
    borderRadius: 10,
    flexDirection: 'row',
    width: 50,
    height: 50,
    margin: 10,
  },
  pinInputField: {
    margin: 10,
    width: '100%',
    color: '#A4161A',
  },
});

export default GameScreen;
