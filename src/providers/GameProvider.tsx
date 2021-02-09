import React, {createContext, useState} from 'react';

export const GameContext = createContext({});

// type Frame = {
//   first: Number;
//   second: Number;
//   third?: Number;
//   result?: String;
//   score?: Number;
// };

// type Player = {
//   name: String;
//   possibleScore: Number;
//   score: Number;
//   frames: Array<Frame>;
// };

export const GameProvider = ({children}: any) => {
  const [players, setPlayers] = useState([]);
  const [totalScores, setTotalScores] = useState([]);

  return (
    <GameContext.Provider
      value={{players, setPlayers, totalScores, setTotalScores}}>
      {children}
    </GameContext.Provider>
  );
};
