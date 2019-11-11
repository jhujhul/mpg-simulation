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
    <div className="flex w-full sticky top-0 z-10 shadow-md">
      <div className="flex flex-1 justify-end items-center text-right bg-blue-600 p-2 text-white text-lg">
        {homeTeam.name}
      </div>
      <div className="text-4xl text-gray-800 bg-white w-20 text-center">
        {homeTeam.goals}-{awayTeam.goals}
      </div>
      <div className="flex flex-1 items-center bg-red-600 p-2 text-white text-lg">
        {awayTeam.name}
      </div>
    </div>
  );
};

export default Score;
