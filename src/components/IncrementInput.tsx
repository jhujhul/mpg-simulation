import React from "react";

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
      <button
        onClick={handleMinusClick}
        style={{ touchAction: "manipulation" }}
        className="font-bold focus:outline-none mx-2 rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
      >
        -
      </button>
      <div className="w-12 bg-gray-200 rounded py-2 px-3 text-gray-700">
        {value}
      </div>
      {/* <input type="number" value={0} /> */}
      <button
        onClick={handlePlusClick}
        style={{ touchAction: "manipulation" }}
        className="font-bold focus:outline-none mx-2 rounded-full h-10 w-10 flex items-center justify-center bg-gray-200"
      >
        +
      </button>
    </div>
  );
};

export default IncrementInput;
