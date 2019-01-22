import React from "react";

interface PlayerProps {
  player: any;
  onChange: (playerId: string, newRate: number) => void;
}

const Player: React.FunctionComponent<PlayerProps> = props => {
  const { player, onChange } = props;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    onChange(player.id, parseInt(event.currentTarget.value));
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
