import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closePlayerEdition,
  selectPreviousPlayer,
  selectNextPlayer
} from "../actions";
import { AppState } from "../reducers";
import PlayerGoalsInput from "./PlayerGoalsInput";
import PlayerGradeInput from "./PlayerGradeInput";
import PlayerOwnGoalsInput from "./PlayerOwnGoalsInput";
import NavigationChevronButton from "./NavigationChevronButton";
import { PlayerPosition } from "../reducers/players";
import { getIsPlayerPlayingForHomeTeam, getSelectedPlayer } from "../selectors";
import MpgGoalInfo from "./MpgGoalInfo";
import MpgSaveInfo from "./MpgSaveInfo";
import PlayerRotaldoInput from "./PlayerRotaldoInput";

const EditPlayer: React.FunctionComponent = () => {
  const selectedPlayer = useSelector(getSelectedPlayer);
  const isPlayingForHomeTeam = useSelector<AppState, boolean>(state =>
    selectedPlayer
      ? getIsPlayerPlayingForHomeTeam(state, selectedPlayer.id)
      : false
  );
  const dispatch = useDispatch();

  if (selectedPlayer === null) {
    return null;
  }

  const handleCloseClick = () => {
    dispatch(closePlayerEdition());
  };

  const handleLeftChevronButtonClick = () => {
    dispatch(selectPreviousPlayer());
  };

  const handleRightChevronButtonClick = () => {
    dispatch(selectNextPlayer());
  };

  const headerBackgroundColor = isPlayingForHomeTeam
    ? "bg-blue-600"
    : "bg-red-600";

  const isPlayerGoalkeeper =
    selectedPlayer.position === PlayerPosition.Goalkeeper;

  return (
    <div className="bottom-0 sticky z-10 shadow">
      <div
        className={`flex justify-between py-1 pl-12 pr-4 text-white text-lg font-bold ${headerBackgroundColor}`}
      >
        <span>
          {selectedPlayer.isRotaldo ? "Rotaldo" : selectedPlayer.name}
        </span>
        <button onClick={handleCloseClick}>
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>
      <div className="flex bg-gray-100">
        <NavigationChevronButton
          isLeft={true}
          onClick={handleLeftChevronButtonClick}
        />
        <div className="flex justify-between flex-grow py-2 px-2">
          <div>
            <PlayerGradeInput playerId={selectedPlayer.id} />
            <PlayerGoalsInput playerId={selectedPlayer.id} />
            <PlayerOwnGoalsInput playerId={selectedPlayer.id} />
            <PlayerRotaldoInput playerId={selectedPlayer.id} />
          </div>
          <div className="flex flex-col justify-center items-center">
            {isPlayerGoalkeeper ? <MpgSaveInfo /> : <MpgGoalInfo />}
          </div>
        </div>
        <NavigationChevronButton
          isLeft={false}
          onClick={handleRightChevronButtonClick}
        />
      </div>
    </div>
  );
};

export default EditPlayer;
