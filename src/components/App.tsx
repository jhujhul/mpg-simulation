import React from "react";

import Team from "../containers/Team";
import Score from "../containers/Score";
import EditPlayer from "./EditPlayer";

const App: React.FunctionComponent = () => {
  return (
    <div>
      <Score />
      <div className="App overflow-x-scroll" style={{ display: "flex" }}>
        <Team id={1} />
        <Team id={2} />
      </div>
      <EditPlayer />
    </div>
  );
};

export default App;
