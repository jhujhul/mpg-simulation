import React from "react";

interface Props {
  goalNumber: number;
}
const PlayerGoalsList: React.FunctionComponent<Props> = props => {
  const { goalNumber, children } = props;

  if (goalNumber === 0) {
    return null;
  }

  return (
    <div className="flex">
      {[...Array(goalNumber)].map((e, i) => (
        <div className="-mr-1" key={i}>
          {children}
        </div>
      ))}
    </div>
  );
};

export default PlayerGoalsList;
