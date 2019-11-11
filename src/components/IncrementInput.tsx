import React from "react";
import RoundedButton from "./RoundedButton";

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}
const IncrementInput: React.FunctionComponent<Props> = props => {
  const { value, min, max, step, onChange } = props;

  const handleMinusClick = () => {
    const newValue = value - step;

    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handlePlusClick = () => {
    const newValue = value + step;

    if (newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <RoundedButton
        text="-"
        disabled={value === min}
        onClick={handleMinusClick}
      />
      <div className="w-10 py-2 text-center mx-2 text-gray-700 font-bold">
        {value}
      </div>
      <RoundedButton
        text="+"
        disabled={value === max}
        onClick={handlePlusClick}
      />
    </div>
  );
};

export default IncrementInput;
