import React from "react";
import RoundedButton from "./RoundedButton";

interface Props {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  step?: number;
  isDisabled?: boolean;
}
const IncrementInput: React.FunctionComponent<Props> = props => {
  const { value, min, max, onChange, step = 1, isDisabled = false } = props;

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
        disabled={value === min || isDisabled}
        onClick={handleMinusClick}
      />
      <div className="w-8 py-2 text-center text-gray-700 font-bold">
        {value}
      </div>
      <RoundedButton
        text="+"
        disabled={value === max || isDisabled}
        onClick={handlePlusClick}
      />
    </div>
  );
};

export default IncrementInput;
