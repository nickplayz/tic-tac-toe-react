import React from "react";
import { useCallback, useEffect, useState } from "react";
import Modal from "./components/Modal";
import SquareArea from "./components/SquareArea";
import { BoardDataInterface } from "./interfaces/BoardDataInterface";
import { OccupantTypes } from "./interfaces/enums/OccupantTypes";
import { ResultTypes } from "./interfaces/enums/ResultTypes";

const winningSequences: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [previousResult, setResult] = useState<ResultTypes | undefined>(
    undefined
  );
  const [currentBoard, changeCurrentBoard] = useState<BoardDataInterface>([
    ...Array(9),
  ]);
  const [selectedType, setType] = useState<OccupantTypes | undefined>(
    undefined
  );

  const getGameFreeSquares = useCallback(() => {
    const freeSquares = [];
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i].currentOccupant) {
        freeSquares.push(i);
      }
    }
    return freeSquares;
  }, [currentBoard]);

  const checkWin = useCallback(() => {
    if (!selectedType) return;
    const plays = currentBoard.reduce((ac, v, i) => {
      return v.currentOccupant === selectedType ? ac.concat(i) : ac;
    }, []);
    let gameWon = undefined;
    for (let [index, win] of winningSequences.entries()) {
      if (win.every((elem) => plays.indexOf(elem) > -1)) {
        gameWon = {
          index: index,
          player: selectedType,
        };
        break;
      }
    }
    return gameWon;
  }, [currentBoard, selectedType]);

  const checkLoose = useCallback(() => {
    if (!selectedType) return;
    const housePlayer = selectedType === "O" ? "X" : "O";
    const plays = currentBoard.reduce((ac, v, i) => {
      return v.currentOccupant === housePlayer ? ac.concat(i) : ac;
    }, []);
    let gameWon = undefined;
    for (let [index, win] of winningSequences.entries()) {
      if (win.every((elem) => plays.indexOf(elem) > -1)) {
        gameWon = {
          index: index,
          player: selectedType,
        };
        break;
      }
    }
    return gameWon;
  }, [currentBoard, selectedType]);

  const getDraw = useCallback(() => {
    const freeSlots = getGameFreeSquares();
    if (freeSlots.length === 0) {
      return true;
    }
    return false;
  }, [getGameFreeSquares]);

  useEffect(() => {
    if (checkLoose()) {
      setResult(ResultTypes.LOOSE);
    }
    if (getDraw()) {
      setResult(ResultTypes.DRAW);
    }
    if (checkWin()) {
      setResult(ResultTypes.WIN);
    }
  }, [checkWin, getDraw, checkLoose]);

  const restartGame = () => {
    setResult(undefined);
    changeCurrentBoard([...Array(9)]);
    setType(undefined);
  };

  const updateBoardData = (idx: number) => {
    if (currentBoard[idx].isOccupied === true) return;

    const updatedData = currentBoard;
    updatedData[idx] = {
      isOccupied: true,
      currentOccupant: selectedType,
    };

    if (!checkWin()) {
      const freeSpaces = getGameFreeSquares();
      const cpuIndex = Math.floor(Math.random() * freeSpaces.length);
      const cpuChoice = freeSpaces[cpuIndex];
      updatedData[cpuChoice] = {
        isOccupied: true,
        currentOccupant: selectedType === "O" ? "X" : "O",
      };
    }

    changeCurrentBoard([...updatedData]);
  };

  return (
    <div className="flex font-sans flex-col w-full items-center justify-center min-h-screen bg-grey-200 dark:bg-gray-900 p-5">
      <div id="board" className="flex flex-wrap flex-row w-80 h-80 bg-blue-300">
        {currentBoard.map((_val: any, idx: number, _arr: any) => (
          <SquareArea
            key={`square-${idx}`}
            id={idx}
            isOccupied={currentBoard[idx].isOccupied}
            currentOccupant={currentBoard[idx].currentOccupant}
            showPlayerHover={selectedType}
            onClickHandler={updateBoardData}
          />
        ))}
      </div>
      {!selectedType && (
        <div className="flex flex-col m-10">
          <h1 className="text-xl font-bold">SELECT YOUR TYPE</h1>
          <span className="text-center">
            <button
              className="w-10 h-10 rounded-md bg-black text-white"
              onClick={() => setType(OccupantTypes.X)}
            >
              X
            </button>{" "}
            or{" "}
            <button
              className="w-10 h-10 rounded-md bg-black text-white"
              onClick={() => setType(OccupantTypes.O)}
            >
              O
            </button>
          </span>
        </div>
      )}
      {previousResult && (
        <Modal message={`You ${previousResult}`} cb={restartGame} />
      )}
    </div>
  );
}

export default App;
