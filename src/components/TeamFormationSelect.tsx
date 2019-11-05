import React, { ChangeEvent } from "react";
import { Formation } from "../reducers/teams";

interface TeamFormationSelectProps {
  formation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const TeamFormationSelect: React.FunctionComponent<
  TeamFormationSelectProps
> = props => {
  const { formation, onFormationChange } = props;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFormationChange(event.target.value as Formation);
  };

  return (
    <select value={formation} onChange={handleChange}>
      {Object.values(Formation).map(f => (
        <option value={f} key={f}>
          {f}
        </option>
      ))}
    </select>
  );
};

export default TeamFormationSelect;
