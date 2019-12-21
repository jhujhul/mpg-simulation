import React from "react";
import { useSelector } from "react-redux";
import MpgSuccessInfo from "./MpgSuccessInfo";
import GoalSaveIcon from "./GoalSaveIcon";
import { getHasSelectedPlayerSavedGoalConditions } from "../selectors/hasPlayerSavedGoal";

const MpgSaveInfo: React.FunctionComponent = () => {
  const hasSelectedPlayerScoredConditions = useSelector(
    getHasSelectedPlayerSavedGoalConditions
  );

  return (
    <MpgSuccessInfo
      icon={<GoalSaveIcon />}
      label="Arrêt MPG"
      conditions={hasSelectedPlayerScoredConditions}
      successResult="Le gardien arrête un but réel"
      failResult="Le gardien n'arrête pas de but"
    />
  );
};

export default MpgSaveInfo;
