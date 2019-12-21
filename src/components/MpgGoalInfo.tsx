import React from "react";
import { useSelector } from "react-redux";
import MpgSuccessInfo from "./MpgSuccessInfo";
import MpgGoalIcon from "./MpgGoalIcon";
import { getHasSelectedPlayerScoredConditions } from "../selectors/hasPlayerScored";

const MpgGoalInfo: React.FunctionComponent = () => {
  const hasSelectedPlayerScoredConditions = useSelector(
    getHasSelectedPlayerScoredConditions
  );

  return (
    <MpgSuccessInfo
      icon={<MpgGoalIcon />}
      label="But MPG"
      conditions={hasSelectedPlayerScoredConditions}
      successResult="Le joueur marque un but MPG"
      failResult="Le joueur ne marque pas de but MPG"
    />
  );
};

export default MpgGoalInfo;
