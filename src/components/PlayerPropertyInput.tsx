import React from "react";
import IncrementInput from "./IncrementInput";

interface PlayerPropertyInputProps {
  label: string;
  propertyValue: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  step?: number;
}
const PlayerPropertyInput: React.FunctionComponent<
  PlayerPropertyInputProps
> = props => {
  const { label, propertyValue, min, max, step = 1, onChange } = props;

  return (
    <div className="flex items-center mb-1">
      <div className="w-1/6">
        <label className="block text-gray-700 text-right mb-0 pr-4">
          {label}
        </label>
      </div>
      <div className="w-3/4">
        <IncrementInput
          value={propertyValue}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default PlayerPropertyInput;
