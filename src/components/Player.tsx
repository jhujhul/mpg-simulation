import React from "react";
import { EnhancedPlayer } from "../containers/Player";

export interface PlayerProps {
  player: EnhancedPlayer;
  onGradeChange: (newGrade: number) => void;
}

const Player: React.FunctionComponent<PlayerProps> = props => {
  const { player, onGradeChange } = props;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    onGradeChange(parseFloat(event.currentTarget.value));
  };

  return (
    <div>
      {player.id} ({player.position}){player.hasScored ? "GOAL" : ""}
      <input
        type="number"
        step="0.5"
        min="0"
        max="10"
        value={player.grade}
        onChange={handleChange}
      />
    </div>
  );
};

export default Player;
