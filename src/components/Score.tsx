import React from "react";

interface TeamWithGoals {
  name: string;
  goals: number;
}
interface ScoreProps {
  team1: TeamWithGoals;
  team2: TeamWithGoals;
}
const Score: React.FunctionComponent<ScoreProps> = props => {
  const { team1, team2 } = props;

  return (
    <div className="text-center">
      {team1.name}{" "}
      <span className="text-3xl text-blue-darker">
        {team1.goals} - {team2.goals}
      </span>{" "}
      {team2.name}
    </div>
  );
};

export default Score;
