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
const PlayerPropertyInput: React.FunctionComponent<PlayerPropertyInputProps> = props => {
  const { label, propertyValue, min, max, step = 1, onChange } = props;

  return (
    <div className="flex items-center">
      <div className="w-12">
        <label className="block text-gray-700 mb-0 pr-4">{label}</label>
      </div>
      <div className="">
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
