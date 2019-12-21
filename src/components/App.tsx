import React from "react";
import { useSelector } from "react-redux";
import Team from "../components/Team";
import Score from "./Score";
import EditPlayer from "./EditPlayer";
import { AppState } from "../reducers";
import { getAwayTeamId } from "../selectors";

const App: React.FunctionComponent = () => {
  const homeTeamId = useSelector<AppState, number>(state => state.homeTeamId);
  const awayTeamId = useSelector(getAwayTeamId);

  return (
    <div>
      <Score />
      <div>
        <Team id={homeTeamId} isHomeTeam={true} />
        <Team id={awayTeamId} isHomeTeam={false} />
      </div>
      <EditPlayer />
    </div>
  );
};

export default App;
