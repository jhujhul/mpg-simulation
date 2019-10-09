import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Player, State } from "../reducers";
import {
  changePlayerGrade,
  changePlayerGoals,
  changePlayerOwnGoals
} from "../actions";
import IncrementInput from "./IncrementInput";

interface EditPlayerProps {
  player: Player | null;
  changePlayerGrade: (playerId: number, grade: number) => void;
  changePlayerGoals: (playerId: number, goals: number) => void;
  changePlayerOwnGoals: (playerId: number, ownGoals: number) => void;
}
const EditPlayer: React.FunctionComponent<EditPlayerProps> = props => {
  const {
    player,
    changePlayerGrade,
    changePlayerGoals,
    changePlayerOwnGoals
  } = props;

  if (player === null) {
    return null;
  }

  const handleGradeChange = (grade: number) => {
    changePlayerGrade(player.id, grade);
  };

  const handleGoalsChange = (goals: number) => {
    changePlayerGoals(player.id, goals);
  };

  const handleOwnGoalsChange = (ownGoals: number) => {
    changePlayerOwnGoals(player.id, ownGoals);
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-1">
        <div className="w-1/4">
          <label className="block text-gray-500 font-bold text-right mb-0 pr-4">
            Note
          </label>
        </div>
        <div className="w-3/4">
          <IncrementInput
            value={player.grade}
            min={0}
            max={10}
            step={0.5}
            onChange={handleGradeChange}
          />
        </div>
      </div>
      <div className="flex items-center mb-1">
        <div className="w-1/4">
          <label className="block text-gray-500 font-bold text-right mb-0 pr-4">
            Buts
          </label>
        </div>
        <div className="w-3/4">
          <IncrementInput
            value={player.goals}
            min={0}
            max={5}
            step={1}
            onChange={handleGoalsChange}
          />
        </div>
      </div>
      <div className="flex items-center mb-1">
        <div className="w-1/4">
          <label className="block text-gray-500 font-bold text-right mb-0 pr-4">
            CSC
          </label>
        </div>
        <div className="w-3/4">
          <IncrementInput
            value={player.ownGoals}
            min={0}
            max={5}
            step={1}
            onChange={handleOwnGoalsChange}
          />
        </div>
      </div>
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
  changePlayerGrade,
  changePlayerGoals,
  changePlayerOwnGoals
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPlayer);
