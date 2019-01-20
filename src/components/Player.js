import React from "react";

const Player = props => {
  const { player, onChange } = props;

  const handleChange = event => {
    onChange(player.id, event.target.value);
  };

  return (
    <div>
      {player.id} ({player.poste}){player.hasScored ? "GOAL" : ""}
      <input
        type="number"
        step="0.5"
        min="0"
        max="10"
        value={player.note || ""}
        onChange={handleChange}
      />
    </div>
  );
};

export default Player;
