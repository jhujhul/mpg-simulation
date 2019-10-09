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
    <div className="flex w-full">
      <div className="flex justify-end flex-1 text-right bg-indigo-400 p-2 text-white text-lg">
        <span className="self-end">{homeTeam.name}</span>
      </div>
      <div className="text-4xl text-gray-800">
        {homeTeam.goals}-{awayTeam.goals}
      </div>
      <div className="flex flex-1 bg-red-400 p-2 text-white text-lg">
        <span className="self-end">{awayTeam.name}</span>
      </div>
    </div>
  );
};

export default Score;
