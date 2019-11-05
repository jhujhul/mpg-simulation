import React from "react";
import { useSelector } from "react-redux";
import Team from "../components/Team";
import Score from "../containers/Score";
import EditPlayer from "./EditPlayer";
import { AppState } from "../reducers";
import { getAwayTeamId } from "../selectors";

const App: React.FunctionComponent = () => {
  const homeTeamId = useSelector<AppState, number>(state => state.homeTeamId);
  const awayTeamId = useSelector(getAwayTeamId);

  return (
    <div>
      <Score />
      <div className="my-2">
        <Team id={homeTeamId} isHomeTeam={true} />
        <Team id={awayTeamId} isHomeTeam={false} />
      </div>
      <EditPlayer />
    </div>
  );
};

export default App;
