import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePlayerEdition } from "../actions";
import { AppState } from "../reducers";
import PlayerGoalsInput from "./PlayerGoalsInput";
import PlayerGradeInput from "./PlayerGradeInput";
import PlayerOwnGoalsInput from "./PlayerOwnGoalsInput";

const EditPlayer: React.FunctionComponent = () => {
  const selectedPlayerId = useSelector<AppState, number | null>(
    state => state.selectedPlayerId
  );
  const dispatch = useDispatch();

  if (selectedPlayerId === null) {
    return null;
  }

  const handleCloseClick = () => {
    dispatch(closePlayerEdition());
  };

  return (
    <div className="bottom-0 sticky z-10 bg-gray-100 px-2 py-3 shadow">
      <PlayerGradeInput playerId={selectedPlayerId} />
      <PlayerGoalsInput playerId={selectedPlayerId} />
      <PlayerOwnGoalsInput playerId={selectedPlayerId} />
      <span
        onClick={handleCloseClick}
        className="absolute top-0 right-0 mt-2 mr-2"
      >
        x
      </span>
    </div>
  );
};

export default EditPlayer;
