import React from "react";

interface TeamWithGoals {
  name: string;
  goals: number;
}
interface ScoreProps {
  homeTeam: TeamWithGoals;
  awayTeam: TeamWithGoals;
}
const Score: React.FunctionComponent<ScoreProps> = props => {
  const { homeTeam, awayTeam } = props;

  return (
    <div className="text-center">
      {homeTeam.name}{" "}
      <span className="text-3xl text-blue-darker">
        {homeTeam.goals} - {awayTeam.goals}
      </span>{" "}
      {awayTeam.name}
    </div>
  );
};

export default Score;
