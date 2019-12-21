import React from "react";
import { useSelector } from "react-redux";
import {
  getHomeTeam,
  getHomeTeamTotalGoals,
  getAwayTeamTotalGoals,
  getAwayTeam
} from "../selectors";

const Score: React.FunctionComponent = () => {
  const homeTeamName = useSelector(getHomeTeam).name;
  const homeTeamGoals = useSelector(getHomeTeamTotalGoals);
  const awayTeamName = useSelector(getAwayTeam).name;
  const awayTeamGoals = useSelector(getAwayTeamTotalGoals);

  return (
    <div className="flex w-full sticky top-0 z-10 shadow-md">
      <div className="flex flex-1 justify-end items-center text-right bg-blue-600 p-2 text-white text-lg">
        {homeTeamName}
      </div>
      <div className="text-4xl text-gray-800 bg-white w-20 text-center">
        {homeTeamGoals}-{awayTeamGoals}
      </div>
      <div className="flex flex-1 items-center bg-red-600 p-2 text-white text-lg">
        {awayTeamName}
      </div>
    </div>
  );
};

export default Score;
