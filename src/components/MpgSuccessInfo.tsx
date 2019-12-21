import React, { Fragment } from "react";
import MpgSuccessExplanationLink from "./MpgSuccessExplanationLink";
import { Condition, areAllConditionsMet } from "../selectors";

interface Props {
  icon: React.ReactNode;
  label: string;
  conditions: Condition[];
  successResult: string;
  failResult: string;
}
const MpgSuccessInfo: React.FunctionComponent<Props> = props => {
  const { icon, label, conditions, successResult, failResult } = props;

  const isSuccess = areAllConditionsMet(conditions);

  const result = isSuccess ? successResult : failResult;

  return (
    <Fragment>
      <div className="flex items-center">
        <span className="mr-1">{icon}</span>
        <span className="text-gray-700 text-lg">
          {label}: {Number(isSuccess)}
        </span>
      </div>
      <MpgSuccessExplanationLink conditions={conditions} result={result} />
    </Fragment>
  );
};

export default MpgSuccessInfo;
