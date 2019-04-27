import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Player, State } from "../reducers";
import { changePlayerGrade } from "../actions";

interface EditPlayerProps {
  player: Player | null;
  changePlayerGrade: (playerId: number, grade: number) => void;
}
const EditPlayer: React.FunctionComponent<EditPlayerProps> = props => {
  const { player, changePlayerGrade } = props;

  if (player === null) {
    return null;
  }

  const [gradeLocal, setGradeLocal] = useState("");
  useEffect(() => {
    setGradeLocal(player.grade.toString());
  }, [player.id]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    const numericValue = parseFloat(value);

    if (numericValue < 0 || numericValue > 10) {
      return;
    }

    setGradeLocal(value);
    if (!isNaN(numericValue)) {
      changePlayerGrade(player.id, numericValue);
    }
  };

  return (
    <div>
      <label htmlFor="gradeInput">Note du joueur:</label>
      <input
        id="gradeInput"
        type="number"
        min="0"
        max="10"
        step="1"
        value={gradeLocal}
        onChange={handleChange}
      />
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const { selectedPlayerId } = state;
  return {
    player: selectedPlayerId === null ? null : state.players[selectedPlayerId]
  };
};

const mapDispatchToProps = {
  changePlayerGrade
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPlayer);
