import React from "react";

import Team from "../containers/Team";

const App: React.FunctionComponent = () => {
  return (
    <div className="App" style={{ display: "flex" }}>
      <Team id={1} />
      <Team id={2} />
    </div>
  );
};

export default App;
